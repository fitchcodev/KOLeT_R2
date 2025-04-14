import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { generateQRId, hp } from '@/helpers/common';
import { Colors } from '@/constants/Colors';
import KeyPadInput from '@/components/KeyPad';
import { router } from 'expo-router';
import NotificationModal from '@/components/NotificationModal';
import NfcManager from 'react-native-nfc-manager';
import Modal from 'react-native-modal';
import { Modal as RnModal } from 'react-native';
import { PaymentMethod, useTransaction } from '@/contexts/TransactionContext';
import { BlurView } from 'expo-blur';
import { UserContext } from '@/contexts/UserContext';

const Keypad = () => {
  const [narration, setNarration] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [formattedAmount, setFormattedAmount] = useState('₦0.00');
  const [editable, setEditable] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState(Colors.main.border);
  const textInputRef = useRef(null);
  const [modalNFCVisible, setModalNFCVisible] = useState<boolean>(false);
  const [nfcSupported, setNFCSupported] = useState<boolean>(false);
  const [modalNONNFCVisible, setModalNONNFCVisible] = useState<boolean>(false);
  const { saveTransaction, getTransaction } = useTransaction();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const { user } = useContext(UserContext);

  // Function to handle number press
  const handleNumberPress = (number: number) => {
    if (amount.toString().replace('.', '').length < 9) {
      setAmount(prevAmount => {
        const prevStr = prevAmount.toString();
        const newStr = prevStr + number.toString();
        return parseFloat(newStr);
      });
    }
  };

  useEffect(() => {
    // Set Payment Method
    if (nfcSupported) {
      setPaymentMethod(PaymentMethod.NFC);
    } else {
      setPaymentMethod(PaymentMethod.CARD);
    }
  }, [nfcSupported]);

  // Function to handle "del" (del) press
  const handleDelPress = () => {
    setAmount(prevAmount => {
      // Convert the current amount to a string and remove the last character
      const updatedAmount = prevAmount.toString().slice(0, -1);
      return updatedAmount === '' ? 0 : parseFloat(updatedAmount);
    });
  };

  // Function to format the amount
  useEffect(() => {
    const formatted = amount.toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN',
    });
    setFormattedAmount(formatted);
  }, [amount]);

  // Function to clear the amount
  const handleClearPress = () => {
    setAmount(0.0);
  };

  // payment Navigate
  const handlePaymentNavigate = () => {
    const transactionData = {
      id: generateQRId(),
      amount,
      narration,
      paymentMethod,
      formattedAmount,
      status: 'Pending' as const,
      date: new Date(),
      user: {
        name: `${user?.firstName} ${user?.lastName}`,
        phone: user?.phone,
        id: user?.id,
      },
    };

    saveTransaction(transactionData);

    if (amount > 15000) {
      setModalVisible(true);
    } else if (nfcSupported) {
      router.push({
        pathname: '/(tabs)/nfcPayment',
      });
      // Clear fields immediately after navigation call
      setAmount(0.0);
      setNarration('');
    } else {
      router.push({
        pathname: '/(tabs)/payment/cardDetailsForm',
      });
      // Clear fields immediately after navigation call
      setAmount(0.0);
      setNarration('');
    }
  };

  // Focus the TextInput when editable is set to true
  useEffect(() => {
    if (editable && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [editable]);

  useEffect(() => {
    const checkNfcSupport = async () => {
      try {
        const isSupported = await NfcManager.isSupported();
        if (isSupported) {
          console.log('NFC is supported on this device.');
          setNFCSupported(true);
          setModalNFCVisible(true);
        } else {
          console.log('NFC is not supported on this device.');
          setNFCSupported(false);
          setModalNONNFCVisible(true);
        }
      } catch (error) {
        console.error('Error checking NFC support:', error);
        setNFCSupported(false);
        setModalNONNFCVisible(true);
      }
    };

    checkNfcSupport();
  }, []);

  const handleModalClose = () => {
    setModalVisible(false);
    router.navigate('/(tabs)/payment/cardDetailsForm');

    // Clear fields immediately after navigation call
    setAmount(0.0);
    setNarration('');
  };

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
        onBackdropPress={() => setModalNFCVisible(false)}
        onBackButtonPress={() => setModalNFCVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Great news! Your device supports NFC. Press 'OK' to continue with
            your secure payment.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalNFCVisible(false)}>
            <Text style={styles.textStyle}>Ok</Text>
          </Pressable>
        </View>
      </Modal>
      {/* Price check modal */}
      <RnModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <BlurView intensity={30} tint="dark" style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextTitle}>Payment Limit Reached</Text>
            <Text style={styles.modalTextDes}>
              Oops! Looks like you've hit the payment limit. For NFC
              transactions above ₦15,000, please proceed by entering your ATM
              {'\n'} card PIN in the designated area.
            </Text>
            <Pressable style={styles.button} onPress={handleModalClose}>
              <Text style={styles.textStyle}>Proceed</Text>
            </Pressable>
          </View>
        </BlurView>
      </RnModal>
      {/* Non Nfc Modal */}
      <Modal
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        backdropOpacity={0.2}
        isVisible={modalNONNFCVisible}
        style={styles.centeredView}
        onBackdropPress={() => setModalNONNFCVisible(false)}
        onBackButtonPress={() => setModalNONNFCVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Oops! Your device doesn't support NFC. Enter card details manually.
            Press 'OK' to proceed.
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => setModalNONNFCVisible(false)}>
            <Text style={styles.textStyle}>Ok</Text>
          </Pressable>
        </View>
      </Modal>
      {editable ? (
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.container}>
          {/* Your scrollable content goes here */}
          <Text style={styles.amount}>{formattedAmount}</Text>
          <Pressable
            onPress={() => {}} // Removed toggle since we're already in edit mode
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
              value={narration}
              onChangeText={setNarration}
              style={styles.inputField}
              onFocus={() => setInputBorderColor(Colors.main.primary)}
              onBlur={() => {
                setInputBorderColor(Colors.main.border);
                setEditable(false);
              }}
              clearButtonMode="while-editing"
              editable={true}
            />
          </Pressable>
          <KeyPadInput
            handleDelPress={handleDelPress}
            handleClearPress={handleClearPress}
            handleNumberPress={handleNumberPress}
          />
          <TouchableOpacity
            onPress={handlePaymentNavigate}
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? '#3498DB1A' : Colors.main.primary,
              },
            ]}>
            <Text style={styles.payButtonText}>
              Pay{amount > 0 ? ` ${formattedAmount}` : ''}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          {/* Your non-scrollable content goes here */}
          <Text style={styles.amount}>{formattedAmount}</Text>
          <Pressable
            onPress={() => setEditable(true)}
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor,
                justifyContent: narration.length > 0 ? 'flex-start' : 'center',
                paddingHorizontal: 20,
              },
            ]}>
            <Text style={styles.inputContainerText}>
              {narration.length > 0 ? narration : '+ Add Note'}
            </Text>
          </Pressable>

          <KeyPadInput
            handleDelPress={handleDelPress}
            handleClearPress={handleClearPress}
            handleNumberPress={handleNumberPress}
          />
          <TouchableOpacity
            onPress={handlePaymentNavigate}
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? '#3498DB1A' : Colors.main.primary,
              },
            ]}>
            <Text style={styles.payButtonText}>
              Pay{amount > 0 ? ` ${formattedAmount}` : ''}
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
