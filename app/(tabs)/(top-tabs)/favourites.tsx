import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const Favourites = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📲 Add & Find 🔎 Your Favourite Services Here</Text>
    </View>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingHorizontal: 35,
    paddingVertical: 25,
    gap: 25,
  },
  title: {
    color: Colors.main.description,
    fontSize: 20,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
  }
})