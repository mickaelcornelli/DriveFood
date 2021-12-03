import React from 'react';
import Home from '../screen/home';
import Notes from '../screen/notes/notes';
import AddNotes from '../screen/notes/addNotes'
import Search from '../screen/product/search'
import Promotions from '../screen/product/promotions';
import DriveMap from '../screen/driveMap';
import Basket from '../screen/basket';
import ProductSection from '../screen/product/productSection';
import DetailProduct from '../screen/product/detailProduct';
import Account from '../screen/user/account';
import CommunicationsPreferences from '../screen/user/communicationsPreferences';
import AccountInformations from '../screen/user/accountInformations';
import Order from '../screen/user/order';
import AllOrders from '../screen/user/allOrders';
import Logout from '../screen/user/logout';
import Admin from '../screen/admin/admin';
import AdminUser from '../screen/admin/adminUser';
import AdminProduct from '../screen/admin/adminProduct';
import AdminSection from '../screen/admin/adminSection';
import AddUser from '../screen/admin/addUser'
import EditUser from '../screen/admin/editUser'
import AddProduct from '../screen/admin/addProduct'
import EditProduct from '../screen/admin/editProduct'
import AddSection from '../screen/admin/addSection'
import EditSection from '../screen/admin/editSection'
import Payment from '../screen/payment'
import {
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

const HomeStackNavigator = createStackNavigator({
  Home: { 
    screen: Home
  },
  Basket: { 
    screen: Basket
  },
  Promotions: { 
    screen: Promotions
  },
  DriveMap: { 
    screen: DriveMap
  },
  ProductSection: {
    screen: ProductSection
  },
  DetailProduct: { 
    screen: DetailProduct
  },
  Admin: {
    screen: Admin
  },
  AdminUser: {
    screen: AdminUser
  },
  AdminProduct: {
    screen: AdminProduct
  },
  AdminSection: {
    screen: AdminSection
  },
  AddUser: {
    screen: AddUser
  },
  EditUser: {
    screen: EditUser
  },
  AddProduct: {
    screen: AddProduct
  },
  EditProduct: {
    screen: EditProduct
  },
  AddSection: {
    screen: AddSection
  },
  EditSection: {
    screen: EditSection
  },
  Payment: {
    screen: Payment
  },
},
{
  headerMode: 'none'
})

const NotesStackNavigator = createStackNavigator({
  Notes: {
    screen: Notes
  },
  AddNotes: { 
    screen: AddNotes
  }
},
{
  headerMode: 'none'
})

const SearchStackNavigator = createStackNavigator({
  Search: { 
      screen: Search
  },
  DetailProduct: { 
    screen: DetailProduct
  },
},
{
  headerMode: 'none'
})

const AccountStackNavigator = createStackNavigator({
  Account: { 
      screen: Account
  },
  AllOrders: { 
    screen: AllOrders
  },
  AccountInformations: { 
    screen: AccountInformations
  },
  CommunicationsPreferences: { 
    screen: CommunicationsPreferences
  },
  Order: {
    screen: Order
  },
  Logout: { 
    screen: Logout
  },
},
{
  headerMode: 'none'
})

  const PromotionsStackNavigator = createStackNavigator({
    Promotions: { 
        screen: Promotions,
    },
    DetailProduct: { 
      screen: DetailProduct
    },
  },
  {
    headerMode: 'none'
  })

  // menu
  const TabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                <Icon style={[{color: tintColor}]} size={25} name={'ios-home'} />
                </View>
            ),
            }
        },
        
        Promotions: {
          screen: PromotionsStackNavigator,
          navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
              <View>
              <Icon2 style={[{color: tintColor}]} size={25} name={'tag'} />
              </View>
          ),
          }
        },

        Search: {
          screen: SearchStackNavigator,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon2 style={[{color: tintColor}]} size={25} name={'search1'} />
              </View>
            ),
          }
        },

        Notes: {
          screen: NotesStackNavigator,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <View>
                <Icon3 style={[{color: tintColor}]} size={25} name={'note'} />
              </View>
            ),
          }
        },

        Account: {
            screen: AccountStackNavigator,
            navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
                <View>
                <Icon3 style={[{color: tintColor}]} size={25} name={'account-circle'} />
                </View>
            ),
            }
        }
    },
    {
        initialRouteName: 'Home',
        activeColor: '#ffffff',
        inactiveColor: '#a3c2fa',
        barStyle: { backgroundColor: "#17202a" },
      }
    );

export default createAppContainer(TabNavigator);