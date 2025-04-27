import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { hp, wp } from "@/helpers/common";
//import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
//import { useFonts, Montserrat_300Light} from "@expo-google-fonts/dev";
// export interface OnboardingData {
//   id: number;
//   image: React.JSX.Element;
//   title: string;
//   subTitle: string;
// }
//image: require("@/assets/images/image1.png"),

const slides = [
  {
    id: "1",
    title: <Text>Welcome to <Text style={{color: Colors.main.primary}}>KOLeT!</Text> </Text>,
    description: "Tap. Pay. Enjoy Your \nseamless journey begins.",
    image: require("@/assets/images/image1.png"),
  },
  {
    id: "2",
    title: <Text>Discover <Text style={{color: Colors.main.primary}}>KOLeT's </Text> Capabilities</Text>,
    description:
      "Explore the features that make \nKOLeT your go-to payment solution.",
    image: require("@/assets/images/image2.png"),
  },
  {
    id: "3",
    title: "Swift and Efficient Payments",
    description:
      "Experience the speed of KOLeT for \nquick and hassle-free payments.",
    image: require("@/assets/images/image4.png"),
  },
  {
    id: "4",
    title: "Your Security Matters",
    description: "KOLeT ensures your transactions \nare secure and worry-free.",
    image: require("@/assets/images/image3.png"),
  },
];

const index = () => {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { width } = Dimensions.get("window");
  const router = useRouter();
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      // Move to the next slide
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      // Restart from the first slide
      flatListRef.current.scrollToIndex({ index: 0 });
      setCurrentIndex(0);
    }
  };


  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };
  useEffect(() => {
    // Set interval to auto-scroll every 1.5 seconds
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    // Clear interval when the component unmounts or when slides are done
    return () => clearInterval(interval);
  }, [currentIndex]);


  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"}/>
      {/* <Text>index</Text> */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.blurView}>
        <View style={styles.textsCon}>
          <Text style={[styles.title]}>{slides[currentIndex]?.title}</Text>
          <Text style={styles.description}>
            {slides[currentIndex].description}
          </Text>
        </View>

        {renderDots()}

        <View style={styles.buttonsCon}>
          <TouchableOpacity onPress={()=> router.navigate("/auth/register")} style={styles.button}>
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTwo} onPress={()=> router.navigate('/auth/login')}>
            <Text style={styles.buttonTwoText}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <LinearGradient
  colors={['#f5f5f6', 'transparent']}
  // end={{ x: 0.8, y: 3.0 }}
  //start={{ x: 0.5, y: 1.0 }}
  style={{
    position: 'absolute',
    width: width,
    height: hp(55),
    opacity: 0.2,
    bottom: 0, // Apply it at the top of the screen
    //borderTopLeftRadius: 30,  // Optional: If you want rounded corners
    //borderTopRightRadius: 30, // Optional: If you want rounded corners
  }}
/> */}
<View  style={{
    position: 'absolute',
    top: hp(28), // Apply it at the top of the screen

  }}
>
  <Image  source={require('@/assets/images/blur.png')}/>
</View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
  },
  slide: {
    width: wp(100),
    height: hp(50),
    justifyContent: "flex-start",
  },
  image: {
    width: wp(100),
    height: "100%",
    resizeMode: "cover",
  },
  blurView: {
    //flex: 1,
    height: hp(50),
    //position: 'absolute',
    width: wp(100),

    backgroundColor: Colors.main.background,
    alignItems: "center",
    paddingHorizontal: 30,
    gap: hp(5),
    borderRadius: 30,
    zIndex: 1,
  },
  title: {
    fontSize: hp(3.5),
    color: Colors.main.text,
    fontWeight: "600",
    fontFamily: "Raleway-SemiBold",
    textAlign: "center",
  },
  description: {
    fontSize: hp(1.6),
    fontFamily: 'Montserrat-Regular',
    textAlign: "center",
    color: Colors.main.description,
    lineHeight: 22,
    letterSpacing: 2,
  },
  textsCon: {
    width: "100%",
    //backgroundColor: 'blue',
    alignItems: "center",
    gap: 10,
  },
  buttonsCon: {
    width: "100%",
    paddingHorizontal: 40,
    gap:10
    //backgroundColor: 'yellow',
  },
  button: {
    backgroundColor: Colors.main.primary,
    fontFamily: "Raleway-Regular",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonTwo: {
    backgroundColor: 'transparent',

    borderWidth: 2,
    borderColor: Colors.main.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Raleway-Semibold",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonTwoText: {
    color: "black",
    fontSize: 18,
    fontFamily: "Raleway-SemiBold",
    fontWeight: "600",
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    //backgroundColor:'red',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.main.primary,
  },
  inactiveDot: {
    backgroundColor: 'white',
  },
});
