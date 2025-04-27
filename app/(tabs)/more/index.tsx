import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SmartCardIC from '@/assets/images/svg/SmartCardIC';
import Notofication from '@/assets/images/svg/NtoficationIC';
import SettingsIC from '@/assets/images/svg/SettingsIC';
import HaedsetIc from '@/assets/images/svg/HaedsetIc';
import UserSwitchIC from '@/assets/images/svg/UserSwitch';
import LogoutIc from '@/assets/images/svg/LogoutIc';
import StarIc from '@/assets/images/svg/StarIc';
import { router, useNavigation } from 'expo-router';
import Modal from 'react-native-modal';
import { hp } from '@/helpers/common';
import CustomTextInput from '@/components/CustomTextInput';
import { FadeInDown } from 'react-native-reanimated';
import { UserContext } from '@/contexts/UserContext';
import { useTransaction } from '@/contexts/TransactionContext';

const More = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [ratemodalVisible, setRateModalVisible] = useState<boolean>(false);
  const [logoutmodalVisible, setLogoutModalVisible] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState(0);
  const { resetUser } = useContext(UserContext);
  const { clearTransaction } = useTransaction();
  const navigation = useNavigation();

  // Simple logout handler
  const handleLogout = () => {
    // Reset user data
    resetUser();

    // Clear transaction data
    clearTransaction();

    // Close modal
    setLogoutModalVisible(false);

    // Clear all previous routes
    router.dismissAll();

    // Navigate to login screen while clearing all previous routes
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'auth/login' }],
    });
  };

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* rate us */}
      <Modal
        animationIn={'fadeInUp'}
        animationOut={'fadeOut'}
        backdropOpacity={0.2}
        isVisible={ratemodalVisible}
        style={styles.centeredView}
        onBackdropPress={() => {
          // Alert.alert('Modal has been closed.');
          setRateModalVisible(!ratemodalVisible);
        }}
        onBackButtonPress={() => {
          // Alert.alert('Modal has been closed.');
          setRateModalVisible(!ratemodalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextTitle}>Rate Us!</Text>
          <Text style={styles.modalTextDes}>
            How would you love to rate this app!
          </Text>
          <CustomTextInput
            value={comment}
            onChange={setComment}
            maxLength={1000}
            height={hp(10)}
            multiline={true}
            placeholder='Leave a comment'
            animate={FadeInDown.springify()}
          />
          <View style={{ flexDirection: 'row', gap: 10, marginVertical: 15 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <StarIc
                  width={30}
                  height={30}
                  stroke={star <= rating ? '#F39C12' : '#D9D9D9'} // Gold color if selected
                  fill={star <= rating ? '#F39C12' : '#D9D9D9'} // Gold color if selected
                />
              </TouchableOpacity>
            ))}
          </View>
          <Pressable
            style={styles.button}
            onPress={() => setRateModalVisible(!ratemodalVisible)}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </Modal>

      {/* logout */}
      <Modal
        animationIn={'bounceIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.2}
        isVisible={logoutmodalVisible}
        style={styles.centeredView}
        onBackdropPress={() => setLogoutModalVisible(false)}
        onBackButtonPress={() => setLogoutModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTextDes}>
            Are you sure you want to logout?
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: Colors.main.error }]}
            onPress={handleLogout}>
            <Text style={styles.textStyle}>Yes</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: 'transparent',
                borderWidth: 0.7,
                borderColor: Colors.main.primary,
              },
            ]}
            onPress={() => setLogoutModalVisible(false)}>
            <Text style={[styles.textStyle, { color: Colors.main.text }]}>
              No
            </Text>
          </Pressable>
        </View>
      </Modal>
      <View
        style={{
          width: '100%',
          flex: 0.15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            fontFamily: 'Montserrat-Regular',
            color: Colors.main.primary,
            flex: 1,
            textAlign: 'center',
          }}>
          More
        </Text>
      </View>
      {/* More iTems */}
      <View style={styles.itemsContainer}>
        <Pressable
          onPress={() => router.navigate('/(tabs)/more/accountManagement')}
          style={styles.item}>
          <SmartCardIC stroke={Colors.main.text} width={20} height={20} />
          <Text style={styles.itemText}>Account Management</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate('/(tabs)/more/notificationSettings')}
          style={styles.item}>
          <Notofication width={20} height={20} />
          <Text style={styles.itemText}>Notifications</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate('/(tabs)/more/settings')}
          style={styles.item}>
          <SettingsIC width={20} height={20} />
          <Text style={styles.itemText}>Settings</Text>
        </Pressable>
        <Pressable
          onPress={() => router.navigate('/(tabs)/more/helpCenter')}
          style={styles.item}>
          <HaedsetIc width={20} height={20} />
          <Text style={styles.itemText}>Help Center</Text>
        </Pressable>
        <Pressable
          onPress={() => router.replace('/(tabs)/more/refer')}
          style={styles.item}>
          <UserSwitchIC width={20} height={20} />
          <Text style={styles.itemText}>Refer a friend</Text>
        </Pressable>
        <Pressable
          onPress={() => setRateModalVisible(!ratemodalVisible)}
          style={styles.item}>
          <StarIc width={20} height={20} />
          <Text style={styles.itemText}>Rate the App</Text>
        </Pressable>
        <Pressable
          onPress={() => setLogoutModalVisible(!logoutmodalVisible)}
          style={styles.item}>
          <LogoutIc width={20} height={20} />
          <Text style={styles.itemText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    gap: 5,
  },
  itemsContainer: {
    flex: 0.65,
    width: '100%',
    //backgroundColor: Colors.main.error,
    // gap: hp(1),
  },
  item: {
    flex: 1,
    width: '100%',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.7,
    borderColor: Colors.main.border,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    color: Colors.main.text,
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
    paddingVertical: 40,
    paddingHorizontal: 20,
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
    backgroundColor: Colors.main.primary,
  },
  textStyle: {
    color: 'white',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  modalTextTitle: {
    marginBottom: 15,
    fontFamily: 'Monserrat-Regular',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    color: Colors.main.text,
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
