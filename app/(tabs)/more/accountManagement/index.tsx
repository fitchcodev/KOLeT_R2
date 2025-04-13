import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowRightIC from "@/assets/images/svg/ArrowRight";
import { hp } from "@/helpers/common";
import Modal from "react-native-modal";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";

const AccountManagement = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <Modal
        animationIn={"bounceIn"}
        animationOut={"fadeOut"}
        backdropOpacity={0.2}
        isVisible={modalVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Are you sure you want to remove this account
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Yes</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: "transparent",
                borderWidth: 0.7,
                borderColor: Colors.main.primary,
              },
            ]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={[styles.textStyle, { color: Colors.main.text }]}>
              No
            </Text>
          </Pressable>
        </View>
      </Modal>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => router.navigate("/(tabs)/more")}
        >
          <ArrowLftIC width={30} height={30} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Montserrat-Regular",
            color: Colors.main.primary,
            textAlign: "center",
          }}
        >
          Account Management
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* Settings iTems */}
      <View style={styles.itemsContainer}>
        <Pressable
          style={styles.item}
          onPress={() =>
            router.navigate("/(tabs)/more/AccountManagement/addAccountForm")
          }
        >
          <Text style={styles.itemText}>Add New Card</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() =>
            router.navigate("/(tabs)/more/AccountManagement/accountDetails")
          }
        >
          <Text style={styles.itemText}>View Account Details</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.itemText}>Remove Account</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>
        <Pressable
          style={styles.item}
          onPress={() =>
            router.navigate("/(tabs)/more/AccountManagement/setDefaultAccount")
          }
        >
          <Text style={styles.itemText}>Set Default Account</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Transaction History</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>

        <Pressable
          style={styles.item}
          onPress={() =>
            router.navigate("/(tabs)/more/AccountManagement/privacySettings")
          }
        >
          <Text style={styles.itemText}>Privacy Settings</Text>
          <ArrowRightIC width={20} height={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default AccountManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  itemsContainer: {
    width: "100%",
    marginTop: hp(10),
    //flex:1,
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    //flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: Colors.main.border,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    gap: 10,
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
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: Colors.main.error,
  },
  textStyle: {
    color: "white",
    fontFamily: "Raleway-Regular",
    fontSize: 18,
    textAlign: "center",
  },
  modalTextDes: {
    marginBottom: 15,
    fontFamily: "Raleway-Regular",
    textAlign: "center",
    //backgroundColor: 'red',
    lineHeight: hp(3),
    fontSize: 15,
    color: Colors.main.text,
  },
});
