import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchIC from "@/assets/images/svg/SearchIC";
import UserIC from "@/assets/images/svg/UserIC";

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
          <View>
            <UserIC width={10} height={10} />
            <Text>Gi</Text>
            <Text>Gi</Text>
          </View>

          <View>
            <UserIC width={10} height={10} />
            <Text>Gi</Text>
            <Text>Gi</Text>
          </View>

          <View>
            <UserIC width={10} height={10} />
            <Text>Gi</Text>
            <Text>Gi</Text>
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
    gap: 5,
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
    //backgroundColor: 'yellow',
    width: "100%",
    gap: 10,
  },
});
