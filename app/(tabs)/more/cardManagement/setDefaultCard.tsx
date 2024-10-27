import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import WifiSvgIC from "@/assets/images/svg/WifiSvg";
import SimCardIC from "@/assets/images/svg/SimCardIC";
import MasterIC from "@/assets/images/svg/MasterIC";
import { hp } from "@/helpers/common";

const SetDefaultCard = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const data=[
    {
        id: 0,
        color: ["rgba(52, 152, 219, 0.4)", "rgba(215,159,131,0.10)"],
        cardNumber: '4111 1971 1441 1231',
        cardName:'John Van Doe'

    },
    {
        id: 1,
        color: ["rgba(46, 204, 113, 0.40)", "rgba(6, 204, 113,0.10)"],
        cardNumber: '5111  1971  1441  1431',
        cardName:'John Van Doe'

    },
    {
        id: 2,
        color: ["rgba(250, 25, 240, 0.4)", "rgba(250, 25, 240,0.10)"],
        cardNumber: '4566 1871 3498 1450',
        cardName:'John Van Doe'

    },
    {
        id: 3,
        color: ["rgba(52, 152, 219, 0.4)", "rgba(215,159,131,0.10)"],
        cardNumber: '3441 1451 1409 2341',
        cardName:'John Van Doe'

    },
    {
        id: 4,
        color: ["rgba(254, 242, 29, 0.4)", "rgba(2, 2402, 29,0.10)"],
        cardNumber: '4452 1971 1421 3231',
        cardName:'John Van Doe'

    },
    
]
interface ItemProps{
    data:{
          id: number;
    color: string[];
    cardNumber: string;
    cardName: string;
    }
  
}
const Item =({data}: ItemProps)=>{
  const [isSelected, setIsSelcted]= useState(false);

    return(
        <View style={styles.itemsCon}>
        <LinearGradient
          colors={data.color}
          style={styles.card}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardTopText}>debit</Text>
            <WifiSvgIC width={40} height={40} />
          </View>
          <View style={{ gap: 2 }}>
            <SimCardIC width={40} height={40} />
            <Text style={styles.cardNumber}>{data.cardNumber}</Text>
          </View>
          <View
            style={[styles.cardTop, { paddingTop: 10, alignItems: "center" }]}
          >
            <Text>{data.cardName}</Text>
            <MasterIC fill={"none"} width={40} height={40} />
          </View>
        </LinearGradient>
        <Pressable style={styles.itemsConPressable} onPress={()=> setIsSelcted(!isSelected)}>
             <View style={{width:15,height:15, borderWidth: isSelected? 1.5: .7, borderRadius: 100, borderColor:isSelected? Colors.main.success: Colors.main.border, backgroundColor: isSelected? Colors.main.primary :'transparent'}}></View>
        <Text style={styles.itemsConText}>Set as default card</Text> 
        </Pressable>
      
        </View>
    )
};

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
            Set Default Card
          </Text>
          <View style={{ flex: 1 }}></View>
        </View>

      <View style={styles.mainContainer}>
        <FlatList data={data}  renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item.id} showsVerticalScrollIndicator={false}/>
 
      </View>
    </View>
  );
};

export default SetDefaultCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    justifyContent: "flex-start",
    padding:20,
  },
  mainContainer: {
    // backgroundColor:'red',
    
    flex: 1,
    padding: 20,
  },
itemsCon:{
    //backgroundColor: 'red',
    gap:25,
    marginBottom:25,
},
itemsConPressable:{
    flexDirection: 'row',
    gap: 10,
},
itemsConText:{
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
   // backgroundColor:'red'
},
card: {
    // flex:1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTopText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
    textAlign: "center",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  detailsContainer: {
    flex: 1,
    marginTop: hp(4.5),
    justifyContent: "center",
    gap: hp(3),
  },
  detailsItem: {
    //flex:1,
    backgroundColor: "white",
    borderColor: Colors.main.primary,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.2,
    borderRadius: 4,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: hp(2),
  },
  detailsItemText: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
});
