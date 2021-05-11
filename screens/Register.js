import React, {Component, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput,
  Dimensions, 
  Button, 
  ToastAndroid, 
  TouchableOpacity,
  Alert, 
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const Register =({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isSelected, setSelection] = useState(false);
  // const checkRegister= (email,pass) =>{
  //     if(email)
  // }
  const createAcccount = (email,pass)=>{
    if(email =='', pass ==''){
      ToastAndroid.show("Không được để trống", ToastAndroid.SHORT);
    }
    auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      navigation.navigate('Login')
      ToastAndroid.show("User account created !", ToastAndroid.SHORT);
      console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }
    
  });
  }

    return (
      <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss();
      }}>
      <View style={styles.imagebackground}>
        <ImageBackground style={styles.background} source={require('../images/curve.png')}></ImageBackground>
      <View style={styles.container}> 
        <Text style={styles.title}>Register</Text>
      </View>
      <View style={styles.inputtext}>
      <TextInput style={styles.username}
          value= {email}
          placeholder="UserName"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput style={styles.password}
          value= {pass}
          secureTextEntry={true}
          placeholder="PassWord"
          onChangeText={(text) => setPass(text)}
        />
        <TextInput style={styles.password}
          placeholder="RePassWord"
          onChangeText={(text) => setPass(text)}
        />
      </View>
      <TouchableOpacity onPress={() => createAcccount(email,pass)} style={styles.containerLogin}>
          <Text style={styles.TextLogin}> Register</Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    );
  }
  export default Register;
const styles = StyleSheet.create({
container: {
    marginLeft: 30,
  },
title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 60,
    color: '#3192E9',
},

label:{
  margin:6,
},
inputtext:{
  marginTop: 60,
  alignSelf: "center",
},
username:{
  width: 320,
  height: 40,
  borderColor: "#F9F9F9",
  borderBottomColor: 'gray',
  borderBottomWidth: 0.5,
},
password:{
  marginTop: 10,
  width: 320,
  height: 40,
  borderBottomColor: 'gray',
  borderBottomWidth: 0.5,
},
background:{
  position: 'absolute',
  left: 0,
  top: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
imagebackground:{
  flex: 1,
  flexDirection: "column"
},
containerLogin:{
  width: 300,
  marginTop: 20,
  backgroundColor: '#1669D3',
  borderRadius: 25,
  paddingVertical: 10,
  // paddingHorizontal: 100
  marginHorizontal: 40
},
createAcccount:{
  color:'red'
},
TextLogin:{
  fontSize: 18,
  color: 'white',
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
}
});