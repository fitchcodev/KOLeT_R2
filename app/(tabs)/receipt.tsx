import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CancleIC from '@/assets/images/svg/CancleIC';
import SuccesIC from '@/assets/images/svg/SuccesIC';
import ShareIC from '@/assets/images/svg/ShareIC';
import ShareICWhite from '@/assets/images/svg/ShareICWhite';
import { hp, toTransactionDate } from '@/helpers/common';
import { useTransaction } from '@/contexts/TransactionContext';

const Receipt = () => {
  const { top } = useSafeAreaInsets();
  const {
    saveTransaction,
    clearTransaction,
    transaction: contextTransaction,
  } = useTransaction();
  const [transaction, setTransaction] = useState(contextTransaction);

  // Mark local transaction as completed
  // and save it to the context
  useEffect(() => {
    const transactionData = contextTransaction;
    if (transactionData) {
      const updatedTransaction = {
        ...transactionData,
        status: 'Successful' as const,
      };
      saveTransaction(updatedTransaction);
      setTransaction(updatedTransaction);
    }
  }, []);

  const paddingTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, { paddingTop }]}>
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
            flex: 1,
            textAlign: 'center',
          }}>
          Receipt
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* Header */}
      <View style={styles.header}>
        <SuccesIC width={70} height={70} />
        <Text style={styles.total}>Total</Text>
        <Text style={styles.amount}>{contextTransaction?.formattedAmount}</Text>
      </View>

      {/* Block */}
      <View style={styles.block}>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Name</Text>
          <Text style={styles.blockItemText}>
            {contextTransaction?.user.name}
          </Text>
        </View>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Date</Text>
          <Text style={styles.blockItemText}>
            {toTransactionDate(new Date(contextTransaction?.date!))}
          </Text>
        </View>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Amount</Text>

          <Text style={styles.blockItemText}>
            {contextTransaction?.formattedAmount}
          </Text>
        </View>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Method</Text>
          <Text style={styles.blockItemText}>
            {contextTransaction?.paymentMethod}
          </Text>
        </View>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Transaction ID</Text>

          <Text style={styles.blockItemText}>{contextTransaction?.id}</Text>
        </View>
        <View style={styles.blockItem}>
          <Text style={styles.blockItemDes}>Status</Text>

          <Text style={styles.blockItemText}>{transaction?.status}</Text>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Pressable style={styles.footerBtn1} onPress={() => clearTransaction()}>
          <ShareICWhite width={20} height={20} />
          <Text style={styles.footerBtn1Text}>Share</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            clearTransaction();
            router.push('/(tabs)/(top-tabs)');
          }}
          style={styles.footerBtn2}>
          <Text style={styles.footerBtn2Text}>Home Page</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    //gap: 20,
  },
  header: {
    //backgroundColor: 'red',
    gap: hp(1.2),
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
  block: {
    flex: 0.95,
    marginTop: hp(1.5),
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 40,
    gap: 15,
    paddingVertical: 20,
  },
  blockItem: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  blockItemDes: {
    fontFamily: 'Monserrat-Regular',
    color: Colors.main.description,
    fontSize: 15,
  },
  blockItemText: {
    fontFamily: 'Monserrat-SemiBold',
    fontWeight: '600',
    color: Colors.main.text,
    fontSize: 15,
  },
  footer: {
    //backgroundColor: 'red',
    //flex: 1,
    width: '100%',
    padding: 20,
    gap: 4,
    alignItems: 'center',
  },
  footerBtn1: {
    width: '80%',
    padding: 14,
    backgroundColor: Colors.main.primary,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  footerBtn1Text: {
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
  footerBtn2: {
    width: '80%',
    padding: 14,
    borderColor: Colors.main.primary,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  footerBtn2Text: {
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
    fontSize: 18,
  },
});
