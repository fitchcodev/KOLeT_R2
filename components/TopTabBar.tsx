import { Colors } from "@/constants/Colors";
import { hp } from "@/helpers/common";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";

function TopTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const borderRadius = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 5 : 0)),
          });
          const backgroundColor = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) =>
              i === index ? Colors.main.background : "#3498DB1A"
            ),
          });
          const borderColor = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) =>
              i === index ? Colors.main.border : "transparent"
            ),
          });
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              key={index}
              onLongPress={onLongPress}
              style={[
                styles.button,
                {
                  borderRadius,
                  backgroundColor,
                  borderWidth: 0.7,
                  borderColor,
                },
              ]}
            >
              <Animated.Text style={styles.buttonText}>{label}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default TopTabBar;

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.main.background,
    paddingHorizontal: 25
  },
  innerContainer: {
    height: hp(5.5),
    flexDirection: "row",
    borderRadius: 5,
    borderCurve: "continuous",
    backgroundColor: "#3498DB1A",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    //paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.main.text,
    fontWeight: "400",
    fontFamily: "Raleway-Regular",
  },
});
