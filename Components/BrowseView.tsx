import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import APIkey from '../APIkey';
export default function StartView() {

    const [request, setRequest] = useState<string>('keanuReeves');

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/550?api_key=${APIkey}`)
          .then(response=>{response.json()
          .then(data => {console.log(data)
          })})
    },[])
  return (
    <View style={styles.container}>
        <View style={styles.apiCallButtons}>
            <TouchableOpacity onPress={()=>{setRequest('keanuReeves')}} style={styles.button}><Text style={styles.buttonText}>Keanu Reeves movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('mostPopular')}} style={styles.button}><Text style={styles.buttonText}>Most popular movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('mostRecent')}} style={styles.button}><Text style={styles.buttonText}>Most recent movies</Text></TouchableOpacity>
        </View>
        <View style={styles.dataDisplay}>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {

  },
  buttonText: {

  },
  apiCallButtons: {
    flex: 2,
    backgroundColor: 'gray',
  },
  dataDisplay: {
    flex: 10,
    backgroundColor: 'black',
    
  }


});
