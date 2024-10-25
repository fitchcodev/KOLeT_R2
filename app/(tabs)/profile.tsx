import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchIC from "@/assets/images/svg/SearchIC";
import UserIC from "@/assets/images/svg/UserIC";
import { hp } from "@/helpers/common";
import PhoneIC from "@/assets/images/svg/PhoneIC";
import MailIc from "@/assets/images/svg/MailIc";

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          //paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignContent: "center",
          //backgroundColor:'red'
        }}
      >
        <Pressable>
          <SearchIC width={30} height={30} />
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.profile}>
          <View style={styles.profileImg}>
            <UserIC width={60} height={60} fill="#BDC3C7" stroke={"#BDC3C7"} />
          </View>
          <Text style={styles.profileText}>Candy Paint</Text>
        </View>
        {/* Form */}
        <View style={styles.formContainer}>
        <View style={styles.form}>
            <UserIC width={20} height={20} stroke={Colors.main.primary} />
            <View style={styles.formTextCon}>
              <Text style={{fontSize: 16, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.text}}>John Doe</Text>
              <Text style={{fontSize: 12, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.description}}>Full Name</Text>
            </View>
          </View>

          <View style={styles.form}>
            <PhoneIC width={20} height={20} stroke={Colors.main.primary} />
            <View style={styles.formTextCon}>
              <Text style={{fontSize: 16, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.text}}>23481412345678</Text>
              <Text style={{fontSize: 12, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.description}}>Phone Number</Text>
            </View>
          </View>

          <View style={styles.form}>
            <MailIc width={20} height={20} stroke={Colors.main.primary} />
            <View style={styles.formTextCon}>
              <Text style={{fontSize: 16, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.text}}>johndoe@gmail.com</Text>
              <Text style={{fontSize: 12, fontWeight:'500', fontFamily:'Raleway-Regular', color: Colors.main.description}}>Email</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
    //backgroundColor: "red",
    width: "100%",
    alignItems: "center",
  },
  profile: {
    flex: 0.3,
    //backgroundColor:'green',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  profileImg: {
    backgroundColor: Colors.main.inputBg,
    padding: 20,
    borderRadius: 100,
    borderCurve: "circular",
    alignItems: "center",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: Colors.main.text,
  },
  formContainer: {
    flex: 0.4,
    width: "100%",
    gap: 10,
    paddingTop: hp(2.5)
  },
  form: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: Colors.main.border,
    borderBottomWidth: 0.7,
  },
  formTextCon: {
    //backgroundColor: "red",
    flex: 1,
    paddingHorizontal: 20,
    gap: 10,
  },
});
