import ArrowLefRightIC from '@/assets/images/svg/ArrowLefRightIC';
import HomeIC from '@/assets/images/svg/HomeIC';
import MenuIc from '@/assets/images/svg/MenuIC';
import UserTabIc from '@/assets/images/svg/UserTabIc';
import CustomHeader from '@/components/CustomHeader';
import { Colors } from '@/constants/Colors';
import { NotificationModalContext } from '@/contexts/NotificationModalContext';
import { TransactionProvider } from '@/contexts/TransactionContext';
import { hp } from '@/helpers/common';
import { Stack, Tabs } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
export default function TabLayout() {
  const [isModalActive, setModalIsActive] = useState<boolean>(false);
  return (
    <NotificationModalContext.Provider
      value={{ isModalActive, setModalIsActive }}>
      <TransactionProvider>
        <Tabs
          screenOptions={{
            // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarStyle: styles.container,
            tabBarActiveTintColor: Colors.main.primary,
            tabBarInactiveTintColor: Colors.main.text,
            unmountOnBlur: true,
            //tabBarHideOnKeyboard: true,
          }}>
          <Tabs.Screen
            name="(top-tabs)"
            initialParams={{
              isModalActive,
            }}
            options={{
              title: 'Home',
              headerShown: true,
              unmountOnBlur: true,
              header: ({ navigation, route, options }) => {
                //
                const { setModalIsActive, isModalActive } = useContext(
                  NotificationModalContext
                );

                return (
                  <CustomHeader
                    setModalIsActive={setModalIsActive}
                    isModalActive={isModalActive}
                  />
                );
              },
              tabBarIcon: ({ color, focused }) => (
                <HomeIC stroke={color} width={25} height={25} />
              ),
              tabBarLabel: ({ color }) => (
                // <UserTabIc width={25} height={25} />
                <Text style={[styles.title, { color: color }]}> Home</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="transactions"
            options={{
              title: 'Transactions',
              tabBarIcon: ({ color, focused }) => (
                <ArrowLefRightIC stroke={color} width={25} height={25} />
              ),
              tabBarLabel: ({ color }) => (
                // <UserTabIc width={25} height={25} />
                <Text style={[styles.title, { color: color }]}>
                  {' '}
                  Transactions
                </Text>
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, focused }) => (
                <UserTabIc stroke={color} width={25} height={25} />
              ),
              tabBarLabel: ({ color }) => (
                // <UserIC width={25} height={25} />
                <Text style={[styles.title, { color: color }]}> Profile</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="more/index"
            options={{
              title: 'More',
              tabBarIcon: ({ color }) => (
                <MenuIc stroke={color} width={25} height={25} />
              ),
              tabBarLabel: ({ color }) => (
                // <UserTabIc width={25} height={25} />
                <Text style={[styles.title, { color: color }]}> More</Text>
              ),
            }}
          />
          <Tabs.Screen
            name="more/settings/index"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />
          <Tabs.Screen
            name="more/settings/changePassword"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/cardManagement/index"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />
          <Tabs.Screen
            name="more/cardManagement/addCardForm"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/cardManagement/cardDetails"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/cardManagement/setDefaultCard"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/cardManagement/privacySettings"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />

          <Tabs.Screen
            name="more/accountManagement/index"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />
          <Tabs.Screen
            name="more/accountManagement/addAccountForm"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/accountManagement/accountDetails"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/accountManagement/setDefaultAccount"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/accountManagement/privacySettings"
            options={{
              href: null,
              //unmountOnBlur:true
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="more/notificationSettings"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />
          <Tabs.Screen
            name="more/helpCenter"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />
          <Tabs.Screen
            name="more/refer"
            options={{
              href: null,
              //unmountOnBlur:true
            }}
          />

          <Tabs.Screen
            name="nfcPayment/index"
            options={{
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="nfcPayment/paymentVerification"
            options={{
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="nfcPayment/verifyOTP"
            options={{
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="receipt"
            options={{
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />

          <Tabs.Screen
            name="payment/index"
            options={{
              href: null,
              unmountOnBlur: false,
              tabBarStyle: { display: 'none' },
            }}
          />
          <Tabs.Screen
            name="payment/cardDetailsForm"
            options={{
              href: null,
              tabBarStyle: { display: 'none' },
            }}
          />
        </Tabs>
      </TransactionProvider>
    </NotificationModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    height: hp(10),
    paddingHorizontal: 5,
    paddingVertical: 12,
    backgroundColor:
      Platform.OS === 'android' ? 'rgba(225,225,225,1)' : Colors.main.tab,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 10,
    // letterSpacing: 0.1,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
  },
});
