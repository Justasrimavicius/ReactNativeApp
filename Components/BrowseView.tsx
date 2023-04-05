import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, ScrollView } from 'react-native';
import APIkey from '../APIkey';

interface movieDataInterface{
    original_title: string,
    poster_path: string | null,
    popularity: number,
    id: number
}

export default function StartView() {

    const [request, setRequest] = useState<string>('keanuReeves');
    const [movieData, setMovieData] = useState<movieDataInterface[] | null>(null);

    useEffect(()=>{
        if(request === 'mostPopular'){
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`)
            .then(response=>{response.json()
            .then(data => {
                let movieDataTemp:  movieDataInterface[] = [];
                
                data.results.forEach((singleMovie: any)=>{ // a lot of information about a movie, no need to specify all of it
                    
                    movieDataTemp.push({
                        original_title: singleMovie.original_title,
                        poster_path: singleMovie.poster_path,
                        popularity: singleMovie.popularity,
                        id: singleMovie.id
                    })
                })
                setMovieData(movieDataTemp);

            })})
        } else if(request === 'mostRecent'){
            console.log('recent')
        } else {
            console.log('KEANU')
        }

    },[request])
  return (
    <View style={styles.container}>
        <View style={styles.apiCallButtons}>
            <TouchableOpacity onPress={()=>{setRequest('keanuReeves')}} style={styles.button}><Text style={styles.buttonText}>Keanu Reeves movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('mostPopular')}} style={styles.button}><Text style={styles.buttonText}>Most popular movies</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{setRequest('mostRecent')}} style={styles.button}><Text style={styles.buttonText}>Most recent movies</Text></TouchableOpacity>
        </View>
        <View style={{flex: 7}}>  
        <ScrollView>
            {movieData?.map((singleMovie: movieDataInterface)=>{
                return <View style={styles.movieView} key={singleMovie.id}>
                    <View style={styles.movieViewInformation}>
                        <Text style={styles.movieName}>{singleMovie.original_title}</Text>
                        <Text>Id: {singleMovie.id}</Text>
                        <Text style={{textAlign: 'center'}}>Popularity rating: {singleMovie.popularity}</Text>
                    </View>
                    <Image
                        style={styles.poster}
                        source={{uri: `https://image.tmdb.org/t/p/w200/${singleMovie.poster_path}`}}
                    />
                    </View>
            })}
        </ScrollView>
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
    width: Dimensions.get("window").width * 0.3,
    backgroundColor: 'rgb(250, 255, 250)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  buttonText: {
    textAlign: 'center',
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
    alignItems: 'center'
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
