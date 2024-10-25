import { Modal, Pressable, StyleSheet, Text, View , useFocusEffect} from "react-native";
import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import ShareIC from "@/assets/images/svg/ShareIC";
import { router, useLocalSearchParams } from "expo-router";
import { hp } from "@/helpers/common";
import LottieView from "lottie-react-native";
import { BlurView } from 'expo-blur';


const NfcPaymentScreen: FC = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const animation = useRef<LottieView>(null);
  const { amount, narrattion } = useLocalSearchParams(); 
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(
    useCallback(() => {
      // This will run when the screen is focused (i.e. user navigates back)
      if (amount && Number(amount) > 15000) {
        setModalVisible(true);

      }
  
      // Cleanup if necessary (this runs when the screen is unfocused)
      return () => {
        // Any cleanup logic, if needed
       setModalVisible(false);
      };
    }, [amount])
  ), [amount];
  
const handleModalClose: ()=>void = () => {
    setModalVisible(!modalVisible);
    router.navigate('/(tabs)/nfcPayment/paymentVerification');
    
}

  
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
        {/* Modal */}
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <BlurView intensity={30} tint="dark" style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Payment Limit Reached</Text>
            <Text style={styles.modalTextDes}>Oops! Looks like you've hit the payment limit. For transactions above ₦15,000, please proceed by entering your ATM{'\n'} card PIN in the designated area.</Text>
            <Pressable
              style={styles.button}
              onPress={handleModalClose}>
              <Text style={styles.textStyle}>Proceed</Text>
            </Pressable>
          </View>
        </BlurView>
        </Modal>
      {/* Buttons */}
      <View style={styles.topBtn}>
        <Pressable onPress={() => router.back()}>
          <ArrowLftIC width={25} height={25} />
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <ShareIC width={25} height={25} />
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Total</Text>
        <Text style={styles.amount}>₦{amount}</Text>
        <Text style={styles.description}>{narrattion}</Text>
      </View>

      {/* animation */}
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "100%",
            height: "100%",
            //backgroundColor: '#eee',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/nfcTap.json")}
        />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Tap Card</Text>
      </View>
    </View>
  );
};

export default NfcPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 30,
    gap: hp(4),
  },
  topBtn: {
    //backgroundColor: Colors.main.error,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    //backgroundColor: "red",
    gap: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
  amount: {
    fontSize: 48,
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
    color: Colors.main.text,
    textAlign: "left",
  },
  description: {
    fontSize: 18,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
  animationContainer: {
    //backgroundColor: 'red',
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
    //width: '100%',
    //height: '100%'
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    //backgroundColor:'red',
    alignItems: "center",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
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
    lineHeight: 30,
    fontSize: 15,
    color: Colors.main.text,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    padding: 40,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
