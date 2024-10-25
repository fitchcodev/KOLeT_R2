import { Pressable, StyleSheet, Text, View, Modal, Alert } from "react-native";
import React, { useState } from "react";
import ArrowVertical from "@/assets/images/svg/ArrowVertical";
import { Colors } from "@/constants/Colors";
import SmartPhoneIc from "@/assets/images/svg/SmartPhoneIc";
import TvIc from "@/assets/images/svg/TvIc";
import DropLetIc from "@/assets/images/svg/DropLetIc";
import TaxesIC from "@/assets/images/svg/TaxesIC";
import InvoiceIc from "@/assets/images/svg/InvoiceIc";
import { BlurView } from 'expo-blur';

const Services = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
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
            <Text style={styles.modalTextTitle}>Coming Soon</Text>
            <Text style={styles.modalTextDes}>Exciting new features, like buying{"\n"} airtime, are on the way. Stay tuned{'\n'} for the upgrade!</Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </BlurView>
        </Modal>
      <View style={styles.servicesItemsContainer}>
        <Pressable  onPress={() => setModalVisible(true)} style={styles.servicesItem}>
          <ArrowVertical width={20} height={20}/>
          <Text style={styles.servicesItemText}>Data</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.servicesItem}>
          <SmartPhoneIc width={20} height={20}/>
          <Text style={styles.servicesItemText}>Airtime</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.servicesItem}>
        <TvIc width={20} height={20}/>
        <Text style={styles.servicesItemText}>Cable Tv</Text>
        </Pressable>
      </View>
      <View style={styles.servicesItemsContainer}>
      <Pressable onPress={() => setModalVisible(true)} style={styles.servicesItem}>
          <DropLetIc width={20} height={20}/>
          <Text style={styles.servicesItemText}>Electricity{"\n"} & Water</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.servicesItem}>
          <TaxesIC width={20} height={20}/>
          <Text style={styles.servicesItemText}>Taxes{"\n"} and Levy</Text>
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)} style={styles.servicesItem}>
          <InvoiceIc width={20} height={20}/>
          <Text style={styles.servicesItemText}>Insurance{"\n"} and HMO</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 35,
    paddingVertical: 25,
    gap: 25,
  },
  servicesItemsContainer: {
    //backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  servicesItem:{
    flex:1,
    //backgroundColor: 'yellow',
    //padding: 20,
    justifyContent:"center",
    alignItems: 'center',
    gap: 5

  },
  servicesItemText:{
    fontFamily: 'Monserrat-Regular',
    fontSize: 12,
    color: Colors.main.primary,
    textAlign: 'center',

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
});
