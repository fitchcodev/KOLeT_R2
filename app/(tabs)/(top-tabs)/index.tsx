import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { hp } from '@/helpers/common';
import { Colors } from '@/constants/Colors';
import KeyPadInput from '@/components/KeyPad';
import { router } from 'expo-router';
import NotificationModal from '@/components/NotificationModal';
import NfcManager from 'react-native-nfc-manager';
import Modal from 'react-native-modal';
import { useTransaction } from '@/contexts/ReceiptContext';
const Keypad = () => {
  const [narrattion, setNarration] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [editable, setEditable] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState(Colors.main.border);
  const textInputRef = useRef(null); // Create a ref for the TextInput
  const [modalNFCVisible, setModalNFCVisible] = useState<boolean>(false);
  const [nfcSupported, setNFCSupported] = useState<boolean>(false);
  const [modalNONNFCVisible, setModalNONNFCVisible] = useState<boolean>(false);
  const { saveTransactionAmount } = useTransaction();

  // Function to handle number press
  const handleNumberPress = (number: number) => {
    if (amount.toLocaleString().length < 9) {
      setAmount(prevAmount =>
        parseFloat(prevAmount.toString() + number.toString())
      );
    }
  };

  // Function to handle "del" (del) press
  const handleDelPress = () => {
    setAmount(prevAmount => {
      // Convert the current amount to a string and remove the last character
      const updatedAmount = prevAmount.toString().slice(0, -1);

      // If the updated amount is empty, set it to 0, otherwise parse the remaining string as a float
      return updatedAmount === '' ? 0 : parseFloat(updatedAmount);
    });
  };

  // Function to clear the amount
  const handleClearPress = () => {
    setAmount(0.0); // Reset the amount back to 0.00
  };

  // payment Navigate
  const handlePaymentNaviage = () => {
    saveTransactionAmount(amount as unknown as string);
    if (nfcSupported) {
      //setModalNFCVisible(true);
      router.push({
        pathname: '/(tabs)/nfcPayment',
        params: {
          amount,
          narrattion,
        },
      });
    } else {
      //setModalNONNFCVisible(true);
      router.push({
        pathname: '/(tabs)/payment',
        params: {
          amount,
          narrattion,
        },
      });
    }
  };

  // Format the amount with commas and limit to 2 decimal places
  const formattedAmount = amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Focus the TextInput when editable is set to true
  useEffect(() => {
    if (editable && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [editable]);

  useEffect(() => {
    const checkNfcSupport = async () => {
      const isSupported = await NfcManager.isSupported();
      if (isSupported) {
        console.log('NFC is supported on this device.');
        setNFCSupported(true);
        setModalNFCVisible(true);
        // await NfcManager.start();
      } else {
        console.log('NFC is not supported on this device.');
        setNFCSupported(false);
        setModalNONNFCVisible(true);
        // Show a message to the user, disable NFC functionality, etc.
      }
    };

    checkNfcSupport();

    // Clean up on unmount
  }, []);

  return (
    <>
      <NotificationModal />
      {/* Nfc Modal */}
      <Modal
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        backdropOpacity={0.2}
        isVisible={modalNFCVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalNFCVisible(!modalNFCVisible);
        }}
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalNFCVisible(!modalNFCVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Great news! Your device supports NFC. Press 'OK' to continue with
            your secure payment.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalNFCVisible(!modalNFCVisible)}>
            <Text style={styles.textStyle}>Ok</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Non Nfc Modal */}
      <Modal
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        backdropOpacity={0.2}
        isVisible={modalNONNFCVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalNONNFCVisible(!modalNONNFCVisible);
        }}
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalNONNFCVisible(!modalNONNFCVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Oops! Your device doesn't support NFC. Enter card details manually.
            Press 'OK' to proceed.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalNONNFCVisible(!modalNONNFCVisible)}>
            <Text style={styles.textStyle}>Ok</Text>
          </Pressable>
        </View>
      </Modal>

      {editable ? (
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.container}>
          {/* Your scrollable content goes here */}
          <Text style={styles.amount}>₦{formattedAmount}</Text>
          <Pressable
            onPress={() => setEditable(!editable)}
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor,
              },
            ]}>
            <TextInput
              inputMode="text"
              ref={textInputRef}
              maxLength={30}
              value={narrattion}
              onChangeText={setNarration}
              style={styles.inputField}
              onFocus={() => setInputBorderColor(Colors.main.primary)}
              onBlur={() => {
                setInputBorderColor(Colors.main.border);
                setEditable(!editable);
              }}
              clearButtonMode="while-editing"
              editable={editable}
            />
            {/* <TouchableOpacity onPress={handleClearSearch} style={{marginRight: 20, backgroundColor: Colors.main.primary, padding:10, borderRadius:100}}><Text style={{fontWeight:'bold', fontSize:10, fontFamily:'Monserrat-Regular'}}>X</Text></TouchableOpacity> */}
          </Pressable>
          <KeyPadInput
            handleDelPress={handleDelPress}
            handleClearPress={handleClearPress}
            handleNumberPress={handleNumberPress}
          />
          <TouchableOpacity
            onPress={handlePaymentNaviage}
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? '#3498DB1A' : Colors.main.primary,
              },
            ]}>
            <Text style={styles.payButtonText}>
              Pay{amount > 0 ? ` ₦${amount}` : null}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          {/* Your non-scrollable content goes here */}
          <Text style={styles.amount}>₦{formattedAmount}</Text>
          <Pressable
            onPress={() => setEditable(!editable)}
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor,
                justifyContent: narrattion.length > 0 ? 'flex-start' : 'center',
                paddingHorizontal: 20,
              },
            ]}>
            <Text style={styles.inputContainerText}>
              {narrattion.length > 0 ? narrattion : '+ Add Note'}
            </Text>
          </Pressable>

          <KeyPadInput
            handleDelPress={handleDelPress}
            handleClearPress={handleClearPress}
            handleNumberPress={handleNumberPress}
          />
          <TouchableOpacity
            onPress={handlePaymentNaviage}
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? '#3498DB1A' : Colors.main.primary,
              },
            ]}>
            <Text style={styles.payButtonText}>
              Pay{amount > 0 ? ` ₦${amount}` : null}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Keypad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 30,
    paddingVertical: hp(2.5),
    gap: hp(1.5),
  },
  amount: {
    fontSize: hp(5),
    fontFamily: 'Montserrat-SemiBold',
  },
  inputContainer: {
    backgroundColor: Colors.main.background,
    flexDirection: 'row',
    alignItems: 'center',
    //paddingRight: 30,
    height: hp(6.2),
    borderWidth: 1.2,
    borderRadius: 4,
    borderColor: Colors.main.border,
  },
  inputField: {
    fontFamily: 'Montserrat-SemiBold',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    fontSize: hp(2.3),
    color: Colors.main.text,
  },
  inputContainerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp(2.3),
  },
  payButton: {
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp(10),
  },
  payButtonText: {
    fontSize: 22,
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
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
