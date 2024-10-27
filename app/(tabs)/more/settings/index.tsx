import {
  Pressable,
  ScrollView,
  Settings,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowRightIC from "@/assets/images/svg/ArrowRight";
import ArrowDownIC from "@/assets/images/svg/ArrowDownIC";
import LockKeyIc from "@/assets/images/svg/LockKeyIc";
import { hp } from "@/helpers/common";
import Modal from "react-native-modal";
import ArrowLftIC from "@/assets/images/svg/ArrowLftIC";
import { router } from "expo-router";
import AddCircleIC from "@/assets/images/svg/AddCircleIC";
import DeleteBinIC from "@/assets/images/svg/DeleteBinIC";

const SettingsScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropManagePassword, setDropManagePassword] = useState(true);
  const [dropManageBank, setDropManageBank] = useState(true);
  const [dropManagePayment, setDropManagePayment] = useState(true);
  const [dropEnable, setDropEnable] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
        
        <Modal
       animationIn={"bounceIn"}
       animationOut={"fadeOut"}

        backdropOpacity={0.2}
        isVisible={modalVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <Text style={styles.modalTextDes}>Disabling your account means {"\n"}losing access to all your payment{'\n'} history and preferences. Are you sure you want to proceed?</Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.button, {backgroundColor:'transparent', borderWidth:.7, borderColor: Colors.main.primary}]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={[styles.textStyle, {color:Colors.main.text}]}>No</Text>
            </Pressable>
          </View>
        </Modal>
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
            flex: 1,
            textAlign:'center',

          }}
        >
          Settings
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {/* Settings iTems */}
      <ScrollView showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.itemsContainer}>
        <Pressable
          onPress={() => setDropManagePassword(!dropManagePassword)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Manage Password</Text>
          {dropManagePassword ? (
            <ArrowRightIC width={20} height={20} />
          ) : (
            <ArrowDownIC width={20} height={20} />
          )}
        </Pressable>
        {!dropManagePassword && (
          <View style={styles.itemDropView}>
            <Pressable onPress={()=> router.push('/(tabs)/more/settings/changePassword')} style={styles.itemDropViewItem}>
              <LockKeyIc width={20} height={20} />
              <Text style={styles.itemDropViewItemText}>Change Password</Text>
            </Pressable>
          </View>
        )}

        <Pressable
          onPress={() => setDropManageBank(!dropManageBank)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Manage Bank Account</Text>
          {dropManagePassword ? (
            <ArrowRightIC width={20} height={20} />
          ) : (
            <ArrowDownIC width={20} height={20} />
          )}
        </Pressable>
        {!dropManageBank && (
          <View style={styles.itemDropView}>
            <Text style={[styles.itemText, { fontSize: 12 }]}>Set default</Text>
            <Pressable style={styles.itemDropViewItem}>
              <AddCircleIC width={20} height={20} />
              <Text style={styles.itemDropViewItemText}>Add Account</Text>
            </Pressable>
            <Pressable style={styles.itemDropViewItem}>
              <DeleteBinIC width={20} height={20} />
              <Text style={styles.itemDropViewItemText}>Delete Account</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          onPress={() => setDropManagePayment(!dropManagePayment)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Manage Payment </Text>
          {dropManagePayment ? (
            <ArrowRightIC width={20} height={20} />
          ) : (
            <ArrowDownIC width={20} height={20} />
          )}
        </Pressable>

        {!dropManagePayment && (
          <View style={styles.itemDropView}>
            <Text style={[styles.itemText, { fontSize: 12 }]}>Set default</Text>

            <Pressable
              onPress={() =>
                setSelectedOption(
                  selectedOption == "Tap Card" ? null : "Tap Card"
                )
              }
              style={styles.itemDropViewItem}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderWidth: selectedOption === "Tap Card" ? 1.5 : 0.7,
                  borderRadius: 100,
                  borderColor:
                    selectedOption === "Tap Card"
                      ? Colors.main.inputBg
                      : Colors.main.border,
                  backgroundColor:
                    selectedOption === "Tap Card"
                      ? Colors.main.primary
                      : "white",
                }}
              />
              <Text style={styles.itemDropViewItemText}>Tap Card</Text>
            </Pressable>

            <Pressable
              onPress={() =>
                setSelectedOption(
                  selectedOption == "Card Details" ? null : "Card Details"
                )
              }
              style={styles.itemDropViewItem}
            >
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderWidth: selectedOption === "Card Details" ? 1.5 : 0.7,
                  borderRadius: 100,
                  borderColor:
                    selectedOption === "Card Details"
                      ? Colors.main.inputBg
                      : Colors.main.border,
                  backgroundColor:
                    selectedOption === "Card Details"
                      ? Colors.main.primary
                      : "white",
                }}
              />
              <Text style={styles.itemDropViewItemText}>Card Details</Text>
            </Pressable>
          </View>
        )}
        <Pressable
          onPress={() => setDropEnable(!dropEnable)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Enable Face ID</Text>
          {dropManagePassword ? (
            <ArrowRightIC width={20} height={20} />
          ) : (
            <ArrowDownIC width={20} height={20} />
          )}
        </Pressable>
        {!dropEnable && (
          <View style={styles.itemDropView}>
            <Pressable style={styles.itemDropViewItem}>
              <View style={{ transform: [{ scaleX: 0.5 }, { scaleY: 0.5 }], marginLeft:-20 }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <Text style={styles.itemDropViewItemText}>Enable Face ID</Text>
            </Pressable>
          </View>
        )}
         <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.item}
        >
          <Text style={styles.itemText}>Disable Account</Text>
            <ArrowRightIC width={20} height={20} />
          
        </Pressable>
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
    marginTop: hp(5),
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
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
  itemDropView: {
    flex: 1,
    padding: 20,
    gap: hp(2.5),
    //backgroundColor: 'red'
  },
  itemDropViewItem: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  itemDropViewItemText: {
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // marginTop: 22,
    //backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.main.background,
    borderRadius: 20,
    paddingVertical:40,
    paddingHorizontal:20,
    gap: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 10,
    elevation: 2,
    backgroundColor: Colors.main.error,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  modalTextDes: {
    marginBottom: 15,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    //backgroundColor: 'red',
    lineHeight: hp(3),
    fontSize: 15,
    color: Colors.main.text,
  },
});
