import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import APIkey from '../APIkey';
import YoutubePlayer from "react-native-youtube-iframe";
import { Dimensions } from 'react-native';


interface props{
  id: string,
  showPage: React.Dispatch<React.SetStateAction<string>>
}

export default function WatchTrailer(props: props) {
    const [officialTrailerId, setOfficialTrailerId] = useState<string>('');

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/` + props.id + `/videos?api_key=` + APIkey + `&language=en-US`)
          .then(result => { result.json()
          .then(data => {
            data.results.forEach((singleVideo: any, index: number) => {
                if(singleVideo.type === 'Trailer' && singleVideo.official === true && singleVideo.site === 'YouTube'){
                    setOfficialTrailerId(singleVideo.key);
                    return;
                } else if(index === data.results.length - 1){ // if no official trailers exist, show whichever one
                  setOfficialTrailerId(singleVideo.key);
                }
            })
          })
          })
    },[])
    return (

        <View style={styles.container}>
        <YoutubePlayer
          height={500}
          width={Dimensions.get('window').width}
          play={true}
          videoId={officialTrailerId}
         webViewProps={{
            //  allowsInlineMediaPlayback: false,
            //  androidLayerType:'none',
            //  androidHardwareAccelerationDisabled:false,
            //  mixedContentMode:'always',
            //  javaScriptEnabled:true,
            //  domStorageEnabled:true,
            //  startInLoadingState:true,
            //  originWhitelist:["*"],
            //  style:{flex:1},
 
         }}
        
         forceAndroidAutoplay
        />
      <TouchableOpacity onPress={()=>{props.showPage(props.id)}} style={styles.button}><Text style={styles.buttonText}>Go back</Text></TouchableOpacity>
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
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold'
  }
});
