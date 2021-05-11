import React, {Component, useState, useEffect} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {Card} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const RealtimeDatabase = (props) => {
    //   const [name, setName] = useState('');
    //   const [price, setPrice] = useState('')
    const navigation = useNavigation()
    const [productData, setProductData] = useState([]);
    const [productItem, setProductItem] = useState({
      name: '',
      price: '',
      total: '',
    });
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('gioHang')
        let data = JSON.parse(setProductItem(value));
        console.log(data)
        if(value !== null) {
          // value previously stored
        }
      } catch(e) {
        // error reading value
      }
    }
    useEffect(() => {
      // const onValueChange = database()
      //   .ref(`/products/`)
      //   .on('value', (snapshot) => {
      //     let items = [];
      //     snapshot.forEach((element) => {
      //       let item = {
      //         _key: element.key,
      //         image: element.val().image,
      //         name: element.val().name,
      //         price: element.val().price,
      //         info: element.val().info,
      //       };
      //       items.push(item);
      //     });
      //     setProductData(items);
      //   });
  
      // // Stop listening for updates when no longer required
      // return () => database().ref(`/Products/`).off('value', onValueChange);
      try {
        const value = AsyncStorage.getItem('gioHang')
        let data = JSON.parse(setProductItem());
        console.log(data)
        if(value !== null) {
          // value previously stored
        }
      } catch(e) {
        // error reading value
      }
    }, []);
    const insertData = () => {
      const newReference = database().ref('/products').push(productItem);
      console.log(newReference.key);
    };
    
        return(
    // <TouchableWithoutFeedback onPress={()=>{
    //   Keyboard.dismiss();
    // }}>
    // <View>
    //    <Text style={styles.text}>Add Products</Text>
    // <View style={styles.input} >
    //   <TextInput
    //       style={styles.inputText}
    //       value={productItem.image}
    //       placeholder="Image"
    //       onChangeText={(text) => setProductItem({...productItem, image: text})}
    //     />
    //     <TextInput  
    //       style={styles.inputText}
    //       value={productItem.name}
    //       placeholder="Name"
    //       onChangeText={(text) => setProductItem({...productItem, name: text})}
    //     />
    //     <TextInput
    //       style={styles.inputText}
    //       value={productItem.price}
    //       placeholder="Price"
    //       onChangeText={(text) => setProductItem({...productItem, price: text})}
    //       keyboardType='number-pad'
    //     />
    //     <TextInput
    //       style={styles.inputText}
    //       value={productItem.info}
    //       placeholder="Info"
    //       onChangeText={(text) => setProductItem({...productItem, info: text})}
    //     />
    //     <Button style={styles.button} title="insert" onPress={() =>  {insertData();navigation.navigate('ProductStack')}}></Button>
    //   </View>
    // </View>
    // </TouchableWithoutFeedback>
    <TouchableOpacity
        delayPressIn={0}
        onPress={() => console.log(productItem)}>
        <Card style={styles.newsBox}>
          <View>
            <View>
              {/* <Image style={{ width:60,height:70}} source={props.item.image}></Image> */}
              <Text numberOfLines={1}>{productData}</Text>
              <Text numberOfLines={2}>{productItem.price}</Text>
              <Text numberOfLines={3}>{productItem.total}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
        );
};
export default RealtimeDatabase;
const ProductItem = (props) => {
    return (
      <TouchableOpacity
        delayPressIn={0}
        onPress={() => onItemClick(props.proItem)}>
        <Card style={styles.newsBox}>
          <View>
            <View>
              {/* <Image style={{ width:60,height:70}} source={props.item.image}></Image> */}
              <Text numberOfLines={1}>{props.proItem.name}</Text>
              <Text numberOfLines={2}>{props.proItem.price}</Text>
              <Text numberOfLines={3}>{props.proItem.info}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    inputText: {
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: '#000',
      height: 40,
      borderRadius: 5,
      marginHorizontal: 20,
    },
    cardView: {
      flexDirection: 'row',
    },
    newsBox: {
      backgroundColor: '#FCFBFB',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#FCFBFB',
      shadowOffset: {
        width: 0,
        height: 2,
      }},
      input:{
        marginTop: 70
      },
      text:{
        textAlign: 'center',
        margin: 10,
        height: 40,
        color: 'blue',
        fontSize: 25,
        fontWeight:'bold',
        marginTop: 20
      },
  });
