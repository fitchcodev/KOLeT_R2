import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { Colors } from '@/constants/Colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import SearchIC from '@/assets/images/svg/SearchIC';
import UserIC from '@/assets/images/svg/UserIC';
import { hp, wp } from '@/helpers/common';
import PhoneIC from '@/assets/images/svg/PhoneIC';
import MailIc from '@/assets/images/svg/MailIc';
import EditIC from '@/assets/images/svg/EditIC';
import { UserContext } from '@/contexts/UserContext';

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const { user, updateUser } = useContext(UserContext);
  const paddinTop = top > 0 ? top + 10 : 30;
  const [editable, setEditable] = useState(false);
  const [fullName, setFullName] = useState(
    `${user.firstName} ${user.lastName}`
  );
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  function handleButton(event: GestureResponderEvent): void {
    setEditable(false);

    const payload = {
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1],
      phone,
      email,
    };
    updateUser(payload);
  }

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <View
        style={{
          width: '100%',
          paddingTop: 5,
          //paddingBottom: 30,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignContent: 'center',
          //backgroundColor:'red'
        }}>
        {!editable && (
          <Pressable onPress={() => setEditable(true)}>
            <EditIC width={20} height={20} />
          </Pressable>
        )}
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.profile}>
          <Pressable
            style={[
              styles.profileImg,
              {
                backgroundColor: editable
                  ? 'rgba(0,0,0,0.1)'
                  : Colors.main.inputBg,
              },
            ]}>
            <UserIC width={60} height={60} fill="#BDC3C7" stroke={'#BDC3C7'} />
            {editable && (
              <Text
                style={{
                  color: Colors.main.text,
                  fontSize: 14,
                  position: 'absolute',
                  bottom: 5,
                  fontFamily: 'Raleway-SemiBold',
                }}>
                Edit
              </Text>
            )}
          </Pressable>
          <Text style={styles.profileText}>{fullName}</Text>
        </View>
        {/* Form */}
        <ScrollView
          keyboardDismissMode="interactive"
          contentContainerStyle={styles.formContainer}>
          <View style={styles.form}>
            <UserIC width={20} height={20} stroke={Colors.main.primary} />
            {!editable ? (
              <View style={styles.formTextCon}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.text,
                  }}>
                  {fullName}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.description,
                  }}>
                  Full Name
                </Text>
              </View>
            ) : (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                style={styles.formInput}
                clearButtonMode="while-editing"
                keyboardType="default"
                autoCapitalize={'words'}
              />
            )}
          </View>

          <View style={styles.form}>
            <PhoneIC width={20} height={20} stroke={Colors.main.primary} />
            {!editable ? (
              <View style={styles.formTextCon}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.text,
                  }}>
                  {phone}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.description,
                  }}>
                  Phone Number
                </Text>
              </View>
            ) : (
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={styles.formInput}
                clearButtonMode="while-editing"
                keyboardType="number-pad"
              />
            )}
          </View>

          <View style={styles.form}>
            <MailIc width={20} height={20} stroke={Colors.main.primary} />
            {!editable ? (
              <View style={styles.formTextCon}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.text,
                  }}>
                  {email}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    fontFamily: 'Raleway-Regular',
                    color: Colors.main.description,
                  }}>
                  Email
                </Text>
              </View>
            ) : (
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.formInput}
                clearButtonMode="while-editing"
                keyboardType="email-address"
              />
            )}
          </View>
          {editable && (
            <View style={{ marginTop: '20%' }}>
              <TouchableOpacity
                //disabled={checkButtonDisabled()}
                onPress={handleButton}
                style={[
                  styles.footerBtn,
                  {
                    backgroundColor: Colors.main.primary,
                  },
                ]}>
                <Text style={styles.footerBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
    //backgroundColor: "blue",
    width: '100%',
    gap: hp(3.5),
    //alignItems: "center",
  },
  profile: {
    //backgroundColor:'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  profileImg: {
    padding: 20,
    borderRadius: 100,
    borderCurve: 'circular',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: Colors.main.text,
  },
  formContainer: {
    gap: 10,
    flex: 1,
    //height: "50%",
    //backgroundColor:'red'
  },
  form: {
    flex: 0.2,
    //backgroundColor:'pink',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: Colors.main.border,
    borderBottomWidth: 0.7,
  },
  formTextCon: {
    //backgroundColor: "red",
    paddingHorizontal: 20,
    gap: 10,
  },
  formInput: {
    paddingHorizontal: 10,
    flex: 1,
    //height: "70%",
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Raleway-Regular',
    color: Colors.main.text,
    // backgroundColor:'red',
  },
  footerBtn: {
    backgroundColor: Colors.main.primary,
    alignSelf: 'center',
    padding: 10,
    width: '60%',
    borderRadius: 4,
  },
  footerBtnText: {
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
