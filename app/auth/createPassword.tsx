import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { hp, validatePassword, wp } from '@/helpers/common';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import ViewOff from '@/assets/images/svg/ViewOff';
import ViewOn from '@/assets/images/svg/ViewOn';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/CustomTextInput';
import { router } from 'expo-router';
import { useSignupMutation } from '@/api/auth';
import { UserContext } from '@/contexts/UserContext';

const CreatePassword = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [showPassword, setShowPassword] = useState(true);
  const [showconfirmPassword, setShowconfirmPassword] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate, isPending } = useSignupMutation();
  const { user } = useContext(UserContext);

  const onSubmit = () => {
    const payload = {
      password,
    };

    mutate(
      { ...user, ...payload },
      {
        onSuccess: () => {
          router.push('/auth/otpScreen');
        },
        onError: error => {
          console.warn(error);
          //@ts-expect-error
          if ((error.responsecode = '400')) {
            Alert.alert('Error', error.message, [
              {
                text: 'Login',
                onPress: () => router.push('/auth/login'),
              },
              {
                text: 'Sign Up',
                onPress: () => router.push('/auth/register'),
              },
            ]);
          } else {
            Alert.alert('Oops!', 'There was an error creating your account');
          }
        },
      }
    );
  };

  const checkButtonIsDisabled = () => {
    return !validatePassword(password) || !(confirmPassword == password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: paddinTop }]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 40,
          width: wp(100),
        }}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}>
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

        {/* progressBar */}
        <Animated.View entering={FadeIn.delay(800)} style={styles.progressBar}>
          <View style={styles.progressBarItemActive} />
          <View
            style={
              !checkButtonIsDisabled()
                ? styles.progressBarItemActive
                : styles.progressBarItemInactive
            }
          />
        </Animated.View>
        {/* Footer */}
        <Animated.View
          entering={FadeInDown.delay(700).springify()}
          style={styles.footer}>
          <Text style={styles.footerTextTiltle}>
            By signing up, you agree to our{' '}
            <Text style={{ color: Colors.main.primary }}>Terms</Text> and{' '}
            <Text style={{ color: Colors.main.primary }}>Conditions</Text> and{' '}
            <Text style={{ color: Colors.main.primary }}>Privacy Policy</Text>
          </Text>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={checkButtonIsDisabled() || isPending}
            style={[
              styles.footerBtn,
              { opacity: checkButtonIsDisabled() || isPending ? 0.5 : 1 },
            ]}>
            <Text style={styles.footerBtnText}>
              {!isPending ? 'Create Account' : 'Loading...'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePassword;

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
    fontFamily: 'Montserrat-Semibold',
    color: Colors.main.description,
    textAlign: 'center',
    fontSize: 18,
  },
  formContainer: {
    marginTop: 50,
    width: '100%',
    gap: 10,
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
});
