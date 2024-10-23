import ArrowLefRightIC from '@/assets/images/svg/ArrowLefRightIC';
import HomeIC from '@/assets/images/svg/HomeIC';
import MenuIc from '@/assets/images/svg/MenuIC';
import UserTabIc from '@/assets/images/svg/UserTabIc';
import CustomHeader from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
import { hp } from '@/helpers/common';
import { Tabs,  } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: styles.container,
        tabBarActiveTintColor: Colors.main.primary,
        tabBarInactiveTintColor: Colors.main.text,
      }}>
      <Tabs.Screen
        name="(top-tabs)"
        options={{
          title: 'Home',
          headerShown: true,
          header: ({ navigation, route, options,  }) => {
            //
          
            return (
              <CustomHeader
                
              />
            );
          },
          tabBarIcon: ({ color, focused }) => (
            <HomeIC stroke={color}  width={25} height={25} />
          ),
          tabBarLabel:  ({ color }) => (
            // <UserTabIc width={25} height={25} />
            <Text style={[styles.title, {color: color}]}> Home</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <ArrowLefRightIC stroke={color}  width={25} height={25} />
          ),
          tabBarLabel:  ({ color }) => (
            // <UserTabIc width={25} height={25} />
            <Text style={[styles.title, {color: color}]}> Transactions</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color,  }) => (
            <MenuIc stroke={color} width={25} height={25} />
          ),
          tabBarLabel:  ({ color }) => (
            // <UserTabIc width={25} height={25} />
            <Text style={[styles.title, {color: color}]}> More</Text>
          ),
        }}
      />
         <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <UserTabIc stroke={color}  width={25} height={25} />
          ),
          tabBarLabel:  ({ color }) => (
            // <UserIC width={25} height={25} />
            <Text style={[styles.title, {color: color}]}> Profile</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
    container: {
          flexDirection: 'row',
          height: hp(10),
          paddingHorizontal: 5,
          paddingVertical: 12,
          backgroundColor: Colors.main.tab,
          borderTopStartRadius: 60,
          borderTopEndRadius: 60,
          justifyContent: 'space-between',
    },
    title: {
        fontSize: 10,
        // letterSpacing: 0.1,
        fontWeight: "600",
        fontFamily: "Raleway-SemiBold",
    }
})