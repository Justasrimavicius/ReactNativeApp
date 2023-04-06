import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
    
import StartView from './Components/StartView';
import BrowseView from './Components/BrowseView';
import SpecificMovie from './Components/SpecificMovie';
import StatusBar from './Components/StatusBar';
export default function App() {

  const [page, showPage] = useState<string>('startView');
  const [specificMovieId, setSpecificMovieId] = useState<number>(-1);

  useEffect(()=>{
    if(specificMovieId !== -1){
      showPage('specificMovie');
    }
  },[specificMovieId])

  useEffect(()=>{
    if(page === 'browseView'){
      setSpecificMovieId(-1);
    }
  },[page])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {page === 'startView' ? <StartView showPage={showPage}/>
      : <>
        {page === 'browseView' ? <BrowseView setSpecificMovieId={setSpecificMovieId} />
        : <SpecificMovie id={specificMovieId} showPage={showPage}/>
        }
        </>
      }
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
