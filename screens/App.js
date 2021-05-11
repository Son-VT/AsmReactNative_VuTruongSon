import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreens from '../screens/Login';
import RegisterScreens from '../screens/Register';
import ProductsScreens from '../screens/Products';
import AddScreens from '../screens/RealtimeDatabase';
import React, {Component, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import { 
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Button} 
from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Product"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Product"
        component={ProductsScreens}
        options={{title: 'Product'}}
      />
      <Stack.Screen
        name="InsertProduct"
        component={AddScreens}
        options={{title: 'InsertProduct'}}
      />
    </Stack.Navigator>
  );
};
const Logout =()=>{
  auth()
.signOut()
.then(() => console.log('User signed out!'));
}

const TabProduct = () => {
  return (
    <Tab.Navigator
      initialRouteName="ProductStack"
      screenOptions={{headerShown: false}}
      activeColor="#fff"
      inactiveColor="#000"
      barStyle={{backgroundColor: '#139cf8'}}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color="#fff" size={25} />
          ),
        }}
        name="ProductStack"
        component={ProductStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Add Products',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="plus" color="#fff" size={25} />
          ),
        }}
        name="ProfiletStack"
        component={AddScreens}
      />
    </Tab.Navigator>
  );
};

const App =()=>{
  const [isSelected, setSelection] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; 
    if (!user) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name= "Login" component= {LoginScreens} options={{ title: 'Login'}}/>
          <Stack.Screen name= "Register" component= {RegisterScreens} options={{ title: 'Register'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
return(
  <NavigationContainer>
  <Stack.Navigator initialRouteName="Tab" screenOptions={{headerShown: false}} >
      <Stack.Screen name= "Tab" component= {TabProduct} options={{ title: 'TabProducts'}}/>
      <Stack.Screen name= "Back" component= {ProductStack} options={{ title: 'TabProducts'}}/>
      <Stack.Screen name= "Login" component= {LoginScreens} options={{ title: 'Login'}}/>
  </Stack.Navigator>
</NavigationContainer>
)}
export default App;
