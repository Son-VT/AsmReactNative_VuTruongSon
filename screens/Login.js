import React, {Component, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ProductsScreens from '../screens/Products';
// import { useForm } from "react-hook-form";
import {View, 
  Text, 
  StyleSheet, 
  Image,
  Dimensions, 
  TextInput, 
  Button, 
  TouchableOpacity,
  CheckBox, 
  ImageBackground, 
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,

} from 'react-native';
// import { Form, TextValidator } from 'react-native-validator-form';
const Login =({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    isValidPassword: true,
    secureTextEntry: true,
    pattern: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
});
const validation=(user)=>{
  if (user.match(data.pattern)) {
    setData({
      ...data,
      username: user,
      check_textInputChange: true,
      isValidUser: true
  });
   } else {
    setData({
        ...data,
        username: user,
        check_textInputChange: false,
        isValidUser: false
    });
}
}
const textInputChange = (val) => {
  if(val.trim().length >=4) {
      setData({
          ...data,
          username: val,
          check_textInputChange: true,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          username: val,
          check_textInputChange: false,
          isValidUser: false
      });
  }
}

const handlePasswordChange = (val) => {
  if( val.trim().length >= 6 ) {
      setData({
          ...data,
          password: val,
          isValidPassword: true
      });
  } else {
      setData({
          ...data,
          password: val,
          isValidPassword: false
      });
  }
}

const updateSecureTextEntry = () => {
  setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
  });
}

const handleValidUser = (val) => {
  if( val.trim().length >=4 ) {
      setData({
          ...data,
          isValidUser: true
      });
  } else {
      setData({
          ...data,
          isValidUser: false
      });
  }
}
const loginHandle = (userName, password) => {

  const foundUser = Users.filter( item => {
      return userName == item.username && password == item.password;
  } );

  if ( data.username.length == 0 || data.password.length == 0 ) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
          {text: 'Okay'}
      ]);
      return;
  }

  if ( foundUser.length == 0 ) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'}
      ]);
      return;
  }
  signIn(foundUser);
}
  const [user, setEmail] = useState(data.username);
  const [pass, setPass] = useState(data.password);
  const loginAuthen = (email,pass) =>{
    auth()
   .signInWithEmailAndPassword(email, pass)
   .then(() =>
  //  navigation.dispatch(StackActions.replace('Profile', {user: 'jane'})) 
   navigation.replace('Tab'),ToastAndroid.show("Sign In Successful !", ToastAndroid.SHORT))
 }
  const [isSelected, setSelection] = useState(false);
    return (
      <TouchableWithoutFeedback onPress={()=>{
        Keyboard.dismiss();
      }}>
      <View style={styles.imagebackground}>
        <ImageBackground style={styles.background} source={require('../images/curve.png')}></ImageBackground>
      <View style={styles.container}>  
      
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.logocontainer}>
         <Text style={styles.undertitle}>Don't have an account? <Text style={styles.createAcccount}>Create your account.</Text>  </Text> 
      </View>
      <View style={styles.containerInput}>
      <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                   
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                       
                    }]}
                  
                    keyboardType='email-address'
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid email address, Ex: abc@gmail.com</Text>
            </Animatable.View>
            }
            

            
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {

                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                        style={{marginLeft: 20}}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
            </Animatable.View>
            }
      {/* <View style={styles.inputtextEmail}>
      <Feather 
                    name="user"
                    size={20}
                    style={{marginLeft: 5}} 
                />
      <TextInput style={styles.username}
          value={email}
          text="son@gmail.com"
          placeholder="Email"
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
        />
        </View>  */}
        {/* <View style={styles.inputtextPass}>
        <Feather 
                    name="lock"
                    size={20}
                    style={{marginLeft: 5}} 
                />
        <TextInput style={styles.password}
          style={{flex: 1}}
          value={pass}
          placeholder="PassWord"
          onChangeText={(text) => setPass(text)}
          secureTextEntry={true}
          
        />
        </View>  */}
      </View>
      <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember Me</Text>
          <Text style={styles.label1}>Forgot PassWord?</Text>
        </View>
        <View style={styles.containerLoginRegister}>
      <TouchableOpacity onPress={()=> loginAuthen(data.username,data.password)} style={styles.containerLogin}>
          <Text style={styles.TextLogin}> Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.containerRegister}>
          <Text style={styles.TextRegister}> Register</Text>
      </TouchableOpacity>
      
      </View>
      </View>
      </TouchableWithoutFeedback>
     
    );
  }
  export default Login;
const styles = StyleSheet.create({
container: {
    marginLeft: 30,
  },
logocontainer: {
  marginLeft: 30,
  },
containerLoginRegister:{
  flexDirection: "row",
  // alignSelf: "center",
},
containerInput:{
 margin: 15,
 marginTop: 50
},
socialLogin:{
  flexDirection: "row",
},
title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 30,
    color: '#3192E9',
},
checkboxContainer:{
  marginLeft:30,
  flexDirection: "row",
},
label:{
  margin:6,
},
label1:{
  margin:6,
  position: 'absolute',
  right: 30
},
logo:{
  width: 160,
  height: 62,
  marginTop: 20,
},
inputtextEmail:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5,
    marginTop: 50,
    marginHorizontal: 20
},
inputtextPass:{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 0.5,
  borderColor: '#000',
  height: 40,
  borderRadius: 5,
  margin: 20,
},
username:{
  flex: 1,
},
password:{
  flex: 1,
  marginTop: 100
},
background:{
  // width: '100%',
  // height: '100%',
  opacity: 0.8,
  position: 'absolute',
  left: 0,
  top: 0,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
imagebackground:{
  flex: 1,
},
containerLogin:{
  width: 140,
  marginTop: 20,
  backgroundColor: '#1669D3',
  borderRadius: 25,
  paddingVertical: 10,
  // paddingHorizontal: 100
  marginHorizontal: 26.5
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
},
containerRegister:{
  width: 140,
  marginTop: 20,
  backgroundColor: '#1669D3',
  borderRadius: 25,
  paddingVertical: 10,
  // paddingHorizontal: 100
  // marginHorizontal: 10
},
TextRegister:{
  fontSize: 18,
  color: 'white',
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase"
},
imageStyle: {
  padding: 10,
  margin: 5,
  height: 25,
  width: 25,
  resizeMode: 'stretch',
  alignItems: 'center',
},
Textfb:{
  color: 'black'
},




header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
},
text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
},
text_footer: {
    color: '#05375a',
    fontSize: 18
},
action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
},
actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
},
textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
},
errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
button: {
    alignItems: 'center',
    marginTop: 50
},
signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
},
textSign: {
    fontSize: 18,
    fontWeight: 'bold'
}
});