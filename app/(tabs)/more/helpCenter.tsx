import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { hp } from "@/helpers/common";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import CustomTextInput from "@/components/CustomTextInput";
import { router } from "expo-router";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HelpCenter = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [title, setTitle] = useState("");
  const [complains, setComplains] = useState("");
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
          Help Center
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <ScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.mainContainer}
      >
        <View style={styles.formitem}>
          <Animated.Text
            entering={FadeInDown.delay(100).springify()}
            style={styles.formItemLable}
          >
            Title of Complain
          </Animated.Text>
          <CustomTextInput
            animate={FadeInDown.delay(200).springify()}
            maxLength={20}
            value={title}
            onChange={setTitle}
            inputMode="text"
            placeholder="Enter title of complain"
          />
        </View>
        <View style={styles.formitem}>
          <Animated.Text
            entering={FadeInDown.delay(100).springify()}
            style={styles.formItemLable}
          >
            Details of Complain
          </Animated.Text>
          <CustomTextInput
            animate={FadeInDown.delay(300).springify()}
            maxLength={300}
            multiline={true}
            height={hp(12)}
            value={complains}
            onChange={setComplains}
            inputMode="text"
            placeholder="Details of Complain............"
          />
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
            <Text style={styles.footerBtnText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  mainContainer: {
    //flex: 0.,
    marginTop: hp(5),
    //backgroundColor: Colors.main.error,
    gap: hp(3),
  },
  formitem: {
    flex: 1,
    gap: 15,
    //backgroundColor:'blue'
  },
  formItemLable: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.primary,
    alignSelf: "flex-end",
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
