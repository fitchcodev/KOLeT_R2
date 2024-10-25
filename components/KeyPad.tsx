import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@/constants/Colors'
interface KeyPadInputType {
    handleNumberPress:  (
        number: number
    )=>void,
    handleClearPress:()=>void,
    handleDelPress:()=>void,

}
const KeyPadInput: FC<KeyPadInputType> = ({handleNumberPress,handleDelPress,handleClearPress}) => {
  return (
    <View style={styles.calculator}>
            {/* rgba(46, 204, 113, 0.15) */}
            <View style={styles.calculatorItemCon}>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={() => handleNumberPress(1)}
              >
                <Text style={styles.calculatorItemText}>1</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={() => handleNumberPress(2)}
              >
                <Text style={styles.calculatorItemText}>2</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderRightColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(3)}
              >
                <Text style={styles.calculatorItemText}>3</Text>
              </Pressable>
            </View>

            <View style={styles.calculatorItemCon}>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(4)}

              >
                <Text style={styles.calculatorItemText}>4</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(5)}

              >
                <Text style={styles.calculatorItemText}>5</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderRightColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=> handleNumberPress(6)}
              >
                <Text style={styles.calculatorItemText}>6</Text>
              </Pressable>
            </View>

            <View style={styles.calculatorItemCon}>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(7)}

              >
                <Text style={styles.calculatorItemText}>7</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(8)}

              >
                <Text style={styles.calculatorItemText}>8</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderRightColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=> handleNumberPress(9)}
              >
                <Text style={styles.calculatorItemText}>9</Text>
              </Pressable>
            </View>


            <View style={styles.calculatorItemCon}>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderBottomColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={handleClearPress}
              >
                <Text style={styles.calculatorItemText}>C</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderBottomColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(46, 204, 113, 0.15)"
                      : "transparent",
                  },
                ]}
                onPress={()=>handleNumberPress(0)}
              >
                <Text style={styles.calculatorItemText}>0</Text>
              </Pressable>
              <Pressable
              onPress={handleDelPress}
                style={({ pressed }) => [
                  styles.calculatorItem,
                  {
                    borderColor: "transparent",
                    backgroundColor: pressed
                      ? "rgba(231, 76, 60, 0.15)"
                      : "transparent",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.calculatorItemText,
                    { color: Colors.main.error },
                  ]}
                >
                  del
                </Text>
              </Pressable>
            </View>
          </View>
  )
}

export default KeyPadInput

const styles = StyleSheet.create({
    calculator: {
        flex: 1,
        flexDirection: "column",
        //flexWrap:'wrap',
        //backgroundColor: 'red'
        borderWidth: 0.7,
        borderColor: Colors.main.border,
        borderRadius: 10,
      },
      calculatorItemCon: {
        flex: 1,
        //backgroundColor: 'blue',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      calculatorItem: {
        flex: 1,
        // backgroundColor: 'red',
        borderRightWidth: 0.7,
        borderBottomWidth: 0.7,
        borderColor: Colors.main.border,
        fontFamily: "Monserrat-SemiBold",
        fontSize: 20,
        alignSelf: "stretch", // Makes the item take the full height of its container
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers content horizontally
      },
      calculatorItemText: {
        fontFamily: "Monserrat-SemiBold",
        fontSize: 25,
      },
})