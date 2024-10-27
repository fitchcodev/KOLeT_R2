import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";
import { hp, wp } from "@/helpers/common";
import SearchIC from "@/assets/images/svg/SearchIC";
import ArrowVertical from "@/assets/images/svg/ArrowVertical";
import SuccessPlayerIC from "@/assets/images/svg/SuccessPlayerIC";
import CancleIC from "@/assets/images/svg/CancleIC";
import CancleIC2 from "@/assets/images/svg/CancleIC2";
import ArrowRightIC from "@/assets/images/svg/ArrowRight";
import InvoiceIc from "@/assets/images/svg/InvoiceIc";

const Transactions = () => {
  const { top } = useSafeAreaInsets();
  const paddinTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const sercahInputRef = useRef(null);
  const clearSearch = () => {
    setSearch("");
    sercahInputRef?.current?.clear();
  };
  const handleSearch = (text: any) => {
    setSearch(text);
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const data = [
    {
      id: 0,
      data: {
        date: "Monday, 1 January",
        transaction: [
          {
            id: 0,
            amount: "100000",
            time: "5:15 PM",
            status: "success",
          },
        ],
      },
    },
    {
      id: 1,
      data: {
        date: "Tuesday, 2 January",
        transaction: [
          {
            id: 0,
            amount: "1000",
            time: "5:15 PM",
            status: "pending",
          },
          {
            id: 1,
            amount: "60000",
            time: "5:15 PM",
            status: "failed",
          },
          {
            id: 2,
            amount: "60000",
            time: "5:17 PM",
            status: "success",
          },
          {
            id: 3,
            amount: "500",
            time: "9:15 PM",
            status: "success",
          },
        ],
      },
    },
    {
      id: 2,
      data: {
        date: "Thursday, 4 January",
        transaction: [
          {
            id: 0,
            amount: "600",
            time: "12:15 AM",
            status: "success",
          },
          {
            id: 1,
            amount: "1018",
            time: "4:15 PM",
            status: "pending",
          },
          {
            id: 2,
            amount: "1018",
            time: "4:17 PM",
            status: "success",
          },
        ],
      },
    },
  ];
  type ItemProps = {
    data: {
      date: string | undefined;
      transaction: [
        {
          id: number;
          amount: string | undefined;
          time: string | undefined;
          status: string | undefined;
        }
      ];
    };
  };

  const Item = ({ data }: ItemProps) => (
    <View style={styles.item}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{data.date}</Text>
      </View>
      <View style={styles.transactionItemCon}>
        {data.transaction.map((item, index) => (
          <TouchableOpacity style={styles.transactionItem} key={item.id}>
            {item.status == "success" && (
              <SuccessPlayerIC width={20} height={20} />
            )}
            {item.status == "failed" && <CancleIC2 width={20} height={20} />}
            {item.status == "pending" && (
              <InvoiceIc stroke={"#F39C12"} width={20} height={20} />
            )}

            <Text style={styles.amount}>₦{item.amount}</Text>
            <Text style={styles.time}>{item.time}</Text>
            <ArrowRightIC width={20} height={20} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  return (
    <View style={[styles.container, { paddingTop: paddinTop }]}>
      <View
        style={{
          width: "100%",
          paddingTop: 5,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
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
          Transactions
        </Text>
      </View>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchBarIcon}>
          <SearchIC width={20} height={20} />
        </View>
        <TextInput
          placeholder="Search"
          placeholderTextColor={"rgba(0,0,0,0.5)"}
          style={styles.searchInput}
          keyboardAppearance="light"
          enablesReturnKeyAutomatically={true}
          enterKeyHint={"search"}
          //value={search}
          onChangeText={handleTextDebounce}
          clearButtonMode="while-editing"
          ref={sercahInputRef}
        />
      </View>

      {/* Flatlits */}
      <View style={{ flex: 1, width: wp(100), marginTop: 20 ,     marginBottom:hp(10),}}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item data={item.data} />}
          keyExtractor={(item) => item.id}
          keyboardDismissMode="on-drag"
        />
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main.background,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 5,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.main.border,
    backgroundColor: Colors.main.background,
    padding: 6,
    paddingLeft: 10,
    borderRadius: 10,
  },
  searchBarIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  item: {
    //ackgroundColor: "#f9c2ff",
    padding: 15,
  },
  date: {
    paddingBottom: 15,
    borderBottomWidth: 1.5,
    borderColor: Colors.main.border,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  transactionItemCon: {
    gap: 10,
    justifyContent: "space-between",
  },
  transactionItem: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: Colors.main.border,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: 'space-between'
  },
  amount: {
    fontSize: 15,
    flex: 1,
    paddingHorizontal: 10,

    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    color: Colors.main.text,
  },
  time: {
    fontSize: 14,

    fontFamily: "Montserrat-Regular",
    color: Colors.main.description,
    textAlign: "center",
    marginRight: 10,
  },
});
