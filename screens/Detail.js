import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  View,
  Modal,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {getMovie} from '../services/services';
import dateFormat from 'dateformat';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';
import Colors from '../styles/Colors';

const placeholderImage = require('../assets/images/placeholder.png');
const height = Dimensions.get('screen').height;

const Detail = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [movieDetail, setMovieDetail] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const movieId = route.params.movieSelectedId;

  useEffect(() => {
    getMovie(movieId).then(movieData => {
      setMovieDetail(movieData);
      setRating(movieData.vote_average / 2);
      setIsLoaded(true);
    });
  }, [movieId]);

  const showVideo = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {isLoaded && (
        <View>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={showVideo} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                style={styles.rating}
                rating={rating}
                onChange={setRating}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              <Text style={styles.releaseDate}>
                {'Release date: ' +
                  dateFormat(movieDetail.release_date, 'mmmm dS, yyyy')}
              </Text>
            </View>
          </ScrollView>
          <Modal supportedOrientations={['portrait', 'landscape']} animationType="slide" visible={modalVisible}>
            <View style={styles.videoModal}>
              <Video onClose={showVideo} />
            </View>
          </Modal>
        </View>
      )}
      {!isLoaded && <ActivityIndicator style={styles.spinner} size="large" />}
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
    height: height / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: Colors.grey,
  },
  genresContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
  },
  genre: {
    marginRight: 10,
    fontWeight: 'bold',
    color: Colors.black,
  },
  overview: {
    padding: 15,
    color: Colors.grey,
  },
  releaseDate: {
    fontWeight: 'bold',
    color: Colors.grey,
  },
  playButton: {
    position: 'absolute',
    top: -30,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    marginTop: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
