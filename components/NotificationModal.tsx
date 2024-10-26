import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext } from 'react'
import { NotificationModalContext } from '@/contexts/NotificationModalContext';
import { BlurView } from 'expo-blur';
import ArrowRightIC from '@/assets/images/svg/ArrowRight';
import { Colors } from '@/constants/Colors';

const data = [
  {
    id: 0,
    amount: "1000",
    status: "Canceled",
  },
  {
    id: 1,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 2,
    amount: "1000",
    status: "Canceled",
  },
  {
    id: 3,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 4,
    amount: "1000",
    status: "Recieved",
  },
  {
    id: 5,
    amount: "1000",
    status: "Recieved",
  },
  {
    id: 6,
    amount: "1000",
    status: "Canceled",
  },
  {
    id: 7,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 8,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 9,
    amount: "1000",
    status: "Canceled",
  },
  {
    id: 10,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 11,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 12,
    amount: "1000",
    status: "Sent",
  },
  {
    id: 13,
    amount: "1000",
    status: "Canceled",
  },
  {
    id: 14,
    amount: "1000",
    status: "Canceled",
  },
];
type ItemProps = {
  data: {
    id: number;
    amount: string;
    status: string;
  };
};

const Item: React.FC<ItemProps> = ({ data }) => (
  <Pressable style={styles.transactionItem}>
    <Text style={styles.modalAmount}>₦{data.amount}</Text>
    <Text style={styles.modalStaus}>{data.status}</Text>
    <ArrowRightIC width={20} height={20} />
  </Pressable>
);


const NotificationModal = () => {
  const { isModalActive, setModalIsActive } = useContext(
    NotificationModalContext
  );
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={isModalActive}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalIsActive(!isModalActive);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalIsActive(false)}>
          <BlurView intensity={5} tint="extraLight" style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={data}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

export default NotificationModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "flex-end",
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.main.background,
    paddingVertical: 50,
    width: "60%",
    //padding: 40,
    //gap: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  transactionItem: {
    flex: 1,
    padding: 25,
    width: "100%",

    borderBottomWidth: 0.5,
    borderColor: Colors.main.border,
    flexDirection: "row",
    justifyContent: "space-between",
    //backgroundColor:'red'
  },
  modalAmount: {
    fontSize: 15,
    marginRight: 10,

    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  modalStaus: {
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
    marginRight: "auto",
  },
})