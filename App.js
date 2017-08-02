import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import Timer from './components/Timer'

const data = {
   work: {
      time: 25
   },
   short: {
      time: 5
   },
   long: {
      time: 10
   }
}
let shorts = 0;

export default class App extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         type: "work",
         time: data.work.time
      };
        
   }

   _changeState(newstate) {
      if (this.state.type !== newstate) {
         this.setState({
            type: newstate,
            time: data[newstate].time
         });
      }
   }
   
   onTimerEnd = () => {
      // work out what the next state should be
      let ns = (this.state.type === "work") ? "short" : "work";
      if (ns === "short") {
         shorts++;
         // are we due a long rest? hope so
         if (shorts > 2) {
            ns = 'long';
            shorts = 0;
         }
      }
      // switch it
      this._changeState(ns);
   }
   
   render() {
   
      StatusBar.setBarStyle('light-content', true);
   
      return (
         <View style={StyleSheet.flatten([styles.container, styles[this.state.type]])}>
         
            <View style={styles.main}>
               <Timer 
                  style={styles.main} 
                  key={this.state.type} 
                  type={this.state.type} 
                  time={this.state.time} 
                  onEnd={this.onTimerEnd} 
               />
            </View>
            
            <View style={styles.buttons}>
            
               <TouchableOpacity onPress={()=>this._changeState("work")}>
                  <Image style={styles.button} source={require('./img/button-tomato.png')}/>
               </TouchableOpacity>
               
               <TouchableOpacity onPress={()=>this._changeState("short")}>
                  <Image style={styles.button} source={require('./img/button-short.png')}/>
               </TouchableOpacity>
               
               <TouchableOpacity onPress={()=>this._changeState("long")}>
                  <Image style={styles.button} source={require('./img/button-long.png')}/>
               </TouchableOpacity>
               
            </View>
            
         </View>
      );
   }
   
}

const styles = StyleSheet.create({
  
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   
   work: {
      backgroundColor: '#ba2929'
   },
   
   short: {
      backgroundColor: '#29baa4'
   },
   
   long: {
      backgroundColor: '#6aba29'
   },
   
   main: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   
   buttons: {
      flexDirection: 'row',
      padding: 15,
      paddingHorizontal: 30,
      height: 100,
      width: '100%',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255,255,255,0.1)'
   },
   
   button: {
      width: 70,
      height: 70,
      opacity: 0.7,
      resizeMode: 'contain'
   }
  
});
