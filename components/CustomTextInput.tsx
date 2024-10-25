import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, {  FunctionComponent, useState } from 'react'
import { hp } from '@/helpers/common'
import Animated, { FadeInRight } from 'react-native-reanimated'
import PhoneIC from '@/assets/images/svg/PhoneIC'
import MailIc from '@/assets/images/svg/MailIc'
import { Colors } from '@/constants/Colors'
import ViewOn from '@/assets/images/svg/ViewOn'
import ViewOff from '@/assets/images/svg/ViewOff'
import UserIC from '@/assets/images/svg/UserIC'
import CalenderIC from '@/assets/images/svg/CalenderIC'
import SmartCardIC from '@/assets/images/svg/SmartCardIC'

interface IconProps{
    width: number,
    height: number,
}
interface InputProps {
    inputMode: string,
    maxLength: number,
    value: any,
    onChange: Function,
    placeholder: string,
    keyboardType: string,
    iconName: string,
    iconWidth: number, 
    iconHieght: number,
    props: {}

}



const CustomTextInput: FunctionComponent<InputProps> = ({inputMode, maxLength, value,onChange,placeholder,keyboardType, iconName, iconWidth, iconHieght, ...props}) => {
    const [inputBorderColor, setInputBorderColor]=useState(Colors.main.border);
    const icons: {}={
      mail: <MailIc width={iconWidth} height={iconHieght}/>,
      phone: <PhoneIC width={iconWidth} height={iconHieght}/>,
      viewOn: <ViewOn width={iconWidth} height={iconHieght}/>,
      viewOff: <ViewOff width={iconWidth} height={iconHieght}/>,
      user: <UserIC width={iconWidth} height={iconHieght}/>,
      calendar: <CalenderIC width={iconWidth} height={iconHieght} />,
      card: <SmartCardIC width={iconWidth} height={iconHieght} />,
}
    const customOnFocus = () => {
        props?.onFocus;
        setInputBorderColor(Colors.main.primary)
        
    };
  
    const customOnBlur = () => {
      props?.onBlur;
      setInputBorderColor(Colors.main.border)
      
  };

  const handleOnPress = () => {
     if (props?.setShowconfirmPassword !== undefined && props?.secureTextEntry !== undefined){
      props?.setShowconfirmPassword(!props?.secureTextEntry);
     } 
     if (props?.setShowPassword !== undefined && props?.secureTextEntry !== undefined){
      props?.setShowPassword(!props?.secureTextEntry);
     } 
  };
  
  return (
    <Animated.View
      entering={FadeInRight.delay(400).springify()}
      style={[
        styles.inputFieldContainer,
        {
          borderColor: inputBorderColor
        },
      ]}
    >
      <TextInput
        inputMode={inputMode}
        keyboardAppearance='light'
        maxLength={maxLength}
        value={value}
        onChangeText={(text)=>onChange(text)}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={styles.inputField}
        onFocus={customOnFocus}
        onBlur={customOnBlur}
        editable={props?.editable}
        secureTextEntry={props?.secureTextEntry}
        placeholderTextColor={"rgba(0,0,0,0.5)"}
        onPressIn={props?.onPressIn}
      />
      <TouchableOpacity onPress={handleOnPress}>
        {icons[iconName]}
      </TouchableOpacity>
      
    </Animated.View>
  )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    inputFieldContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        height: hp(6.2),
        borderWidth: 1.2,
        borderRadius: 4,
        paddingLeft: 20,
        paddingRight: 30,
      },
    
      inputField: {
        fontFamily: "Montserrat-Regular",
        width: "100%",
        height: "100%",
        color: Colors.main.text,
      },
})