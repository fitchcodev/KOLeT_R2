import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  formatDate,
  hp,
  validateEmail,
  validateNigerianPhoneNumber,
  wp,
} from "@/helpers/common";
import { Colors } from "@/constants/Colors";
import UserIC from "@/assets/images/svg/UserIC";
import PhoneIC from "@/assets/images/svg/PhoneIC";
import MailIc from "@/assets/images/svg/MailIc";
import CalenderIC from "@/assets/images/svg/CalenderIC";
import { router } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import DatePicker from "react-native-date-picker";
import { StatusBar } from "expo-status-bar";
const Register = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [date_of_birth, setDate_of_birth] = useState("");
  const [open, setOpen] = useState(false);

  const handleButton = () => {
    router.navigate("/auth/otpScreen");
  };
  const handleDateChange = (date) => {
    setDate_of_birth(date);
  };
  const checkButtonDisabled = () => {
    return (
      !first_name ||
      (!last_name && !validateNigerianPhoneNumber(phone_number)) ||
      !date_of_birth
    );
  };

  console.log(checkButtonDisabled());
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingTop: paddinTop }]}
    >
      <StatusBar style="dark" />
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
          style={styles.heading}
        >
          <Text style={styles.headingTextTitle}>
            Sign Up for{" "}
            <Text style={{ color: Colors.main.primary }}>Kolet</Text>{" "}
          </Text>
          <Text style={styles.headingTextDescript}>
            Unlock the future of convenient transactions with Kolet. Sign up
            now!
          </Text>
        </Animated.View>

        {/* Haeding End */}

        {/* form */}
        <View style={styles.formContainer}>
          <Animated.View
            entering={FadeInRight.delay(600).springify()}
            style={[
              styles.inputFieldContainer,
              {
                borderColor:
                  first_name.length < 2
                    ? Colors.main.description
                    : Colors.main.primary,
              },
            ]}
          >
            <TextInput
              inputMode={"text"}
              autoComplete={"name"}
              maxLength={200}
              value={first_name}
              onChangeText={setFirst_name}
              placeholder="First Name"
              style={styles.inputField}
              placeholderTextColor={"rgba(0,0,0,0.5)"}
            />
            <UserIC width={15} height={15}/>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.delay(500).springify()}
            style={[
              styles.inputFieldContainer,
              {
                borderColor:
                  last_name.length < 2
                    ? Colors.main.description
                    : Colors.main.primary,
              },
            ]}
          >
            <TextInput
              inputMode={"text"}
              autoComplete={"name"}
              value={last_name}
              onChangeText={setLast_name}
              maxLength={200}
              placeholder="Last Name"
              style={styles.inputField}
              placeholderTextColor={"rgba(0,0,0,0.5)"}
            />
            <UserIC  width={15} height={15} />
          </Animated.View>
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
          <Animated.View
            entering={FadeInRight.delay(200).springify()}
            style={[
              styles.inputFieldContainer,
              {
                borderColor:
                  date_of_birth.length > 3
                    ? Colors.main.description
                    : Colors.main.primary,
              },
            ]}
          >
            <TextInput
              inputMode={"text"}
              autoComplete={"name"}
              maxLength={200}
              value={formatDate(date_of_birth)}
              placeholder="Date of Birth"
              style={styles.inputField}
              placeholderTextColor={"rgba(0,0,0,0.5)"}
              editable={false}
              onPressIn={() => {
                setOpen(true);
              }}
            />
            <DatePicker
              modal
              open={open}
              date={new Date()}
              mode="date"
              maximumDate={new Date()}
              onConfirm={(date) => {
                setOpen(false);
                handleDateChange(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <CalenderIC  width={15} height={15}/>
          </Animated.View>
        </View>

        {/* progressBar */}
        <Animated.View entering={FadeIn.delay(800)} style={styles.progressBar}>
          <View
            style={
              !checkButtonDisabled()
                ? styles.progressBarItemActive
                : styles.progressBarItemInactive
            }
          />
          <View style={styles.progressBarItemInactive} />
          <View style={styles.progressBarItemInactive} />
        </Animated.View>
        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <Text style={styles.footerTextTiltle}>
            By signing up, you agree to our{" "}
            <Text style={{ color: Colors.main.primary }}>Terms</Text> and{" "}
            <Text style={{ color: Colors.main.primary }}>Conditions</Text> and{" "}
            <Text style={{ color: Colors.main.primary }}>Privacy Policy</Text>
          </Text>
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
            <Text style={styles.footerBtnText}>Next</Text>
          </TouchableOpacity>
          <Text
            onPress={() => router.navigate("/auth/login")}
            style={styles.footerText}
          >
            Already a member?{" "}
            <Text style={{ color: Colors.main.primary }}>Login</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.inputBg,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    alignItems: "center",
    gap: 20,
  },
  headingTextTitle: {
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: Colors.main.text,
  },
  headingTextDescript: {
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
    fontSize: 15,
  },
  formContainer: {
    width: "100%",
    gap: 16,
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

  progressBar: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 50,
    gap: 10,
    marginVertical: 35,
  },
  progressBarItemActive: {
    height: hp(1),
    width: "30%",
    borderRadius: 20,
    backgroundColor: Colors.main.primary,
  },
  progressBarItemInactive: {
    height: hp(1),
    width: "30%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  footer: {
    // backgroundColor: "red",
    flex: 1,
    width: "100%",
    gap: 15,
    alignItems: "center",
  },
  footerTextTiltle: {
    fontWeight: "300",
    fontFamily: "Raleway-RegularS",
    textAlign: "center",
    fontSize: 16,
    alignItems: "center",
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
    fontSize: 20,
  },
  footerText: {
    fontWeight: "600",
    fontFamily: "Raleway-Regular",
    textAlign: "center",
    color: Colors.main.text,
    fontSize: 16,
  },
});
