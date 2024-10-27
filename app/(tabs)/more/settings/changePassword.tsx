import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { hp } from "@/helpers/common";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";
import CustomTextInput from "@/components/CustomTextInput";
import Animated, { FadeInDown, FadeInRight, FadeInUp } from "react-native-reanimated";

const ChangePassword = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
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
          onPress={() => router.navigate("/(tabs)/more/settings")}
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
          Change Password
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <ScrollView keyboardDismissMode="interactive" showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.mainContainer}>
        <View style={styles.formitem}>
            <Animated.Text entering={FadeInDown.delay(100).springify()} style={styles.formItemLable}>Current Password</Animated.Text>
            <CustomTextInput animate={FadeInDown.delay(200).springify()} maxLength={20} value={currentPassword} onChange={setCurrentPassword} inputMode="text"  placeholder="Enter Current Password"/>
            <Animated.Text entering={FadeInRight.delay(300).springify()} style={styles.forgotPassword}>Forgot Password?</Animated.Text>
        </View>
        <View style={styles.formitem}>
            <Animated.Text entering={FadeInDown.delay(100).springify()} style={styles.formItemLable}>New Password</Animated.Text>
            <CustomTextInput animate={FadeInDown.delay(300).springify()} maxLength={20} value={password} onChange={setPassword} inputMode="text" placeholder="At least 8 characters"/>
        </View>
        <View style={styles.formitem}>
            <Animated.Text entering={FadeInDown.delay(100).springify()} style={styles.formItemLable}>Confirm New Password</Animated.Text>
            <CustomTextInput animate={FadeInDown.delay(400).springify()} maxLength={20} value={comfirmPassword} onChange={setComfirmPassword} inputMode="text" placeholder="At least 8 characters"/>

        </View>
         {/* Footer */}
         <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <TouchableOpacity
            // disabled={checkButtonDisabled()}
            //onPress={handleButton}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                // opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}
          >
            <Text style={styles.footerBtnText}>Save</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex:.9,
    marginTop: hp(5),
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  formitem:{
    flex:1,
    gap:15,
    //backgroundColor:'blue'

  },
  formItemLable:{
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.primary,
    alignSelf: "flex-end"
    },
    footer: {
        //backgroundColor: "red",
        marginVertical: hp(2.5),
        flex: 1,
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
