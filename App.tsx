import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
    
import StartView from './Components/StartView';
import BrowseView from './Components/BrowseView';
import StatusBar from './Components/StatusBar';
export default function App() {
  const [browse, showBrowse] = useState<Boolean>(false);
  useEffect(()=>{
    console.log(browse)
  },[browse])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {browse === false ? <StartView showBrowse={showBrowse}/>
      : <BrowseView></BrowseView>}
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
});
