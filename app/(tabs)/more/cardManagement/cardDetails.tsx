import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import WifiSvgIC from "@/assets/images/svg/WifiSvg";
import SimCardIC from "@/assets/images/svg/SimCardIC";
import MasterIC from "@/assets/images/svg/MasterIC";
import { hp } from "@/helpers/common";

const CardDetails = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Montserrat-Regular",
            color: Colors.main.primary,
            textAlign: "center",
          }}
        >
          Card Details
        </Text>
        <View />
      </View>

      <View style={styles.mainContainer}>
        <LinearGradient
          colors={["rgba(52, 152, 219, 0.4)", "rgba(215,159,131,0.10)"]}
          style={styles.card}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardTopText}>debit</Text>
            <WifiSvgIC width={40} height={40} />
          </View>
          <View style={{ gap: 2 }}>
            <SimCardIC width={40} height={40} />
            <Text style={styles.cardNumber}>4111 1971 1441 1231</Text>
          </View>
          <View
            style={[styles.cardTop, { paddingTop: 10, alignItems: "center" }]}
          >
            <Text>John Van Doe</Text>
            <MasterIC fill={"none"} width={40} height={40} />
          </View>
        </LinearGradient>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemText}>John Doe</Text>
          </View>
          <View style={styles.detailsItem}>
          <Text style={styles.detailsItemText}>4111 1971 1441 1231</Text>
          </View>
          <View style={styles.detailsItem}>
          <Text style={styles.detailsItemText}>02/20</Text>
          </View>
          <View style={styles.detailsItem}>
          <Text style={styles.detailsItemText}>***</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    justifyContent: "flex-start",
  },
  mainContainer: {
    // backgroundColor:'red',
    flex: 1,
    padding: 40,
  },
  card: {
    // flex:1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTopText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
    textAlign: "center",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  detailsContainer: {
    flex: 1,
    marginTop: hp(4.5),
    justifyContent: "center",
    gap: hp(3),
  },
  detailsItem: {
    //flex:1,
    backgroundColor: "white",
    borderColor: Colors.main.primary,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: hp(2),
  },
  detailsItemText: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
});
