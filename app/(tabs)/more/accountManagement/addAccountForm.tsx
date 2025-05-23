import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import CustomTextInput from "@/components/CustomTextInput";
import { useGetBankList } from "@/api/account";
import { useAddAccount } from "@/api/account";
import { UserContext } from "@/contexts/UserContext";

const AddAccountForm = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);

  const {
    data: banks = [],
    isLoading: isLoadingBanks,
    isError: bankError,
    error: bankErrorMessage,
  } = useGetBankList();

  const { mutate: addAccount, isPending: isAddingAccount } = useAddAccount(
    (data) => {
      Alert.alert("Success", "Account added successfully!");
      router.navigate("/(tabs)/more/accountManagement");
    },
    (error) => {
      const errorMessage =
        error?.message || "Failed to add account. Please try again.";
      Alert.alert("Error", errorMessage);
    }
  );

  const handleAddAccount = () => {
    if (!accountName || !selectedBank || !accountNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (accountNumber.length < 10) {
      Alert.alert("Error", "Account number must be at least 10 digits");
      return;
    }

    const accountData = {
      FIRST_NAME: user?.firstName || "",
      LAST_NAME: user?.lastName || "",
      BANK_NAME_L: selectedBank.name,
      BANK_NAME: selectedBank.code,
      BANK_ACCOUNT_NUMBER: accountNumber,
      user_id: user?.id || 10,
      model: "accounts",
    };

    addAccount(accountData);
  };

  const checkButtonDisabled = () => {
    return (
      !accountName ||
      accountName.length < 3 ||
      !selectedBank ||
      accountNumber.length < 10
    );
  };

  const filteredBanks = searchQuery
    ? banks.filter((bank) =>
        bank?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : banks;

  const keyExtractor = useCallback(
    (item) => item?.code?.toString() || Math.random().toString(),
    []
  );

  const renderBankItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.bankItem}
        onPress={() => {
          setSelectedBank(item);
          setModalVisible(false);
        }}
      >
        <Text style={styles.bankItemText}>{item?.name || "Unknown Bank"}</Text>
      </TouchableOpacity>
    ),
    []
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        {searchQuery ? "No banks matching your search" : "No banks available"}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: paddinTop }]}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: 5,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/more/accountManagement")}
        >
          <ArrowLftIC width={30} height={30} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
        }}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}
        >
          <View style={styles.headerImg}>
            <Image
              source={require("@/assets/images/cards.png")}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.headingTextTitle}>Add New Account</Text>
          <Text style={styles.headingTextDescript}>
            Enter your bank account details below
          </Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <CustomTextInput
              value={accountName}
              inputMode="text"
              keyboardType="default"
              maxLength={40}
              placeholder="Account Name (Required)"
              onChange={setAccountName}
            />

            <TouchableOpacity
              style={styles.bankSelector}
              onPress={() => setModalVisible(true)}
            >
              <Text
                style={
                  selectedBank
                    ? styles.selectedBankText
                    : styles.bankPlaceholder
                }
              >
                {selectedBank ? selectedBank.name : "Select Bank (Required)"}
              </Text>
            </TouchableOpacity>

            <CustomTextInput
              value={accountNumber}
              inputMode="numeric"
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="Account Number (Required)"
              onChange={setAccountNumber}
              iconName="card"
              iconHieght={15}
              iconWidth={15}
            />
          </View>
        </View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <TouchableOpacity
            disabled={checkButtonDisabled() || isAddingAccount}
            onPress={handleAddAccount}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() && !isAddingAccount ? 1 : 0.5,
              },
            ]}
          >
            <Text style={styles.footerBtnText}>
              {isAddingAccount ? "Adding Account..." : "Add Account"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      {/* Bank Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Bank</Text>

            <CustomTextInput
              value={searchQuery}
              inputMode="text"
              keyboardType="default"
              placeholder="Search banks..."
              onChange={setSearchQuery}
              style={styles.searchInput}
            />

            {isLoadingBanks ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.main.primary} />
                <Text style={styles.loadingText}>Loading banks...</Text>
              </View>
            ) : bankError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {bankErrorMessage?.message ||
                    "Failed to load banks. Please try again."}
                </Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={() => {
                    // Add a retry functionality here if needed
                    // For example: refetch();
                  }}
                >
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={filteredBanks}
                renderItem={renderBankItem}
                keyExtractor={keyExtractor}
                style={styles.bankList}
                contentContainerStyle={styles.bankListContent}
                ListEmptyComponent={renderEmptyList}
                initialNumToRender={15}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={Platform.OS === "android"}
              />
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSearchQuery("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddAccountForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    alignItems: "center",
    gap: hp(2.5),
    height: hp(30),
  },
  headerImg: {
    width: "60%",
    height: "50%",
    alignItems: "center",
  },
  headingTextTitle: {
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: Colors.main.text,
    textAlign: "center",
  },
  headingTextDescript: {
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
    fontSize: 15,
  },
  formContainer: {
    width: "100%",
    marginTop: hp(2),
    gap: 20,
  },
  bankSelector: {
    backgroundColor: "white",
    width: "100%",
    height: 60,
    borderRadius: 4,
    borderWidth: 0.7,
    borderColor: Colors.main.description,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  bankPlaceholder: {
    color: "#999",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  selectedBankText: {
    color: Colors.main.text,
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
  },
  footer: {
    marginVertical: hp(2.5),
    width: "100%",
    alignItems: "center",
  },
  footerBtn: {
    padding: 15,
    width: "80%",
    borderRadius: 4,
  },
  footerBtnText: {
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    marginBottom: 15,
  },
  searchInput: {
    marginBottom: 10,
    width: "100%",
  },
  bankList: {
    width: "100%",
    marginBottom: 15,
  },
  bankListContent: {
    paddingBottom: 10,
  },
  bankItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "100%",
  },
  bankItemText: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  closeButton: {
    backgroundColor: Colors.main.primary,
    borderRadius: 4,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontFamily: "Raleway-SemiBold",
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontFamily: "Montserrat-Regular",
  },
  errorContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontFamily: "Montserrat-Regular",
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: Colors.main.primary,
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 20,
  },
  retryButtonText: {
    color: "white",
    fontFamily: "Raleway-SemiBold",
  },
  emptyListContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
  },
});
