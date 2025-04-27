import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { hp, wp } from '@/helpers/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC';
import CustomTextInput from '@/components/CustomTextInput';
import { useCountdown } from '@/hooks/useCountdown';
import { Alert } from 'react-native';

const verifyOTP = () => {
  const handleButton = () => {
    router.navigate('/(tabs)/receipt');
  };
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [otpValues, setOtpValues] = useState('');

  const checkButtonDisabled = () => {
    return otpValues.length < 4;
  };
  const { seconds, formattedTime, isActive, restart } = useCountdown({
    initialSeconds: 60, // Different initial value
    autoStart: false, // Don't start automatically
  });

  useEffect(() => {
    // Start the timer immediately when the screen opens
    if (!isActive) {
      restart();
    }
  }, []);

  const renderTimerText = () => {
    if (seconds === 0) {
      return (
        <Text style={[styles.timerText, { color: Colors.main.error }]}>
          Time expired!
        </Text>
      );
    }

    return (
      <Text
        style={[
          styles.timerText,
          {
            fontSize: 16,
            fontFamily: 'Montserrat-SemiBold',
            color: seconds < 10 ? Colors.main.error : Colors.main.text,
          },
        ]}>
        Time remaining: {formattedTime()} sec
      </Text>
    );
  };

  const handleResendOTP = () => {
    // Restart the timer
    restart();

    // Show feedback to user
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone');
  };

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: '100%',
          paddingTop: 5,
          paddingHorizontal: 20,
          paddingBottom: 30,
        }}>
        <ArrowLftIC width={30} height={30} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
          //   gap: hp(2.5)
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* Heading */}

        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}>
          <Text style={styles.headingTextTitle}>Verify Your Transaction</Text>
          <Text style={styles.headingTextDescript}>
            Enter the OTP sent by your {'\n'}bank to complete the transaction.
          </Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <CustomTextInput
            keyboardType="phone-pad"
            inputMode="numeric"
            maxLength={11}
            onChange={setOtpValues}
            placeholder="Enter OTP"
            value={otpValues}
          />
          <View style={styles.timerCon}>
            {renderTimerText()}
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={isActive && seconds > 0}
              style={{
                marginTop: 15,
                padding: 10,
                opacity: isActive && seconds > 0 ? 0.5 : 1,
              }}>
              <Text
                style={[
                  styles.timerText,
                  {
                    color: Colors.main.primary,
                    fontFamily: 'Montserrat-SemiBold',
                  },
                ]}>
                {isActive && seconds > 0
                  ? `Resend available in ${formattedTime()}`
                  : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}>
          <TouchableOpacity
            disabled={checkButtonDisabled()}
            onPress={handleButton}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}>
            <Text style={styles.footerBtnText}>Pay</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default verifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.inputBg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    alignItems: 'center',
    gap: 20,
    marginTop: 50,
  },
  headingTextTitle: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
  },
  headingTextDescript: {
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.description,
    textAlign: 'center',
    fontSize: 15,
  },
  formContainer: {
    marginTop: 50,
    width: '100%',
    gap: 40,
    //backgroundColor: 'red'
  },
  otpField: {
    fontFamily: 'Montserrat-SemiBold',
    width: '100%',
    height: '100%',
    color: '#333',
    fontSize: hp(4),
    textAlign: 'center',
  },
  otpFieldContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    width: '22%',
    height: hp(9),
    borderWidth: 0.7,
    borderRadius: 4,
  },
  timerCon: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 15,
    borderRadius: 8,
  },
  timerText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  progressBar: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 50,
    gap: 10,
    marginVertical: hp(6),
  },
  progressBarItemActive: {
    height: hp(1),
    width: '30%',
    borderRadius: 20,
    backgroundColor: Colors.main.primary,
  },
  progressBarItemInactive: {
    height: hp(1),
    width: '30%',
    borderRadius: 20,
    backgroundColor: 'white',
  },

  footer: {
    // backgroundColor: "red",
    flex: 1,
    width: '100%',
    gap: hp(3.5),
    alignItems: 'center',
  },
  footerTextTiltle: {
    fontWeight: '300',
    fontFamily: 'Raleway-RegularS',
    textAlign: 'center',
    fontSize: 15,
    alignItems: 'center',
  },
  footerBtn: {
    padding: 15,
    width: '80%',
    borderRadius: 4,
  },
  footerBtnText: {
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  footerText: {
    fontWeight: '600',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    color: Colors.main.text,
    fontSize: hp(2),
  },
});
