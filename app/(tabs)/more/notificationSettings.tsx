import { Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { hp } from '@/helpers/common'
import ArrowLftIC from '@/assets/images/svg/ArrowLftIC'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const NotificationSettings = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [isEnabledTransAlert, setIsEnabledTransAlert] = useState(true);
  const [isEnabledOffersAlert, setIsEnabledOffersAlert] = useState(true);
  const [isEnableAppAlert, setIsEnabledAppAlert] = useState(true);
  const [isEnabledNewsAlert, setIsEnabledNewsAlert] = useState(true);
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
        <TouchableOpacity style={{flex:1}}  onPress={() => router.navigate('/(tabs)/more')}>
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
          Notification Settings
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>

      {/* Settings iTems */}
      <View style={styles.itemsContainer}>
        <Pressable

          style={styles.item}
        >
          <View style={{gap:10}}>
             <Text style={styles.itemText}>Transaction Alerts</Text>
          <Text style={styles.itemDes}>Receive alerts for every transaction.</Text>
          </View>
          <View style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={()=>setIsEnabledTransAlert(!isEnabledTransAlert)}
                  value={isEnabledTransAlert}
                />
              </View>

        </Pressable>
        <Pressable

          style={styles.item}
        >
          <View style={{gap:10}}>
             <Text style={styles.itemText}>Promotions and Offers</Text>
          <Text style={styles.itemDes}>Enjoy exclusive deals with timely notifications.</Text>
          </View>
          <View style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }], }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={()=>setIsEnabledOffersAlert(!isEnabledOffersAlert)}
                  value={isEnabledOffersAlert}
                />
              </View>

        </Pressable>
        <Pressable

          style={styles.item}
        >
          <View style={{gap:10}}>
             <Text style={styles.itemText}>App Updates</Text>
          <Text style={styles.itemDes}>Stay current with the latest app features.</Text>
          </View>
          <View style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }],}}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={()=>setIsEnabledAppAlert(!isEnableAppAlert)}
                  value={isEnableAppAlert}
                />
              </View>

        </Pressable>
        <Pressable

          style={styles.item}
        >
          <View style={{gap:10}}>
             <Text style={styles.itemText}>News and Updates</Text>
          <Text style={styles.itemDes}>Stay connected with relevant KOLeT news.</Text>
          </View>
          <View style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }], }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={()=>setIsEnabledNewsAlert(!isEnabledNewsAlert)}
                  value={isEnabledNewsAlert}
                />
              </View>

        </Pressable>
        </View>

    </View>
  )
}

export default NotificationSettings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
  itemsContainer: {
    width: "100%",
    marginTop: hp(5),
    gap:10,
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    //flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: Colors.main.border
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  itemDes: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
})
