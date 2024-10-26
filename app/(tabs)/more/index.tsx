import { Pressable, Settings, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SmartCardIC from "@/assets/images/svg/SmartCardIC";
import Notofication from "@/assets/images/svg/NtoficationIC";
import SettingsIC from "@/assets/images/svg/SettingsIC";
import HaedsetIc from "@/assets/images/svg/HaedsetIc";
import UserSwitch from "@/assets/images/svg/UserSwitch";
import UserSwitchIC from "@/assets/images/svg/UserSwitch";
import { hp } from "@/helpers/common";
import LogoutIc from "@/assets/images/svg/LogoutIc";
import StarIc from "@/assets/images/svg/StarIc";

const More = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <View
        style={{
          width: "100%",
          flex: .15,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Montserrat-Regular",
            color: Colors.main.primary,
            flex: 1,
            textAlign: "center",
          }}
        >
          More
        </Text>
      </View>
      {/* More iTems */}
      <View style={styles.itemsContainer}>
        <Pressable style={styles.item}>
          <SmartCardIC stroke={Colors.main.text} width={20} height={20} />
          <Text style={styles.itemText}>Card Management</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Notofication width={20} height={20} />
          <Text style={styles.itemText}>Notifications</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <SettingsIC width={20} height={20} />
          <Text style={styles.itemText}>Settings</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <HaedsetIc width={20} height={20} />
          <Text style={styles.itemText}>Help Center</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <UserSwitchIC width={20} height={20} />
          <Text style={styles.itemText}>Refer a friend</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <StarIc width={20} height={20} />
          <Text style={styles.itemText}>Rate the App</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <LogoutIc width={20} height={20} />
          <Text style={styles.itemText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 5,
  },
  itemsContainer: {
    flex: .65,
    width: "100%",
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    flex: 1,
    width: "100%",
    gap: 10,
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
});
