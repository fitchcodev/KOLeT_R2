import { Pressable, ScrollView, Settings, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowRightIC from "@/assets/images/svg/ArrowRight";
import ArrowDownIC from "@/assets/images/svg/ArrowDownIC";
import LockKeyIc from "@/assets/images/svg/LockKeyIc";
import { hp } from "@/helpers/common";

const SettingsScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropManagePassword, setDropManagePassword] = useState(false);

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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            fontFamily: "Montserrat-Regular",
            color: Colors.main.primary,
            flex: 1,
            textAlign: "center",
          }}
        >
          Settings
        </Text>
      </View>
      {/* Settings iTems */}
      <ScrollView contentContainerStyle={styles.itemsContainer}>
        <Pressable onPress={()=>setDropManagePassword(!dropManagePassword)} style={styles.item}>
          <Text style={styles.itemText}>Manage Password</Text>
          {dropManagePassword ? (
             <ArrowRightIC width={20} height={20}/>
          ):(
            <ArrowDownIC width={20} height={20}/>
          )}
         
          
        </Pressable>
        {!dropManagePassword &&(
             <View style={styles.itemDropView}>
            <Pressable  style={styles.itemDropViewItem}>
                <LockKeyIc width={20} height={20}/>
                 <Text style={styles.itemDropViewItemText}>Change Password</Text>
            </Pressable>
           
        </View>
        )}
    
         <Pressable onPress={()=>setDropManagePassword(!dropManagePassword)} style={styles.item}>
          <Text style={styles.itemText}>Manage Bank Account</Text>
          {dropManagePassword ? (
             <ArrowRightIC width={20} height={20}/>
          ):(
            <ArrowDownIC width={20} height={20}/>
          )}
         
          
        </Pressable>
        {!dropManagePassword &&(
             <View style={styles.itemDropView}>
                <Text style={[styles.itemText,{fontSize:12, }]}>Set default</Text>
            <Pressable  style={styles.itemDropViewItem}>
                <LockKeyIc width={20} height={20}/>
                 <Text style={styles.itemDropViewItemText}>Add Account</Text>
            </Pressable>
            <Pressable  style={styles.itemDropViewItem}>
                <LockKeyIc width={20} height={20}/>
                 <Text style={styles.itemDropViewItemText}>Delete Account</Text>
            </Pressable>
           
        </View>
        )}
         <Pressable onPress={()=>setDropManagePassword(!dropManagePassword)} style={styles.item}>
          <Text style={styles.itemText}>Manage Payment </Text>
          {dropManagePassword ? (
             <ArrowRightIC width={20} height={20}/>
          ):(
            <ArrowDownIC width={20} height={20}/>
          )}
         
          
        </Pressable>
      
{!dropManagePassword && (
  <View style={styles.itemDropView}>
    <Text style={[styles.itemText, { fontSize: 12 }]}>Set default</Text>

    <Pressable
      onPress={() => setSelectedOption(selectedOption == "Tap Card"? null : "Tap Card")}
      style={styles.itemDropViewItem}
    >
      <View
        style={{
          width: 12,
          height: 12,
          borderWidth: selectedOption === "Tap Card" ? 1.5 : 0.7,
          borderRadius: 100,
          borderColor:
            selectedOption === "Tap Card" ? Colors.main.inputBg : Colors.main.border,
          backgroundColor:
            selectedOption === "Tap Card" ? Colors.main.primary : "white",
        }}
      />
      <Text style={styles.itemDropViewItemText}>Tap Card</Text>
    </Pressable>

    <Pressable
      onPress={() => setSelectedOption(selectedOption == "Card Details"? null: "Card Details")}
      style={styles.itemDropViewItem}
    >
      <View
        style={{
          width: 12,
          height: 12,
          borderWidth: selectedOption === "Card Details" ? 1.5 : 0.7,
          borderRadius: 100,
          borderColor:
            selectedOption === "Card Details" ? Colors.main.inputBg : Colors.main.border,
          backgroundColor:
            selectedOption === "Card Details" ? Colors.main.primary : "white",
        }}
      />
      <Text style={styles.itemDropViewItemText}>Card Details</Text>
    </Pressable>
  </View>
)}
       
        
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

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
    marginTop: hp(5)
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    flex: 1,
    width: "100%",
    justifyContent:"space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: Colors.main.border,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  itemDropView:{
    flex:1,
    padding:20, 
    gap:hp(2.5),
   //backgroundColor: 'red'
  },
  itemDropViewItem:{
    flex:1,
    flexDirection: 'row',
    gap:5,
    alignItems:'center'
  },
  itemDropViewItemText:{
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
   
  }
});