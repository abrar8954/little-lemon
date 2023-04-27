import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
let db = openDatabase({ name: 'LittleLemonDb1.db' });
import { useNavigation } from '@react-navigation/native';

const Search = () => {
  const [dishes, setDishes] = useState();
  const navigation = useNavigation();
  const processChange = debounce(queryByDishname, 500);

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  function queryByDishname(dishName) {
    console.log(dishName);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_menu where item_name like (?)',
        [`%${dishName}%`],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setDishes(temp)
          // console.log('temp: ', temp);
        }
      );
    });
  }


  return (
    <View style={{ flex: 1, paddingLeft: 20 }}>
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
        <Image source={require('../assests/back.png')} style={{ marginTop: 20, }} />
      </TouchableOpacity>

      <TextInput placeholder='Search Meal'
        style={{ width: '90%', marginTop: 20, borderWidth: 1, borderColor: '#495E57', borderRadius: 10, paddingLeft: 10 }}
        onChangeText={(search) => { 
          processChange(search);
          /*queryByDishname(search) */}} />

      <View style={{ marginTop: 20, width: '70%' }}>
        <FlatList data={dishes} renderItem={
          ({ item, index }) => {
            return (
              <View style={{ height: 100, backgroundColor: '#495E57', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: '#fff' }}>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <View style={{ justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 22, fontWeight: '500', color: '#fff' }}>{item.item_name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>{'$' + item.price}</Text>
                  </View>

                  <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={{ width: 80, height: 80 }} />
                </View>

              </View>
            )
          }} />
      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})