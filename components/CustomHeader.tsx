import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '@/helpers/common';
import UserIC from '@/assets/images/svg/UserIC';
import { Colors } from '@/constants/Colors';
import Notofication from '@/assets/images/svg/NtoficationIC';
import { UserContext } from '@/contexts/UserContext';

const CustomHeader = ({ ...props }) => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const { user } = useContext(UserContext);
  const handleButton = () => {
    props.setModalIsActive(!props.isModalActive);
    console.log('pressed', props.isModalActive);
  };
  return (
    <View style={[styles.container, { paddingTop }]}>
      <View
        style={{
          backgroundColor: Colors.main.inputBg,
          padding: 10,
          borderRadius: 100,
          marginRight: 10,
        }}>
        <UserIC width={20} height={20} fill="#BDC3C7" stroke={'#BDC3C7'} />
      </View>

      <Text style={[styles.headerText, { fontWeight: '400' }]}>
        Hello <Text style={{ fontWeight: '600' }}>{user.firstName}!</Text>
      </Text>
      <TouchableOpacity onPress={handleButton}>
        <Notofication width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //height: hp(12),
    backgroundColor: Colors.main.background,
    paddingHorizontal: 30,
    paddingBottom: hp(2.5),
  },
  headerText: {
    fontSize: 22,
    color: Colors.main.text,
    fontFamily: 'Raleway-Reguar',
    marginRight: 'auto',
  },
});
