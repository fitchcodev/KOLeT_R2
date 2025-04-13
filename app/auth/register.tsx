import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  createUsername,
  dateToString,
  formatDate,
  hp,
  validateEmail,
  validateNigerianPhoneNumber,
  wp,
} from '@/helpers/common';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import DatePicker from 'react-native-date-picker';
import { StatusBar } from 'expo-status-bar';
import CustomTextInput from '@/components/CustomTextInput';
import { UserContext } from '@/contexts/UserContext';

const Register = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const { user, updateUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [formattedDate, setFormattedDate] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (dateOfBirth) {
      setFormattedDate(formatDate(dateOfBirth));
    }
  }, [dateOfBirth]);

  const handleSubmit = () => {
    updateUser({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth: dateToString(dateOfBirth!),
      username: createUsername(firstName, lastName),
    });

    router.push('/auth/createPassword');
  };

  const handleDateChange = (date: Date) => {
    setDateOfBirth(date);
  };

  const checkButtonDisabled = () => {
    return (
      !(firstName && lastName && validateNigerianPhoneNumber(phone)) ||
      (email && !validateEmail(email)) ||
      !dateOfBirth
    );
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
          gap: 15,
        }}
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* Heading */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.heading}>
          <Text style={styles.headingTextTitle}>
            Sign Up for{' '}
            <Text style={{ color: Colors.main.primary }}>Kolet</Text>{' '}
          </Text>
          <Text style={styles.headingTextDescript}>
            Unlock the future of convenient transactions with Kolet. Sign up
            now!
          </Text>
        </Animated.View>

        {/* Heading End */}

        {/* form */}
        <View style={styles.formContainer}>
          <CustomTextInput
            inputMode="text"
            maxLength={200}
            value={firstName}
            onChange={setFirstName}
            placeholder="First Name"
            iconName="user"
            iconHieght={15}
            iconWidth={15}
            keyboardType="default"
          />
          <CustomTextInput
            inputMode="text"
            maxLength={200}
            value={lastName}
            onChange={setLastName}
            placeholder="Last Name"
            iconName="user"
            iconHieght={15}
            iconWidth={15}
            keyboardType="default"
          />
          <CustomTextInput
            inputMode="numeric"
            maxLength={11}
            value={phone}
            onChange={setPhone}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            iconName="phone"
            iconHieght={18}
            iconWidth={16}
          />
          <CustomTextInput
            inputMode={'email'}
            value={email}
            onChange={setEmail}
            iconName="mail"
            iconHieght={15}
            iconWidth={15}
            keyboardType="email-address"
            maxLength={50}
            placeholder="Email (Optional)"
          />
          <Pressable onPress={() => setOpen(true)}>
            <CustomTextInput
              inputMode={'text'}
              maxLength={200}
              value={formattedDate}
              placeholder="Date of Birth"
              editable={false}
              iconName="calendar"
              iconHieght={15}
              iconWidth={15}
              keyboardType={''}
            />
            <DatePicker
              modal
              open={open}
              date={dateOfBirth || new Date()}
              mode="date"
              maximumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                handleDateChange(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </Pressable>
        </View>

        {/* progressBar */}
        <Animated.View entering={FadeIn.delay(800)} style={styles.progressBar}>
          <View
            style={
              !checkButtonDisabled()
                ? styles.progressBarItemActive
                : styles.progressBarItemInactive
            }
          />
          <View style={styles.progressBarItemInactive} />
          <View style={styles.progressBarItemInactive} />
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
            disabled={checkButtonDisabled()}
            onPress={handleSubmit}
            style={[
              styles.footerBtn,
              {
                backgroundColor: Colors.main.primary,
                opacity: !checkButtonDisabled() ? 1 : 0.5,
              },
            ]}>
            <Text style={styles.footerBtnText}>Next</Text>
          </TouchableOpacity>

          <Text
            onPress={() => router.navigate('/auth/login')}
            style={styles.footerText}>
            Already a member?{' '}
            <Text style={{ color: Colors.main.primary }}>Login</Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

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
    width: '100%',
    gap: 16,
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
    color: Colors.main.text,
  },

  progressBar: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 50,
    gap: 10,
    marginVertical: 35,
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
    flex: 1,
    width: '100%',
    gap: 15,
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
    fontSize: 20,
  },
  footerText: {
    fontWeight: '600',
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    color: Colors.main.text,
    fontSize: 16,
  },
});
