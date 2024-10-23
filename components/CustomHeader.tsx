import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hp } from '@/helpers/common';
import UserIC from '@/assets/images/svg/UserIC';
import { Colors } from '@/constants/Colors';
import Notofication from '@/assets/images/svg/NtoficationIC';

const CustomHeader = () => {
    const { top } = useSafeAreaInsets();
    const paddinTop = top > 0 ? top + 10 : 30;
  return (
    <View style={[styles.container, {paddingTop:paddinTop}]}>
        <View style={{ backgroundColor: Colors.main.inputBg, padding: 10, borderRadius: 100, marginRight:10}}>
            <UserIC width={20} height={20}/>
        </View>
        
      <Text style={[styles.headerText, {fontWeight: "400",}]}>Hello <Text style={{fontWeight: "600",}}>Candy!</Text></Text>
      <TouchableOpacity>
      <Notofication width={22} height={22}/></TouchableOpacity>

    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
    container: {
        //flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: hp(12),
        backgroundColor:Colors.main.background,
        paddingHorizontal: 30,
        paddingBottom: 25,
    },
    headerText: {
        fontSize: 22,
        color: Colors.main.text,
        fontFamily: "Raleway-Reguar",
        marginRight: 'auto'
    },
})