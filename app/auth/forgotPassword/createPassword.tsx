import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { hp, validatePassword, wp } from '@/helpers/common';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import ViewOff from '@/assets/images/svg/ViewOff';
import ViewOn from '@/assets/images/svg/ViewOn';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC';
import CustomTextInput from '@/components/CustomTextInput';

const FpCreatePassword = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [showPassword, setShowPassword] = useState(true);
  const [showconfirmPassword, setShowconfirmPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const checkButtonIsDisabled = () => {
    return !validatePassword(password) || !(confirmPassword == password);
  };

  console.log(checkButtonIsDisabled());
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: paddinTop }]}>
      <StatusBar style="dark" />
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
        }}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}>
          <View style={styles.headerImg}>
            <Image
              source={require('@/assets/images/image20.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
          <Text style={styles.headingTextTitle}>Create Password</Text>
          <Text style={styles.headingTextDescript}>
            Secure your account with a{'\n'} strong password
          </Text>
        </Animated.View>

        {/* Haeding End */}
        {/* form */}
        <View style={styles.formContainer}>
          <CustomTextInput
            maxLength={20}
            secureTextEntry={showPassword}
            setShowPassword={setShowPassword}
            value={password}
            onChange={setPassword}
            placeholder="Create Password"
            iconName={showPassword ? 'viewOn' : 'viewOff'}
            iconWidth={20}
            iconHieght={20}
          />
          {validatePassword(password) && (
            <Animated.View entering={FadeInRight.delay(300).springify()}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: Colors.main.success,
                }}>
                Strong Password
              </Text>
            </Animated.View>
          )}
          {password.length > 1 && !validatePassword(password) && (
            <Animated.View entering={FadeInRight.delay(300).springify()}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: Colors.main.error,
                }}>
                Weak Password
              </Text>
            </Animated.View>
          )}

          <Animated.View entering={FadeInUp.delay(700).springify()}>
            <Text
              style={{
                fontFamily: 'Montserrat-Regular',
                fontSize: 12,
                color: Colors.main.description,
              }}>
              Password should be at least 8 characters long and include a mix of
              letters, numbers, and symbols.
            </Text>
          </Animated.View>

          <CustomTextInput
            maxLength={20}
            secureTextEntry={showconfirmPassword}
            setShowconfirmPassword={setShowconfirmPassword}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            iconName={showconfirmPassword ? 'viewOn' : 'viewOff'}
            iconWidth={20}
            iconHieght={20}
          />
          {confirmPassword.length > 1 && !(confirmPassword == password) && (
            <Animated.View entering={FadeInRight.delay(300).springify()}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  fontSize: 12,
                  color: Colors.main.error,
                }}>
                Password does not match
              </Text>
            </Animated.View>
          )}
        </View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.footerBtn,
              { opacity: checkButtonIsDisabled() ? 0.5 : 1 },
            ]}>
            <Text style={styles.footerBtnText}>Sumbit</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FpCreatePassword;

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
    height: hp(40),
    //backgroundColor:'red'
  },
  headerImg: {
    //backgroundColor: 'red',
    width: '60%',

    height: '50%',
    alignItems: 'center',
  },
  headingTextTitle: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
  },
  headingTextDescript: {
    fontFamily: 'Montserrat-Semibold',
    color: Colors.main.description,
    textAlign: 'center',
    fontSize: 18,
  },
  formContainer: {
    //marginTop: hp(2.5),
    width: '100%',
    gap: 10,
  },

  footer: {
    // backgroundColor: "red",
    marginTop: hp(5),
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  footerBtn: {
    backgroundColor: Colors.main.primary,
    padding: 15,
    width: '80%',
    borderRadius: 4,
  },
  footerBtnText: {
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
