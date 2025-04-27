import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  Platform,
  ViewStyle,
  StyleProp,
  ListRenderItemInfo,
} from "react-native";
import CustomTextInput from "@/components/CustomTextInput";
import { Colors } from "@/constants/Colors";

type Bank = {
  name: string;
  code: string | number;
  [key: string]: any;
};

type BankInputProps = {
  selectedBank: Bank | null;
  setSelectedBank: (bank: Bank) => void;
  banks?: Bank[];
  isLoadingBanks?: boolean;
  bankError?: boolean;
  bankErrorMessage?: { message: string } | null;
  refetchBanks?: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

const BankInput: React.FC<BankInputProps> = ({
  selectedBank,
  setSelectedBank,
  banks = [],
  isLoadingBanks = false,
  bankError = false,
  bankErrorMessage = null,
  refetchBanks = () => {},
  label = "Select Bank (Required)",
  style = {},
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBanks = searchQuery
    ? banks.filter((bank) =>
        bank?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : banks;

  const keyExtractor = useCallback((item: Bank, index: number): string => {
    return item?.code?.toString() || index.toString();
  }, []);

  const renderBankItem = useCallback(
    ({ item }: ListRenderItemInfo<Bank>) => (
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
    [setSelectedBank]
  );

  const renderEmptyList = () => (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        {searchQuery ? "No banks matching your search" : "No banks available"}
      </Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.bankSelector, style]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={
            selectedBank ? styles.selectedBankText : styles.bankPlaceholder
          }
        >
          {selectedBank ? selectedBank.name : label}
        </Text>
      </TouchableOpacity>

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
                  onPress={refetchBanks}
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default BankInput;
