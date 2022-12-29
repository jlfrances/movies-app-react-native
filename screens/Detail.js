import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  View
} from 'react-native';
// import StarRating from 'react-native-star-rating';
import { getMovie } from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
  const movieId = route.params.movieSelectedId;

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setIsLoaded(true);
    })
  }, [movieId]);

  return (
    <React.Fragment>
      {isLoaded && (<ScrollView>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={
            movieDetail.poster_path
              ? {uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
              : placeholderImage
          }
        />
        <View style={styles.container}>
          <View>
            <PlayButton style={styles.playButton} />
          </View>
          <Text style={styles.movieTitle}>{movieDetail.title}</Text>
          {movieDetail.genres && (<View style={styles.genresContainer}>
            {movieDetail.genres.map((genre) => {
              return (<Text style={styles.genre} key={genre.id}>{genre.name}</Text>);
            })}

          </View>)}
          {/* <StarRating
            maxStars={5}
            rating={movieDetail.vote_average / 2}
            /> */}
            <Text style={styles.overview}>{movieDetail.overview}</Text>
            <Text style={styles.releaseDate}>{'Release date: ' + dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}</Text>
        </View>
      </ScrollView>)}
      {!isLoaded && <ActivityIndicator size="large"/>}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
  },
  image: {
    height: height / 2.5,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold'
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold'
  },
  playButton: {
    position: 'absolute',
    top: -20,
    right: 20,
  },
});

export default Detail;
