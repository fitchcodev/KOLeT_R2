import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
  } from "@react-navigation/material-top-tabs";
import { useLocalSearchParams, withLayoutContext, } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import TopTabBar from '@/components/TopTabBar';
import { Colors } from '@/constants/Colors';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const TabLayout = () => {
  return (
    <MaterialTopTabs
    tabBar={props => <TopTabBar {...props} />}
    style={{ backgroundColor: Colors.main.background}}
    >
    <MaterialTopTabs.Screen
      name="index"
      options={{ title: "Keypad" }}
    />
     <MaterialTopTabs.Screen
      name="services"
      options={{ title: "Services" }}
    />
      <MaterialTopTabs.Screen
      name="favourites"
      options={{ title: "Favourites" }}
    />
  </MaterialTopTabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})