import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemCardDeg from '../common/ItemCardDeg';
import { openDatabase } from 'react-native-sqlite-storage'
import CategoryBtn from '../common/CategoryBtn';
import { useNavigation } from '@react-navigation/native';
let db = openDatabase({ name: 'LittleLemonDb1.db' });

const Home = () => {
    const [searchClicked, setSearchClicked] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const [selectedMenuBtn, setSelMenuBtn] = useState({ 'starters': false, 'mains': false, 'desserts': false, 'drinks': false });
    const [listItems, setListItems] = React.useState([]);
    const navigation = useNavigation();
    let para = 'We are family owm Mwdetterrrian Restaurant, focused on traditional recipes served with a modern twist'
    let allowAllData = false;
    

    useEffect(() => {

        saveData();

    }, [menuData]);

    useEffect(() => {
        fetchMenuData();
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_menu'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_menu(item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(20), price VARCHAR(50), description VARCHAR(255), image VARCHAR(255), category VARCHAR(255))',
                            []
                        );
                        console.log('Table Created!');
                    } else {
                        console.log('Already Created Table!');
                    }
                }
            );
        });
    }, []);

    useEffect(() => {
        console.log('listItems: ', listItems);
        Object.keys(selectedMenuBtn).forEach(function (key, index) {

            console.log('key: ', key);
            console.log('selectedMenuBtn[key]: ', selectedMenuBtn[key]);
            selectedMenuBtn[key] ?
                (
                    allowAllData = true,
                    query(key)

                ) :
                (
                    !allowAllData ?
                        getData() : null
                )

        });
    }, [selectedMenuBtn]);


    let query = (val) => {
        console.log('queryHiTher!: ', val);
        // const queryVal = String(val);
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_menu where category = ?',
                [val],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setListItems(temp)
                        // alert('Dishes found');
                    } else {
                        alert('Not available at this time.');
                    }
                }
            );
        });
    }



    async function fetchMenuData() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const data = await response.json();

            // const menu = data.map(itm => {
            //     const dat = itm.menu;
            //     return dat;
            // });

            setMenuData(data.menu);
            // console.log('data: ', data);
            // console.log('menuData: ', menuData);
            // data.map(() => {

            // })

            // if (menuData) {
            //     console.log('callsaveData');
            //     saveData();

            // }

        } catch (error) {
            console.log(error);
        }

    }

    let saveData = () => {
        // console.log('saveData: ', username, email, address);
        db.transaction(function (txn) {
            menuData.map((item) => {

                txn.executeSql(
                    'SELECT * FROM table_menu',
                    [],
                    (tx, results) => {
                        if (results.rows.length == 0) {

                            txn.executeSql(
                                'INSERT INTO table_menu (item_name, price, description, image, category ) VALUES (?,?,?,?,?)',
                                [item.name, item.price, item.description, item.image, item.category],
                                (tx, results) => {

                                    console.log('Results', results);
                                    getData();

                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        }

                    }
                );

            });

        });
    }

    function getData() {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM table_menu',
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    setListItems(temp)
                    // console.log('temp: ', temp);
                }
            );
        });
        // console.log('listItems: ', listItems);
    }

    const handleSelectedMenu = (key) => {

        console.log('selectedMenuBtn', selectedMenuBtn);
        const newObjectState = { ...selectedMenuBtn };
        console.log('BenewObjectState: ', newObjectState);
        newObjectState[key] = !newObjectState[key];
        console.log('AfnewObjectState: ', newObjectState);
        setSelMenuBtn(newObjectState);

    };

    function deleteUser() {
        console.log('deleteuser');
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM table_menu ',
                [],
                (tx, results) => {
                    getData();
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User deleted successfully',
                            [
                                {
                                    text: 'Ok',

                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        alert('Please insert a valid User Id');
                    }
                }
            );
        });
    }

    

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ width: '100%', height: 75, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row', paddingRight: 18, backgroundColor: '#fff' }}>
                <Image source={require('../assests/Logo.png')} style={{ marginRight: '10%' }} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile')
                        // checkMap();
                        // checkMapUseSt();
                        // saveData();
                        // getData();
                    }}>
                    <Image source={require('../assests/Profile.png')} style={{ width: 55, height: 55 }} />
                </TouchableOpacity>

            </View>
            <View style={{ height: 350, backgroundColor: '#495E57', paddingLeft: 20, borderBottomRightRadius: 30 }}>
                <Text style={{ fontSize: 40, fontWeight: '400', color: '#F5CF14', marginTop: 10, }}>Little Lemon</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View >
                        <Text style={{ fontSize: 31, fontWeight: '400', color: '#fff' }} >Chicago</Text>
                        <Text style={{ fontSize: 18, fontWeight: '400', color: '#fff', width: 200, marginTop: 20 }} >{para}</Text>
                    </View>

                    <Image source={require('../assests/Hero_image.png')} style={{ width: 150, height: 170, borderRadius: 10, marginRight: 20, marginTop: 20 }} />
                </View>
                {!searchClicked ?
                    <TouchableOpacity style={{ width: 50, height: 50, backgroundColor: '#fff', borderRadius: 55 / 2, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} onPress={() => setSearchClicked(true)}>
                        <Image source={require('../assests/search.png')} style={{ width: 22, height: 22, }} />
                    </TouchableOpacity>
                    :
                    <View style={{ width: '85%', height: 45, backgroundColor: '#fff', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, marginTop: 20 }}>
                        <Image source={require('../assests/search.png')} style={{ width: 18, height: 18, }} />
                        <TextInput placeholder='Search Meal' style={{ width: '60%', marginLeft: 10 }} onChangeText={(search) => { queryByDishname(search) }} onPressIn={() => {navigation.navigate('Search')}} />
                    </View>
                }

            </View>
            <ScrollView style={{ height: 85, flex: 1 }} horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ height: 85, flexDirection: 'row' }}>
                    <CategoryBtn text={'Starters'} selectedMenuIndex={'starters'} onPress={(val) => handleSelectedMenu(val)} btnColor={selectedMenuBtn.starters} />
                    <CategoryBtn text={'Mains'} selectedMenuIndex={'mains'} onPress={(val) => handleSelectedMenu(val)} btnColor={selectedMenuBtn.mains} />
                    <CategoryBtn text={'Desserts'} selectedMenuIndex={'desserts'} onPress={(val) => handleSelectedMenu(val)} btnColor={selectedMenuBtn.desserts} />
                    <CategoryBtn text={'Drinks'} selectedMenuIndex={'drinks'} onPress={(val) => handleSelectedMenu(val)} btnColor={selectedMenuBtn.drinks} />
                </View>


                {/* <FlatList data={listItems} horizontal renderItem={
                    ({ item}) => {
                        return (
                            <TouchableOpacity style={{marginHorizontal: 10, alignSelf: 'center'}}>
                                 <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>{item.category}</Text>
                            </TouchableOpacity>
                        )
                    }} />                 */}
            </ScrollView>
            <View style={{ backgroundColor: '#495E57', borderTopLeftRadius: 30, paddingTop: 40 }}>
                <FlatList data={listItems} scrollEnabled={false} renderItem={
                    ({ item, index }) => {
                        // console.log('item: ', item);
                        return (
                            <View style={{ height: 200, width: '100%', backgroundColor: '#495E57', paddingHorizontal: 10, borderBottomWidth: 1, borderColor: '#fff' }}>
                                <Text style={{ fontSize: 22, fontWeight: '500', marginTop: 15, color: '#fff' }}>{item.item_name}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                    <Text style={{ fontSize: 18, fontWeight: '500', width: 280, color: '#fff' }} numberOfLines={2}>{item.description}</Text>
                                    <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={{ width: 80, height: 80, }} />
                                </View>
                                <Text style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>{item.price}</Text>
                                <Text style={{ fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 8, color: '#F5CF14' }}>Free Delevery!</Text>
                            </View>
                            // { uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true' }
                        )
                    }
                } />
            </View>

        </ScrollView>

        // <View style={{ backgroundColor: '#495E57', flex: 1}}>
        //         <FlatList data={menuData} scrollEnabled={false} renderItem={
        //             ({ item, index }) => {
        //                 console.log('item: ', item);
        //                 return (
        //                     <View style={{ height: 230, width: 180, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#495E57' }}>
        //                         <Image source={{ uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true' }} style={{ width: 180, height: 150, }} />
        //                         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10, alignItems: 'center' }}>
        //                             <Text style={{ fontSize: 22, fontWeight: '500' }}>{item.name}</Text>
        //                             <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.price}</Text>
        //                         </View>
        //                         <Text style={{ fontSize: 18, fontWeight: '500', alignSelf: 'center', marginTop: 8, color: '#F5CF14' }}>Free Delevery!</Text>
        //                     </View>
        //                 )
        //             }
        //         } />
        //     </View>

        // <View>
        //     <Text>Hi there</Text>
        // </View>
    )
}

export default Home

