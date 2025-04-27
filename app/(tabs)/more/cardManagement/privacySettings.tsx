import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { hp } from '@/helpers/common'

const PrivacySettings = () => {
    const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [isEnabledTransAlert, setIsEnabledTransAlert] = useState(true);

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
       <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <TouchableOpacity style={{flex:1}}  onPress={() => router.navigate('/(tabs)/more/cardManagement')}>
            <ArrowLftIC width={30} height={30} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              fontFamily: "Montserrat-Regular",
              color: Colors.main.primary,
              textAlign:'center',

            }}
          >
            Privacy Settings
          </Text>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.mainContainer}>
            <View style={styles.tooglexBox}>
                <View>
                    <Text style={styles.toogleBoxText}>User Data Agreement</Text>
                </View>

                <View style={{transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],  }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={()=>setIsEnabledTransAlert(!isEnabledTransAlert)}
                  value={isEnabledTransAlert}
                />
              </View>
            </View>
            <Text style={styles.text}>By clicking on the toggle button above, you agree to allow KOLeT Tap and Pay to securely store and share your data with trusted third parties for enhanced services and personalized experiences. Your privacy and security are our top priorities. Review our privacy policy for more details.</Text>
        </View>
    </View>
  )
}

export default PrivacySettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.main.background,
        justifyContent: "flex-start",
        padding:20,
      },
      mainContainer: {
        // backgroundColor:'red',
        marginTop: hp(5),
        flex: 1,
        paddingVertical: 20,
      },
      tooglexBox:{
        backgroundColor:'white',
        paddingVertical:15,
        paddingHorizontal:25,
       flexDirection:'row',
       justifyContent:'space-between',
    alignItems: "center",

        borderRadius: 20,

      },
      toogleBoxText:{
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "Montserrat-Regular",
        color: Colors.main.text,
      },
      text:{
        paddingLeft:20,
        fontSize: 13,
        letterSpacing: 1,
        lineHeight: 22,
        fontFamily: "Montserrat-Regular",
        marginVertical: 15,
        color: Colors.main.text,
      }
})
