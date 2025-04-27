import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { useConfirmOTPMutation } from '@/api/auth';
import { UserContext } from '@/contexts/UserContext';
import { useCountdown } from '@/hooks/useCountdown';

const OtpScreen = () => {
  const { mutate, isPending } = useConfirmOTPMutation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const {
    user: { phone },
  } = useContext(UserContext);
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

  const onSubmit = () => {
    const payload = {
      phone,
      otp: otp.join(''),
    };
    mutate(
      { ...payload },
      {
        onSuccess: data => {
          Alert.alert(
            'Success!',
            'Your account has been successfully verified',
            [
              {
                text: "Let's Go",
                onPress: () => {
                  router.push('/auth/login');
                },
              },
            ]
          );
        },
        onError: error => {
          Alert.alert('Oops!', 'There was an error verifying your account');
          console.warn(error);
        },
      }
    );
  };

  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const handleOTPEnter = (value: string, index: number) => {
    const newOTPValues = [...otp];
    newOTPValues[index] = value;
    setOtp(newOTPValues);
  };
  const focusNext = (currentIndex: number) => {
    if (currentIndex < 5) {
      // Move focus to the next input field
      otpInputRefs[currentIndex + 1]?.current?.focus();
    }
  };
  const checkButtonDisabled = () => {
    const value = otp.join('');
    return value.length < 4 || isPending;
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 20 }}>
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
          <Text style={styles.headingTextTitle}>Verify Your Identity</Text>
          <Text style={styles.headingTextDescript}>
            Enter the OTP sent to your {'\n'}registered number.
          </Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {otp.map((digit, index) => (
              <Animated.View
                entering={FadeInUp.delay(200).springify()}
                style={[
                  styles.otpFieldContainer,
                  {
                    borderColor:
                      otp[index].length > 0
                        ? Colors.main.primary
                        : Colors.main.description,
                  },
                ]}
                key={index}>
                <TextInput
                  ref={otpInputRefs[index]}
                  textContentType="oneTimeCode"
                  style={styles.otpField}
                  keyboardType="numeric"
                  maxLength={1} // Allow only one digit
                  value={digit}
                  onChangeText={text => {
                    handleOTPEnter(text, index);
                    // Move to the next input field
                    if (text !== '' && index < 6) {
                      focusNext(index);
                    }
                  }}
                />
              </Animated.View>
            ))}
          </View>
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
        {/* progressBar */}
        <Animated.View entering={FadeIn.delay(800)} style={styles.progressBar}>
          <View style={styles.progressBarItemActive} />
          <View style={styles.progressBarItemActive} />
          <View
            style={
              !checkButtonDisabled()
                ? styles.progressBarItemActive
                : styles.progressBarItemInactive
            }
          />
          <View style={styles.progressBarItemInactive} />
        </Animated.View>
        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}>
          <Text style={styles.footerTextTiltle}>
            Didn't receive the code? Tap to resend{' \n'}it to your registered{' '}
            <Text style={{ color: Colors.main.primary }}>Number</Text> and{' '}
            <Text style={{ color: Colors.main.primary }}>Email</Text>
          </Text>
          <TouchableOpacity
            disabled={checkButtonDisabled()}
            onPress={onSubmit}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}>
            <Text style={styles.footerBtnText}>
              {!isPending ? 'Activate Account' : 'Loading...'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default OtpScreen;

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
    gap: 20,
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
