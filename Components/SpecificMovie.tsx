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
    revenue: number | null,
    tagline: string,
    poster_path: string
}
interface similarMovieDataInterface{
    original_title: string,
    id: number,
    poster_path: string,
}

export default function SpecificMovie(props: props) {

    const [movieData, setMovieData] = useState<movieData | null | undefined>();
    const [similarMovieData, setSimilarMovieData] = useState<similarMovieDataInterface[] | null | undefined>(undefined);

    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/` + props.id + `?api_key=` + APIkey + `&language=en-US`)
        .then(possibleError => {
          if(possibleError.ok) return possibleError;
          throw new Error(possibleError.statusText);
        })
        .then(result => result.json()
        .then(data => 
          setMovieData({
            original_title: data.original_title,
            overview: data.overview,
            popularity: data.popularity,
            release_date: data.release_date,
            revenue: data.revenue || null,
            tagline: data.tagline,
            poster_path: data.poster_path
          })
        ))
        .catch(error => {
          setMovieData(null);
        })
      fetch('https://api.themoviedb.org/3/movie/' + props.id + '/similar?api_key=' + APIkey + '&language=en-US&page=1')
        .then(possibleError => {
          if(possibleError.ok) return possibleError;
          throw new Error(possibleError.statusText);
        })
        .then(result => result.json()
        .then(data => {
          let tempSimilarMovieData:similarMovieDataInterface[] = [];
          data.results.forEach((singleMovie: any) =>{
              tempSimilarMovieData.push({id: singleMovie.id, original_title: singleMovie.original_title, poster_path: singleMovie.poster_path});
          })
          setSimilarMovieData(tempSimilarMovieData);
        }
        ))
        .catch(err => {
          setSimilarMovieData(null);
        })
    },[])

    return (
        <View style={styles.container}>
          {movieData !== null && movieData !== undefined ? 
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
                defaultSource={require('../defaultPhoto.jpeg')}
              />
              <View style={styles.lowerInfo}>
                <Text style={styles.infoText}>Popularity rating: {movieData.popularity.toFixed(2)}</Text>
                {movieData.revenue !== null ? <Text style={styles.infoText}>Revenue: {(movieData.revenue).toLocaleString('en-US', {style: 'currency', currency: 'USD',})}({(movieData.revenue/1000000).toFixed(2)}m $)</Text>
                : <Text style={styles.infoText}>Revenue: No information/Not yet released</Text>}
                <Text style={{...styles.infoText, width: Dimensions.get('window').width, textAlign: 'center', paddingBottom: 0}}>Released/To be released on {movieData.release_date}</Text>
                <Text style={{...styles.infoText, marginTop: 20 }}>{movieData.overview}</Text>
              </View>
              <Text style={styles.similarMoviesHeader}>Similar movies</Text>
              <ScrollView style={styles.allSimilarMoviesContainer} horizontal={true}>

                {similarMovieData !== null && similarMovieData !== undefined ? similarMovieData.map((singleMovie: similarMovieDataInterface) => {
                  return <View key={singleMovie.id} style={styles.singleSmilarMovie}>
                    <Text style={styles.similarMovieTitle}>{singleMovie.original_title}</Text>
                    <Image
                        style={styles.similarMoviePoster}
                        source={{uri: `https://image.tmdb.org/t/p/w200/${singleMovie.poster_path}`}}
                        defaultSource={require('../defaultPhoto.jpeg')}
                    />
                    <TouchableOpacity style={styles.similarMovieInDepthButton} onPress={()=>{props.showPage(`${singleMovie.id}`);}}><Text style={{textAlign: 'center'}}>In depth</Text></TouchableOpacity>
                  </View>
                }) : <Text style={styles.infoText}>failed to load similar movies. Try again later.</Text>}

              </ScrollView>
                <TouchableOpacity style={styles.watchTrailerButton} onPress={()=>{props.showPage(`trailer-${props.id}`)}}><Text style={styles.watchTrailerText}>Watch trailer</Text></TouchableOpacity>
              </ScrollView>

                
            </View>
            : <>
            {movieData === null ? <Text style={styles.loadingText}>An error has occured. Please try later.</Text>
            : <Text style={styles.loadingText}>Loading...</Text>}
            </>}

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
  similarMovieInDepthButton: {
    backgroundColor: 'rgb(250, 255, 250)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 3,
    margin: 35,
    marginTop: 20,
    padding: 5,
    justifyContent: 'center',
  },
  watchTrailerButton: {
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
    marginBottom: 50,
    borderColor: 'black',
    shadowRadius: 3,
    shadowColor: 'gray',
    shadowOffset: {width: 3, height: 3}, 
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  watchTrailerText: {
    fontSize: 30,
    fontWeight: '600'
  },
  allSimilarMoviesContainer:{
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: 10,
    padding: 5,
    borderTopColor: 'black',
    borderTopWidth: 3
  },
  singleSmilarMovie: {
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 20
  },
  infoText: {
    margin: 5,
    width: Dimensions.get('window').width,
    textAlign: 'center',
    fontSize: 17
  },
  poster: {
    width: Dimensions.get('window').width,
    resizeMode: 'contain',
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'rgb(250, 255, 250)',
    marginBottom: 20
  },
  similarMoviePoster: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width * 0.5,
    height: 200
  },
  similarMovieTitle: {
    textAlign: 'center',
    maxWidth: Dimensions.get('window').width * 0.5,
    minHeight: 40,
  },
  similarMoviesHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10
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
