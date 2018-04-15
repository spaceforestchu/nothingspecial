import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';
import styles from './styles/styles.js';
import DatePicker from './components/datePicker/datePicker';
import GenderPicker from './components/genderPicker/genderPicker';
import InfoInput from './components/infoInput/infoInput';
// import LinearGradient from 'react-native-linear-gradient';
import {Font, LinearGradient} from 'expo';
import { FACEBOOK_APP_ID } from './secret';
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: ''
    }

    this.logInFB = this.logInFB.bind(this)
  }

  componentWillMount() {
    Font
      .loadAsync({'BerkshireSwash-Regular': require('./assets/fonts/BerkshireSwash-Regular.ttf')})
      .then(() => {
        let style = StyleSheet.create({
          logoText: {
            color: 'white',
            fontFamily: 'BerkshireSwash-Regular',
            fontSize: 40,
            textAlign: 'center',
            padding: 10
          }
        });
        this.setState({style});
      })
  }

   async logInFB() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
  }

  render() {
    return (
    <LinearGradient colors={['#e65d0a', '#860100']} style={{width: '100%', height: '100%'}}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Image
          style={{
          width: '100%',
          // height: 400
        }}
          source={require('./assets/images/birds.png')}/>
        <Text style={this.state.style.logoText}>Flokr</Text>
        <Text style={styles.text}>Let us know you are real</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.logInFB}
          >
               <Text style={styles.buttonLable}>
               CONTINUE WITH FACEBOOK
               </Text>
               </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
             axios.post('https://blooming-gorge-89719.herokuapp.com/facebook/', this.state) .then((res) => {
               console.log(res)}).catch((err) => { console.log(err); }) }}>
               <Text style={styles.buttonLable}>
               CONTINUE WITH INSTAGRAM
               </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{console.log('help pressed')}} style={styles.helpContainer}>
                <Text style={styles.text}>
                ?
                </Text>
               </TouchableOpacity>
               <Text style={styles.text}>No worries! We never post anything to Facebook or Instagram</Text>
               <Text style={styles.termsOfService}>Terms of Service</Text>
      </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}
