import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import ShareIC from "@/assets/images/svg/ShareIC";
import { router } from "expo-router";
import { hp } from "@/helpers/common";
import LottieView from "lottie-react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { useTransaction } from "@/contexts/ReceiptContext";

const NfcPaymentScreen: FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const animation = useRef<LottieView>(null);
  const { getTransaction } = useTransaction();
  const [transaction, setTransaction] = useState(getTransaction);

  // Format the amount with commas and 2 decimal places if available
  const formattedAmount = transaction?.amount
    ? transaction.amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "0.00";

  useEffect(() => {
    const initNfc = async () => {
      await NfcManager.start();
    };

    initNfc();

    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => {
      });
    };
  }, []);

  useEffect(() => {
    const readNdef = async () => {
      try {
        // register for the NFC tag with NDEF in it
        await NfcManager.requestTechnology(NfcTech.Ndef);
        // the resolved tag object will contain `ndefMessage` property
        const tag = await NfcManager.getTag();
        Alert.alert("Payment successful!");
        router.navigate("/(tabs)/receipt");
        // console.warn('Tag found', tag);
      } catch (ex) {
        Alert.alert("Oops!, A Certain Error Occurred!");
        router.back();
        //console.warn('Oops!', ex);
      } finally {
        // stop the nfc scanning
        NfcManager.cancelTechnologyRequest().catch(() => {
          // Ignore errors during cleanup
        });
      }
    };

    // Start reading NFC when component mounts
    readNdef();
  }, []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* Buttons */}
      <View style={styles.topBtn}>
        <Pressable onPress={() => router.back()}>
          <ArrowLftIC width={25} height={25} />
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <ShareIC width={25} height={25} />
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total</Text>
        <Text style={styles.amount}>₦{formattedAmount}</Text>
        <Text style={styles.description}>{transaction?.narration || ""}</Text>
      </View>

      {/* animation */}
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "100%",
            height: "100%",
          }}
          source={require("@/assets/nfcTap.json")}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap Card</Text>
      </View>
    </View>
  );
};

export default NfcPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 30,
    gap: hp(4),
  },
  topBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    gap: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
  amount: {
    fontSize: 48,
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
    color: Colors.main.text,
    textAlign: "left",
  },
  description: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
  animationContainer: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    alignItems: "center",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  modalTextTitle: {
    marginBottom: 15,
    fontFamily: "Monserrat-Regular",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 20,
    color: Colors.main.text,
  },
  modalTextDes: {
    marginBottom: 15,
    fontFamily: "Raleway-Regular",
    textAlign: "center",
    lineHeight: 30,
    fontSize: 15,
    color: Colors.main.text,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    padding: 40,
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
    backgroundColor: Colors.main.primary,
  },
  textStyle: {
    color: "white",
    fontFamily: "Raleway-Regular",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
