import React from 'react';
import { StyleSheet, Text, View, Image, Vibration } from 'react-native';

// init the timer ref
let timer = null;

// require the mask images
const masks = {
   work:   require('./img/mask-work.png'),
   short:  require('./img/mask-short.png'),
   long:   require('./img/mask-long.png')
}

export default class Timer extends React.Component {
   
   _onEnd() {
      Vibration.vibrate([500, 200, 500]);
      clearInterval(timer);
      this.props.onEnd();
   }
   
   _init() {
   
      // Reset state
      const fulltime = this.props.time * 60;
      const state = { 
         fulltime: fulltime, 
         remaining: fulltime, 
         remainingPC: 100
      };
      if (this.state !== undefined) {
         this.setState(state);
      } else {
         this.state = state;
      }
   
      // Reset timer (if it's already running)
      if (timer) {
         clearInterval(timer)
      }
      
      // Set the timer going
      timer = setInterval(() => {
         this.setState(ps => {
            const remaining = ps.remaining - 1;
            
            if (remaining < 0) {
               this._onEnd();
            }
            
            return {
               remaining: remaining,
               remainingPC: ((remaining * 100) / fulltime)       
            }
         });
      }, 1000);
   }
   
   constructor(props) {
      super(props);
      this._init()      
   }
   
   componentWillReceiveProps(nextprops) {
      this._init();
   }
   
   render() {
      return (
         <View style={styles.timer}>
            
            <View style={{ 
               flex: (100 - this.state.remainingPC)
            }}></View>
            
            <View style={{ 
               flex: this.state.remainingPC,
               backgroundColor: 'rgba(255,255,255,0.6)'
            }}></View>
            
            <Image 
               style={styles.mask}
               source={masks[this.props.type]}
            />
            
         </View>
      );
   }
}

const styles = StyleSheet.create({
   
   timer: {
      width: 300,
      height: 280,
      backgroundColor: 'rgba(255,255,255,0.1)'
   },
   
   mask: {
      width: 300,
      height: 280,
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'contain'
   }
  
});