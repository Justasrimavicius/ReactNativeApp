import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ScrollView } from 'react-native';
import APIkey from '../APIkey';
import Icon from 'react-native-vector-icons/FontAwesome';

interface props{
  id: number,
  showPage: React.Dispatch<React.SetStateAction<string>>
}

interface movieData{
    original_title: string,
    overview: string,
    popularity: number,
    release_date: string,
    revenue: number,
    tagline: string,
    poster_path: string
}

export default function SpecificMovie(props: props) {
    const [movieData, setMovieData] = useState<movieData | null>(null);
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/` + props.id + `?api_key=` + APIkey + `&language=en-US`)
          .then(result => {result.json()
          .then(data => 
            setMovieData({
                original_title: data.original_title,
                overview: data.overview,
                popularity: data.popularity,
                release_date: data.release_date,
                revenue: data.revenue,
                tagline: data.tagline,
                poster_path: data.poster_path
            })
            )})
    },[])

    return (
        <View style={styles.container}>
            {movieData !== null ? 
            <View style={{}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Icon name="arrow-left" size={20} color="black" style={{marginLeft: 10, alignSelf: 'center'}} onPress={() => {props.showPage('browseView')}}/>
                    <Text style={{...styles.original_title}}>{movieData.original_title}</Text>
                    <Icon name="arrow-left" size={20} color="rgba(0,0,0,0)" style={{marginRight: 10, alignSelf: 'center'}} />

                </View>
                <ScrollView>
                    <Image
                        style={styles.poster}
                        source={{uri: `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}}
                    />
                    <View style={styles.lowerInfo}>
                        <Text style={styles.infoText}>Popularity rating: {movieData.popularity.toFixed(2)}</Text>
                        <Text style={styles.infoText}>Revenue: {(movieData.revenue).toLocaleString('en-US', {style: 'currency', currency: 'USD',})}({(movieData.revenue/1000000).toFixed(2)}m $)</Text>
                        <Text style={{...styles.infoText, width: Dimensions.get('window').width, borderColor: 'black', borderBottomWidth: 1, textAlign: 'center', paddingBottom: 0}}>Released on {movieData.release_date}</Text>
                        <Text style={{...styles.infoText, marginTop: 20 }}>{movieData.overview}</Text>
                    </View>
                    <View>
                        {/* Recomended similar movies here */}
                    </View>
                </ScrollView>

                
            </View>
            : <Text style={styles.loadingText}>Loading...</Text>}
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
  loadingText: {
    fontSize: 20
  },
  infoText: {
    margin: 5,
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },
  poster: {
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'rgb(250, 255, 250)',
    marginBottom: 20
  },
  original_title: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    fontWeight: 'bold',
    maxWidth: Dimensions.get('window').width * 0.7
  },
  movieInformation: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  lowerInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
