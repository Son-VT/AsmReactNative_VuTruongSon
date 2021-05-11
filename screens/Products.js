import React, { useState, useEffect } from 'react';
import Swipeout from 'react-native-swipeout'
import Dialog from "react-native-dialog";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NumericInput from 'react-native-numeric-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image, 
    Alert,
    FlatList, 
    Dimensions,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
var IPAddress = 'http://192.168.43.57:3000';
const DeleteProduct = key => {
    try {
      database ().ref ('/products/').child ('' + key).remove ();
      let updates = [];
      updates['/products/' + key] = null;
      database ().ref ().update (updates);
    } catch (error) {
      console.log (error);
    }
  };
  const LogoutAth =()=>{
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }
  const Logout =()=>{
    Alert.alert(
      "Log Out: ",
       "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => LogoutAth() }
      ],
      { cancelable: false }
    );
  }
  const storeData = async (value) => {
    try {
      AsyncStorage.setItem(
        'gioHang',
        JSON.stringify(value),
        ()=>{
        getData()
        });
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('gioHang')
      let data = JSON.parse(value);
      console.log(data)
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
const ListItem = (props) => {
  
    const [timesPressed, setTimesPressed] = useState({
      number: '',    
    });
    let gioHang = {
      name: props.item.tenLoai,
      price: props.item.gia,
      total: timesPressed.number
    };
    
    const [modalVisible, setModalVisible] = useState(false);
    const [isDialogVisible,setDialogVisible] = useState(false);
    const showDialog =(isShow) =>{
        setDialogVisible(isShow);
      }
      const closeDialog =() =>{
        setDialogVisible(false);
      }
      const [productItem, setProductItem] = useState({
        id: props.item._id,
        name: props.item.tenLoai,
        price: props.item.gia,
        // info: props.item.info,dfgdfg
      })
      const updateData = () =>{
        try {
          database ().ref ('/products/' + props.item._key).update (productItem);
          closeDialog()
        } catch (error) {
          console.log (error);
        }
      }
    const swipeoutSetting = {
        
        autoClose: true,
        onClose: () => {
            console.log('Closeeee')
        },
        onOpen: ({navigation}) => {
            console.log('Onpen')
        },
        backgroundColor: '#fff',
        
        left: [
            {
                component: (
                    <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          borderWidth: 5,
                          borderColor: '#fff',
                        }}
                    >
                      <Image style={{width:20,height:21}} tintColor='#fff' source={require('../images/icedit.png')} />
                    </View>
                  ),
                text: 'Update',
                type: 'secondary',
                backgroundColor:'green',
                onPress:() => {
                    showDialog(true)
                    console.log("True or false: "+isDialogVisible)
                }
            }],
            right: [{
                component: (
                    <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          borderWidth: 5,
                          borderColor: '#fff',
                        }}
                    >
                      <Image style={{width:18,height:21}} tintColor='#fff' source={require('../images/icdelete.png')} />
                    </View>
                  ),
                text: 'Delete',
                type: 'delete',
                onPress: () => {
                    Alert.alert(
                        "Delete Products: "+props.item.name,
                         "Are you sure?",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => DeleteProduct(props.item._key) }
                        ],
                        { cancelable: false }
                      );
                }
            }
        ],
    }
    return (
        <Swipeout {...swipeoutSetting}>
           <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
        }}
      >
        {/* modal*/}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={{ width: 64, height: 64, padding: 40, marginBottom:10}} 
                source={{uri: IPAddress + '/upload/' + props.item.image}}
            />
            <Text style={styles.modalText}>Name: {productItem.name}</Text>
            <Text style={styles.modalText}>Price: {productItem.price}</Text>
            <View style={styles.containerAddProducts}>
                <NumericInput
                  value={timesPressed.number}
                  onChange={(text) => setTimesPressed({...timesPressed, number: text})}
                  totalWidth={120} 
                  totalHeight={35} 
                  minValue ={1}
                  rounded
                  textColor='#B0228C' 
                  iconStyle={{ color: 'black' }} 
                  rightButtonBackgroundColor='#FFFF' 
                  leftButtonBackgroundColor='#FFFF'
                />
            </View>
      
            <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
            <TouchableOpacity style={{padding: 10, marginLeft: 15}} 
            onPress ={()=>{
              storeData(gioHang);
            }}>
              <Image
                source={require('../images/shopping.png')}
                style={styles.imageAddProduct}
              />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      </Modal>
            <Dialog.Container visible={isDialogVisible}>
                <Dialog.Title style={{color:'red'}}>Update Products</Dialog.Title>
                <Dialog.Description>
                     Do you want to update this products?
                </Dialog.Description>
                <Dialog.Input style={styles.inputDialog}
                  onChangeText={(text) => setProductItem({...productItem, name: text})} >{productItem.name}</Dialog.Input>
                <Dialog.Input style={styles.inputDialog}
                  onChangeText={(text) => setProductItem({...productItem, price: text})} >{productItem.price}</Dialog.Input>
                <Dialog.Input style={styles.inputDialog}
                  onChangeText={(text) => setProductItem({...productItem, info: text})} >{productItem.info}</Dialog.Input>
                <Dialog.Button label="Cancel" onPress={closeDialog}/>
                <Dialog.Button label="Update" onPress={updateData}/>
            </Dialog.Container>
            <TouchableOpacity
                  onPress={() => {
                  setModalVisible(true);
                }}
            >
        <View style={styles.listContainer}>
            <Image style={{ width: 64, height: 64}} 
                source={{uri: IPAddress + '/upload/' + props.item.image}}
            />
            <View>
                <Text style={styles.listText} > Name: {props.item.tenLoai}</Text>
                <Text style={{marginLeft:10,fontSize:15}}> Price: {props.item.gia}</Text>
                
            </View>
            <View style={styles.containerButtonAdd}>
            <TouchableOpacity onPress= {getData} style={{padding: 20}} >
              <Image
                source={require('../images/shopping.png')}
                style={styles.imageAddProduct}
              />
              </TouchableOpacity>
            </View>
        </View>
        </TouchableOpacity>
        </Swipeout>
    );
};
const Products = ({navigation}) => {
   
    // const [productData, setProductData] = useState([]);
    // useEffect(() => {
      //   const onValueChange = database()
      //     .ref(`/products/`)
      //     .on('value', (snapshot) => {
      //       let items = [];
      //       snapshot.forEach((element) => {
      //         let item = {
      //           _key: element.key,
      //           image: element.val().image,
      //           name: element.val().name,
      //           price: element.val().price,
      //           info: element.val().info,
      //         };
      //         items.push(item);
      //       });
      //       setProductData(items);
      //     });
    
      //   // Stop listening for updates when no longer required
      //   return () => database().ref(`/Products/`).off('value', onValueChange);
      // }, []);
      const [isLoading, setLoading] = useState(true);
      const [data, setData] = useState([]);
    
      useEffect(() => {
        fetch(IPAddress +'/api/products')
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error))
          .finally(() => setLoading(false));
      }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.titleProduct}>
            <Text style={{fontSize:30,top: 0, fontWeight:'bold',textAlign:'center',color:'black',marginLeft:10}}>Product list</Text>
            {/* <TouchableOpacity onPress={()=> navigation.navigate('InsertProduct')} style={styles.containerAdd}>
                <Text style={styles.addProduct}>Add Products</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>{Logout()} } style={styles.containerAdd}>
                <Image
                  source={require('../images/logout.png')}
                  style={styles.imageStyle}
                />
            </TouchableOpacity>
           
            </View>
           
            {isLoading ? <ActivityIndicator size="small" color="#0000ff"/> : (
               
            <FlatList data={data} renderItem={({item}) => <ListItem  item={item} />} />
           
           )}
          
        </View>
    );
};
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    text: {
        fontSize: 24,
        marginTop: 30,
        fontFamily: "Roboto_Regular"
    },
    listContainer: {
        flexDirection: 'row',
        // margin: width * 3.6 / 187.5,
        // margin:5,
        // padding: width * 3.6 / 187.5,
        // borderRadius: width * 3.6 / 187.5,
        // padding: 10,
       
        // marginHorizontal: 5,
        
        // borderColor: '#000',
        // borderRadius: 10

        // ,
        marginVertical: 4,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4
    },
    listText:{
        marginLeft:10,fontSize:16,color:'black',
        fontWeight:'bold'
    },
    view:{
        width:"100%",
        height:0.2,
        backgroundColor:'grey'
    },
    addProduct:{
        textAlign: 'center',
        margin: 10,
        height: 40,
        color: 'white',
        backgroundColor: 'blue'
    },
    Logout:{
      textAlign: 'center',
      margin: 10,
      height: 40,
      color: 'white',
      backgroundColor: 'blue'
  },
    containerAdd:{
        width: 90,
        // alignSelf: 'flex-end',
        marginLeft: 125 ,
    },
    inputDialog:{
        borderWidth: 0.5,
        borderColor: '#000',
        borderRadius: 5,
    },
    listview:{
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 26,
    },
    titleProduct:{
      height: 40,
      flexDirection: "row",
      // alignSelf: 'center',
      marginBottom: 30,
      backgroundColor: '#139cf8',
      top: 0, left: 0, right: 0, bottom: 0
    },
    imageStyle: {
      padding: 10,
      marginTop: 8,
      height: 25,
      width: 25,
      marginLeft: 35 ,
      // resizeMode: 'stretch',
      // alignItems: 'center',
    },
    imageAddProduct:{
      width: 20,
      height: 20,
    },
    containerButtonAdd:{
      flex: 1,
      flexDirection: 'row', 
      justifyContent: 'flex-end',
    },
    imagePlus:{
      width: 35,
      height: 45,
      
    },
    imageMinus:{
      width: 30,
      height: 30
    },
    containerAddProducts:{
      padding: 20
    },

// style modal
    centeredView: {
      flex: 1,
      justifyContent: "center",
      marginTop: 22,
      paddingHorizontal: 30
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding:10,
      elevation: 2,
      height: 40,
      width: 80,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
export default Products;