import React from 'react';
import { StyleSheet,ImageBackground, View } from 'react-native';

import RequireAuth from './helpers/require-auth';
import { Provider } from "react-redux";
import store from './store';
import Loading from './helpers/loading';

export default class App extends React.Component {
  state = {
    loaded:false
  }
  constructor(){
    super()
    Loading.load(v => this.setState({loaded: true}));
  }
  render() {
    return (
      <View style={styles.container}>
      {this.state.loaded ? 
      <Provider store={store}>
        <RequireAuth />
      </Provider>
      :
      <ImageBackground 
        source={require('./assets/img/background.gif')} 
        style={styles.image}
      >
      </ImageBackground>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover" 
  }
});