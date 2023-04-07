import { createRef, LegacyRef, RefObject, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ScrollView } from 'react-native';
import APIkey from '../APIkey';

interface movieDataInterface{
    original_title: string,
    poster_path: string | null,
    popularity: number,
    vote_average: number,
    id: number
}

interface props{
    showPage: React.Dispatch<React.SetStateAction<string>>
}

export default function BrowseView(props: props) {

    const [request, setRequest] = useState<string>('mostPopular');
    const [movieData, setMovieData] = useState<movieDataInterface[] | null | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);

    async function movieFetch(link: string){
      fetch(link)
      .then(possibleError => {
        if(possibleError.ok) return possibleError;
        throw new Error(possibleError.statusText);
      })
      .then(response => response.json()
      .then(data => {
        let movieDataTemp:  movieDataInterface[] = [];
        
        data.results.forEach((singleMovie: any)=>{ // a lot of information about a movie, no need to specify all of it
          movieDataTemp.push({
              original_title: singleMovie.original_title,
              poster_path: singleMovie.poster_path,
              popularity: singleMovie.popularity,
              vote_average: singleMovie.vote_average,
              id: singleMovie.id
          })
        })
        setMovieData(movieDataTemp);
      })
    )
    .catch(err => {
      setMovieData(null)
    })
    }

    useEffect(()=>{
        if(request === 'mostPopular'){
            movieFetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`)
        } else if(request === 'topRated'){
            movieFetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`)
        } else {
            movieFetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIkey}&language=en-US&page=1`)
        }
    },[request])


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        button: {
          width: Dimensions.get("window").width * 0.3,
          backgroundColor: 'rgb(250, 255, 250)',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 5,
          margin: 5,
          padding: 5,
          height: 50,
          justifyContent: 'center',
        },
        inDepthButton: {
          marginTop: 100,
          backgroundColor: 'rgb(240, 255, 250)',
          borderColor: 'black',
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
          width: Dimensions.get("window").width * 0.3,
        },
        apiCallButtons: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get("window").width,
          margin: 10,
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        },
        movieView: {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height * 0.5,
          backgroundColor: 'rgb(245, 255, 250)',
          marginTop: 3,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'gray',
          borderWidth: 1
        },
        movieViewInformation: {
          width: Dimensions.get('window').width * 0.4,
          height: Dimensions.get('window').height * 0.4,
      
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        },
        poster: {
          width: Dimensions.get('window').width * 0.6,
          resizeMode: 'contain',
          height: Dimensions.get('window').height * 0.5,
        },
        movieName: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center'
        }
      });
      

  return (
    <View style={styles.container}>
        <View style={styles.apiCallButtons}>
            <TouchableOpacity onPress={()=>{setRequest('upcomming')}} style={request==='upcomming' ? {...styles.button, borderWidth: 2} : {...styles.button}}><Text style={{textAlign: 'center'}}>Upcomming movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('mostPopular')}} style={request==='mostPopular' ? {...styles.button, borderWidth: 2} : {...styles.button}}><Text style={{textAlign: 'center'}}>Most popular movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('topRated')}} style={request==='topRated' ? {...styles.button, borderWidth: 2} : {...styles.button}}><Text style={{textAlign: 'center'}}>Top rated movies</Text></TouchableOpacity>
        </View>
        <View style={{flex: 7}}>  
        <ScrollView>
            {movieData !== null && movieData !== undefined ? movieData.map((singleMovie: movieDataInterface)=>{
             return <View style={styles.movieView} key={singleMovie.id}>
                      <View style={styles.movieViewInformation}>
                        <Text style={styles.movieName}>{singleMovie.original_title}</Text>
                        <Text>Id: {singleMovie.id}</Text>
                        <Text style={{textAlign: 'center'}}>Popularity rating: {singleMovie.popularity}</Text>
                        <Text style={{textAlign: 'center'}}>Vote average: {singleMovie.vote_average}</Text>
                        <TouchableOpacity style={styles.inDepthButton} onPress={()=>{props.showPage(`${singleMovie.id}`)}}><Text style={{textAlign: 'center', fontWeight: 'bold'}}>In depth</Text></TouchableOpacity>
                      </View>
                      <Image
                        style={styles.poster}
                        source={{uri: `https://image.tmdb.org/t/p/w200/${singleMovie.poster_path}`}}
                        defaultSource={require('../defaultPhoto.jpeg')}
                      />
                    </View>
            }) : 
            <>
            {movieData === null ? <Text style={{fontSize: 20, fontWeight: '500'}}>An error has occured fetching data</Text>
            : <Text style={{fontSize: 20, fontWeight: '500'}}>Loading...</Text>}
            </>}
        </ScrollView>
        </View>

    </View>
  );
}