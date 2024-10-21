import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  GestureResponderEvent,
} from "react-native";
import React, { useState } from "react";
import {
  hp,
  validateEmail,
  validateNigerianPhoneNumber,
  wp,
} from "@/helpers/common";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import Logo from "@/assets/images/svg/Logo";
import { Colors } from "@/constants/Colors";
import PhoneIC from "@/assets/images/svg/PhoneIC";
import MailIc from "@/assets/images/svg/MailIc";

const ForgotPassword = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");

  function checkButtonDisabled(): boolean | undefined {
    return !validateNigerianPhoneNumber(phone_number);
  }

  function handleButton(event: GestureResponderEvent): void {
    router.navigate("/auth/forgotPassword/otpScreen");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: paddinTop }]}
    >
      <StatusBar style="dark" />
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ width: "100%", paddingVertical: 5, paddingHorizontal: 20 }}
      >
        <ArrowLftIC width={30} height={30} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
          gap: 15,
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <View style={styles.headerImg}>
            <Image
              source={require("@/assets/images/image18.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <Text style={styles.headerTextTitle}>Forgot Your Password?</Text>
          <Text style={styles.headerTextDes}>
            Enter your email/number to {"\n"} receive a reset code.
          </Text>
        </Animated.View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Animated.View
            entering={FadeInRight.delay(400).springify()}
            style={[
              styles.inputFieldContainer,
              {
                borderColor: !validateNigerianPhoneNumber(phone_number)
                  ? Colors.main.description
                  : Colors.main.primary,
              },
            ]}
          >
            <TextInput
              inputMode={"numeric"}
              maxLength={11}
              value={phone_number}
              onChangeText={setPhone_number}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              style={styles.inputField}
              placeholderTextColor={"rgba(0,0,0,0.5)"}
            />
            <PhoneIC width={16} height={16} />
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(300).springify()}
            style={[
              styles.inputFieldContainer,
              {
                borderColor: !validateEmail(email)
                  ? Colors.main.description
                  : Colors.main.primary,
              },
            ]}
          >
            <TextInput
              inputMode={"email"}
              value={email}
              onChangeText={setEmail}
              autoCapitalize={false}
              maxLength={200}
              placeholder="Email (Optional)"
              placeholderTextColor={"rgba(0,0,0,0.5)"}
              style={styles.inputField}
            />
            <MailIc width={15} height={15} />
          </Animated.View>
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
            <Text style={styles.footerBtnText}>Send Reset Code</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    //backgroundColor: 'blue',
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
    height: hp(45),
  },
  headerImg: {
    //backgroundColor: 'red',
    width: "100%",

    height: "60%",
    alignItems: "center",
  },
  headerTextTitle: {
    marginTop: hp(2.5),
    fontSize: hp(3.5),
    width: wp(100),
    textAlign: "center",

    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: Colors.main.text,
  },
  headerTextDes: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
  },
  formContainer: {
    //backgroundColor: 'red',

    width: "100%",
    gap: 16,
    marginVertical: 20,
  },
  inputFieldContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    height: hp(6.2),
    borderWidth: 0.7,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 30,
  },

  inputField: {
    fontFamily: "Montserrat-Regular",
    width: "100%",
    height: "100%",
    color: Colors.main.text,
  },
  footer: {
    // backgroundColor: "red",
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  footerBtn: {
    backgroundColor: Colors.main.primary,
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
