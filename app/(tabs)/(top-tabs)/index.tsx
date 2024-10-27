import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, {  useEffect, useRef, useState } from "react";
import { hp } from "@/helpers/common";
import { Colors } from "@/constants/Colors";
import KeyPadInput from "@/components/KeyPad";
import { router } from "expo-router";
import NotificationModal from "@/components/NotificationModal";

const Keypad = () => {
  const [narrattion, setNarration] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [editable, setEditable] = useState(false);
  const [inputBorderColor, setInputBorderColor] = useState(Colors.main.border);
  const textInputRef = useRef(null); // Create a ref for the TextInput

  // Function to handle number press
  const handleNumberPress = (number: number) => {
    if (amount.toLocaleString().length < 9) {
      setAmount((prevAmount) =>
        parseFloat(prevAmount.toString() + number.toString())
      );
    }
  };

  // Function to handle "del" (del) press
  const handleDelPress = () => {
    setAmount((prevAmount) => {
      // Convert the current amount to a string and remove the last character
      const updatedAmount = prevAmount.toString().slice(0, -1);

      // If the updated amount is empty, set it to 0, otherwise parse the remaining string as a float
      return updatedAmount === "" ? 0 : parseFloat(updatedAmount);
    });
  };

  // Function to clear the amount
  const handleClearPress = () => {
    setAmount(0.0); // Reset the amount back to 0.00
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


  return (
    <>
    <NotificationModal/>
      {editable ? (
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.container}
        >
          {/* Your scrollable content goes here */}
          <Text style={styles.amount}>₦{formattedAmount}</Text>
          <Pressable
            onPress={() => setEditable(!editable)}
            style={[
              styles.inputContainer,
              {
                borderColor: inputBorderColor,
              },
            ]}
          >
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
            onPress={() =>
              router.push({
                pathname: "/(tabs)/nfcPayment",
                params: {
                  amount,
                  narrattion,
                },
              })
            }
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? "#3498DB1A" : Colors.main.primary,
              },
            ]}
          >
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
                justifyContent: narrattion.length > 0 ? "flex-start" : "center",
                paddingHorizontal: 20,
              },
            ]}
          >
            <Text style={styles.inputContainerText}>
              {narrattion.length > 0 ? narrattion : "+ Add Note"}
            </Text>
          </Pressable>

          <KeyPadInput
            handleDelPress={handleDelPress}
            handleClearPress={handleClearPress}
            handleNumberPress={handleNumberPress}
          />
          <TouchableOpacity
            onPress={() =>
              router.replace({
                pathname: "/(tabs)/nfcPayment",
                params: {
                  amount,
                  narrattion,
                },
              })
            }
            disabled={amount <= 0}
            style={[
              styles.payButton,
              {
                backgroundColor:
                  amount <= 0 ? "#3498DB1A" : Colors.main.primary,
              },
            ]}
          >
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
    fontFamily: "Montserrat-SemiBold",
  },
  inputContainer: {
    backgroundColor: Colors.main.background,
    flexDirection: "row",
    alignItems: "center",
    //paddingRight: 30,
    height: hp(6.2),
    borderWidth: 1.2,
    borderRadius: 4,
    borderColor: Colors.main.border,
  },
  inputField: {
    fontFamily: "Montserrat-SemiBold",
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    fontSize: hp(2.3),
    color: Colors.main.text,
  },
  inputContainerText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: hp(2.3),
  },
  payButton: {
    padding: 10,
    marginHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    marginBottom:hp(10),
  },
  payButtonText: {
    fontSize: 22,
    fontFamily: "Raleway-SemiBold",
    color: "white",
  },
});
