import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
    
import StartView from './Components/StartView';
import BrowseView from './Components/BrowseView';
import SpecificMovie from './Components/SpecificMovie';
import StatusBar from './Components/StatusBar';
export default function App() {

  const [page, showPage] = useState<string>('startView');

  useEffect(()=>{
  console.log(page)
  },[page])

  function Load(){
    if(page === 'startView') return <StartView showPage={showPage}/>;
    if(page === 'browseView') return <BrowseView showPage={showPage} />;

    return <SpecificMovie id={parseInt(page)} showPage={showPage} key={page} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {Load()}
     
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
