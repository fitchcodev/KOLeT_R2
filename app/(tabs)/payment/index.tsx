import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC';
import { router } from 'expo-router';
import SuccesIC from '@/assets/images/svg/SuccesIC';
import { hp } from '@/helpers/common';
import MasterIC from '@/assets/images/svg/MasterIC';
import VisaIC from '@/assets/images/svg/VisaIC';
import QRIC from '@/assets/images/svg/QRIC';
import { useTransaction } from '@/contexts/TransactionContext';

const Payment = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [isSelected, setIsSelcted] = useState(false);
  const { transaction } = useTransaction();

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <View
        style={{
          width: '100%',
          paddingTop: 5,
          paddingBottom: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => router.back()}>
          <ArrowLftIC width={30} height={30} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            fontFamily: 'Montserrat-Regular',
            color: Colors.main.primary,
            //flex: 1,
            textAlign: 'center',
            //backgroundColor:'red',
          }}>
          Select Payment Method
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.total}>Total</Text>
        <Text style={styles.amount}>₦{transaction && transaction.amount}</Text>
        <Text style={styles.description}>
          {(transaction && transaction.narration) || ''}
        </Text>
      </View>

      {/* Divder */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //backgroundColor: "red",
          width: '100%',
          marginTop: hp(6),
        }}>
        <View
          style={{
            height: 1.5,
            backgroundColor: Colors.main.border,
            flex: 0.6,
          }}></View>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: 'Raleway-SemiBold',
            color: Colors.main.description,
          }}>
          Payment Method
        </Text>
        <View
          style={{
            height: 1.5,
            backgroundColor: Colors.main.border,
            flex: 0.6,
          }}></View>
      </View>
      {/* Card */}
      <Pressable onPress={() => setIsSelcted(!isSelected)} style={styles.card}>
        <View style={styles.cardItem}>
          <View
            style={{
              width: 15,
              height: 15,
              borderWidth: isSelected ? 1.5 : 0.7,
              borderRadius: 100,
              borderColor: isSelected
                ? Colors.main.success
                : Colors.main.border,
              backgroundColor: isSelected ? Colors.main.primary : 'transparent',
            }}></View>
          <Text style={styles.cardItemText}>Card Details</Text>
        </View>
        <View style={styles.cardItem}>
          <MasterIC width={20} height={20} />
          <VisaIC width={20} height={20} />
          <QRIC width={20} height={20} />
        </View>
      </Pressable>
      {/* button */}
      <TouchableOpacity
        onPress={() => router.push('/(tabs)/payment/cardDetailsForm')}
        disabled={!isSelected}
        style={[
          styles.payButton,
          { backgroundColor: !isSelected ? '#3498DB1A' : Colors.main.primary },
        ]}>
        <Text style={styles.payButtonText}>
          Pay ₦{transaction && transaction.amount}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 20,
  },
  header: {
    //backgroundColor: 'red',
    gap: 20,
    //marginTop: 30,
    alignItems: 'center',
  },
  total: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.main.description,
    textAlign: 'left',
  },
  amount: {
    fontSize: 48,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    color: Colors.main.text,
    textAlign: 'left',
  },
  description: {
    fontSize: 18,
    letterSpacing: 0.2,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 35,
    borderRadius: 15,
  },
  cardItem: {
    //flex:.25,
    flexDirection: 'row',
    // backgroundColor:'red',
    alignItems: 'center',
    gap: 10,
  },
  cardItemText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.text,
    // backgroundColor:'red'
  },
  payButton: {
    marginVertical: 40,
    padding: 10,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 22,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
  },
});
