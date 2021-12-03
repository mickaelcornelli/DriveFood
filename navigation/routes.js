import React from 'react';
import Login from '../screen/user/login';
import Register from '../screen/user/register';
import Home from '../screen/home';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

//on crée nos deux routes qu'on insère par la suite dans le menu qu'on afficher (équivalent d'une route)
const RegisterStackNavigator = createStackNavigator({
  Register: { 
    screen: Register
  }
},
{
  headerMode: 'none'
})

const LoginStackNavigator = createStackNavigator({
  Login: { 
      screen: Login
  },
},
{
  headerMode: 'none'
})


//ici on crée un menu de navigation avec les boutton register et login
const TabNavigator = createMaterialBottomTabNavigator(
  
  {
    Register: {
      screen: RegisterStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon2 style={[{color: tintColor}]} size={25} name={'solution1'} />
          </View>
        ),
      }
    },

    Login: {
      screen: LoginStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{color: tintColor}]} size={25} name={'ios-person'} />
          </View>
        ),
      }
    },

  },
  
  {
    //affichage par défault
    initialRouteName: 'Login',
    activeColor: '#a3c2fa',
    inactiveColor: '#ffffff',
    barStyle: { backgroundColor: '#17202a' },
    tabBarLabel: {labeled: true},
  }
)

export default createAppContainer(TabNavigator);