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
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import CustomTextInput from "@/components/CustomTextInput";
const AddCardForm = () => {
  const handleButton = () => {
    Alert.alert("card Added!");
  };
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [cardName, setCardName] = useState("");
  const [accountNumebr, setAccountNumber] = useState("");
  const [cardExpDate, setExpDate] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const checkButtonDisabled = () => {
    return cardName.length < 4;
  };
  const formatDate = (value: string) => {
    // Remove any non-numeric characters
    const cleaned = value.replace(/[^\d]/g, "");

    // Format as dd/mm
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})/);

    if (!match) return value;

    const [, day, month] = match;

    if (month) {
      return `${day}/${month}`;
    } else if (day) {
      return day;
    } else {
      return "";
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove any non-numeric characters
    const cleaned = value.replace(/[^\d]/g, "");

    // Group digits in sets of 4
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;

    // Limit to 16 digits (for Mastercard)
    return formatted.substring(0, 19); // 16 digits + 3 spaces between groups
  };

  const onChangeCardNumber = (value) => {
    setAccountNumber(value);
  };

  //console.log(checkButtonDisabled());
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
          onPress={() => router.navigate("/(tabs)/more/cardManagement")}
        >
          <ArrowLftIC width={30} height={30} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
          //   gap: hp(2.5)
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
            />
          </View>
          <Text style={styles.headingTextTitle}>Enter Card Details</Text>
          <Text style={styles.headingTextDescript}>
            Provide your card details below
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
              value={cardName}
              inputMode="text"
              keyboardType="default"
              maxLength={40}
              placeholder="Card Name(Required)"
              onChange={setCardName}
            />
            <CustomTextInput
              value={cardNumebr}
              inputMode="numeric"
              keyboardType="phone-pad"
              maxLength={19} // Limit the length to 19 characters (16 digits + 3 spaces)
              placeholder="Card Number (Required)"
              onChange={onChangeCardNumber}
              iconName="card"
              iconHieght={15}
              iconWidth={15}
            />

            <CustomTextInput
              value={cardExpDate}
              inputMode="numeric"
              keyboardType="phone-pad"
              maxLength={5} // Setting maxLength to 5 for "dd/mm" format
              placeholder="Expiration Date (Required)"
              onChange={onChangeExpDate}
            />

            <CustomTextInput
              value={cardCVV}
              inputMode="numeric"
              keyboardType="phone-pad"
              maxLength={40}
              placeholder="CVV (Required)"
              onChange={setCardCVV}
              secureTextEntry={true}
            />
          </View>
        </View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <TouchableOpacity
            disabled={checkButtonDisabled()}
            onPress={handleButton}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}
          >
            <Text style={styles.footerBtnText}>Add New Card</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCardForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    //backgroundColor:'red',
    alignItems: "center",
    gap: hp(2.5),
    height: hp(30),
  },
  headerImg: {
    //backgroundColor: 'red',
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
    //backgroundColor: 'red'
  },
  otpField: {
    fontFamily: "Montserrat-SemiBold",
    width: "100%",
    height: "100%",
    color: "#333",
    fontSize: hp(4),
    textAlign: "center",
  },
  otpFieldContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    width: "22%",
    height: 70,
    borderWidth: 0.7,
    borderRadius: 4,
  },
  timerCon: {
    //backgroundColor: 'red',
    alignItems: "center",
    marginBottom: 70,
  },
  timerText: {
    fontFamily: "Montserrat-Regular",
  },

  footer: {
    //backgroundColor: "red",
    marginVertical: hp(2.5),
    //flex: 1,
    width: "100%",
    //gap: hp(3.5),
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
});
