import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { hp, validateNigerianPhoneNumber, wp } from '@/helpers/common';
import Logo from '@/assets/images/svg/Logo';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import XIC from '@/assets/images/svg/XIC';
import FB from '@/assets/images/svg/FB';
import GoogleIc from '@/assets/images/svg/GoogleIc';
import AppleIC from '@/assets/images/svg/AppleIC';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/CustomTextInput';
import { useLoginMutation } from '@/api/auth';
import { UserContext } from '@/contexts/UserContext';

const Login = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState('');
  const { mutate, isPending, error } = useLoginMutation();
  const { updateUser } = useContext(UserContext);
  const onSubmit = () => {
    const payload = { phone, password };
    mutate(
      { ...payload },
      {
        onSuccess: data => {
          updateUser(data.data);

          router.navigate('/(tabs)/(top-tabs)');
        },
        onError: error => {
          console.warn(error);
        },
      }
    );
  };
  const checkButtonDisabled = () => {
    return !(validateNigerianPhoneNumber(phone) || password.length < 4);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: paddinTop }]}>
      <StatusBar style='dark' />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
          gap: 15,
        }}
        keyboardDismissMode='interactive'
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}>
          <Logo />
          <Text style={styles.headerTextTitle}>Welcome Back!</Text>
          <Text style={styles.headerTextDes}>
            Log in to your account to{'\n'} continue.
          </Text>
        </Animated.View>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomTextInput
            inputMode='numeric'
            maxLength={11}
            value={phone}
            onChange={setPhone}
            placeholder='Phone '
            keyboardType='phone-pad'
            iconName='phone'
            iconHieght={18}
            iconWidth={16}
          />
          <CustomTextInput
            maxLength={20}
            secureTextEntry={showPassword}
            setShowconfirmPassword={setShowPassword}
            value={password}
            onChange={setPassword}
            placeholder='Password'
            iconName={showPassword ? 'viewOn' : 'viewOff'}
            iconWidth={20}
            iconHieght={20}
          />
        </View>
        {/* Forgot password */}
        <Animated.View
          style={{ alignSelf: 'flex-end', paddingHorizontal: 4 }}
          entering={FadeInRight.delay(600).springify()}>
          <Text
            onPress={() => router.navigate('/auth/forgotPassword')}
            style={{
              fontSize: 12,
              letterSpacing: 0.1,
              fontFamily: 'Montserrat-Regular',
              color: Colors.main.primary,
            }}>
            Forgot Password?
          </Text>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}>
          <TouchableOpacity
            disabled={checkButtonDisabled() || isPending}
            onPress={onSubmit}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}>
            <Text style={styles.footerBtnText}>
              {!isPending ? 'Sign In' : 'Loading...'}
            </Text>
          </TouchableOpacity>
          {error && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              There was an error logging you in. Please try again later{' '}
              {error.message}
            </Text>
          )}
          <Text
            onPress={() => router.navigate('/auth/register')}
            style={styles.footerText}>
            Not a member?{' '}
            <Text style={{ color: Colors.main.primary }}>Sign Up</Text>
          </Text>
          <View style={styles.footerBottom}>
            <Text style={styles.footerBottomText}>
              {' '}
              Get started in a single click!
            </Text>
            <View style={styles.socialLink}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0866FF',
                  padding: 10,
                  borderCurve: 'continuous',
                  borderRadius: 10,
                }}>
                <FB width={25} height={25} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  borderCurve: 'continuous',
                  borderRadius: 10,
                }}>
                <XIC width={25} height={25} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderCurve: 'continuous',
                  borderRadius: 10,
                }}>
                <GoogleIc width={25} height={25} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  padding: 10,
                  borderCurve: 'continuous',
                  borderRadius: 10,
                }}>
                <AppleIC width={25} height={25} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  headerTextTitle: {
    marginTop: hp(4),
    fontSize: hp(3.5),
    textAlign: 'center',
    width: '100%',
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
  },
  headerTextDes: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.description,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    gap: 25,
  },
  inputFieldContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(6.2),
    borderWidth: 0.7,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 30,
  },

  inputField: {
    fontFamily: 'Montserrat-Regular',
    width: '100%',
    height: '100%',
    color: '#333',
  },
  footer: {
    marginTop: hp(5),
    flex: 1,
    width: '100%',
    gap: 25,
    alignItems: 'center',
  },
  footerTextTiltle: {
    fontWeight: '300',
    fontFamily: 'Raleway-RegularS',
    textAlign: 'center',
    fontSize: 16,
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
  footerText: {
    fontWeight: '600',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    color: Colors.main.text,
    fontSize: 16,
  },
  footerBottom: {
    //backgroundColor: 'red',
    marginTop: 10,
    alignItems: 'center',
    // gap: 20,
    width: '100%',
    borderTopWidth: 0.7,
    borderTopColor: Colors.main.description,
  },
  footerBottomText: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.text,
    textAlign: 'center',
  },
  socialLink: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 30,
  },
});
