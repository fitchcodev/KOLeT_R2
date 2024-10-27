import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import Modal from "react-native-modal";

const Refer = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={styles.container}>

         <Modal
       animationIn={"fadeInUp"}
       animationOut={"fadeOut"}

        backdropOpacity={0.2}
        isVisible={modalVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Refer a Friend</Text>
            <Text style={styles.modalTextDes}>Disabling your account means {"\n"}losing access to all your payment{'\n'} history and preferences. Are you sure you want to proceed?</Text>
            <Text style={[styles.modalTextDes, {color:Colors.main.primary}]}>https://kolettapandpay.app/referral/dummy</Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Share</Text>
            </Pressable>

          </View>
        </Modal>
      <View style={styles.top} />
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Refer a friend</Text>
        <View style={styles.modalImg}>
          <Image
            source={require("@/assets/images/referImg.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <Text style={styles.modalDesc}>
          Invite your friends and get bonus{'\n'} points.Introduce friends to a{'\n'}
          seamless payment experience.
        </Text>
      </View>
      {/* Footer */}
      <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}
        >
          <TouchableOpacity
          onPress={()=>setModalVisible(!modalVisible)}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
              },
            ]}
          >
            <Text style={styles.footerBtnText}>Share</Text>
          </TouchableOpacity>
        </Animated.View>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
  },
  top: {
    flex: 0.3,
    backgroundColor: Colors.main.primary,
  },
  modal: {
    backgroundColor: "white",
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    width: wp(90),
    height: hp(40),
    borderRadius: 20,
    padding: 40,
    gap: hp(2),
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalImg: {
    //backgroundColor: 'red',
    width: "80%",

    height: "50%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.primary,
    textAlign: "center"
  },
  modalDesc: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Raleway-Regluar",
    color: Colors.main.text,
    textAlign: "center",
    //width: 256,
  },
  footer: {
    //backgroundColor: "red",
    marginVertical: hp(2.5),
    flex: 1,
    width: "100%",
    //gap: hp(3.5),
    alignItems: "center",
  },
  footerBtn: {
    padding: 15,
    width: "60%",
    borderRadius: 4,
    
    top:'50%'
  },
  footerBtnText: {
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    paddingVertical:40,
    paddingHorizontal:20,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
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
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  modalTextTitle: {
    marginBottom: 15,
    fontFamily: 'Monserrat-Regular',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.main.text,
  },
  modalTextDes: {
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    //backgroundColor: 'red',
    lineHeight: hp(3),
    fontSize: 15,
    color: Colors.main.text,
  },
});
