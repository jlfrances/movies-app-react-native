import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTV,
  getFamilyMovies,
  getDocumentaries,
} from '../services/services';
import List from '../components/List';
import Error from '../components/Error';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingMoviesImages, setUpcomingMoviesImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = () => {
    return Promise.all([
      getUpcomingMovies(),
      getPopularMovies(),
      getPopularTV(),
      getFamilyMovies(),
      getDocumentaries(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          upcomingMoviesData,
          popularMoviesData,
          popularTVData,
          familyMoviesData,
          documentariesData,
        ]) => {
          const moviesImages = [];
          upcomingMoviesData.forEach(mov => {
            moviesImages.push(
              `https://image.tmdb.org/t/p/w500${mov.poster_path}`,
            );
          });
          setUpcomingMoviesImages(moviesImages.slice(0, 10));

          setUpcomingMovies(upcomingMoviesData.slice(0, 10));
          setPopularMovies(popularMoviesData.slice(0, 10));
          setPopularTV(popularTVData.slice(0, 10));
          setFamilyMovies(familyMoviesData.slice(0, 10));
          setDocumentaries(documentariesData.slice(0, 10));
        },
      )
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {isLoaded && !error && (
        <ScrollView>
          {upcomingMoviesImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={upcomingMoviesImages}
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
                sliderBoxHeight={dimensions.height / 1.5}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.sliderContainer}>
              <List navigation={navigation} title="Popular movies" content={popularMovies} />
            </View>
          )}

          {popularTV && (
            <View style={styles.sliderContainer}>
              <List navigation={navigation} title="Popular TV shows" content={popularTV} />
            </View>
          )}

          {familyMovies && (
            <View style={styles.sliderContainer}>
              <List navigation={navigation} title="Family movies" content={familyMovies} />
            </View>
          )}

          {documentaries && (
            <View style={styles.sliderContainer}>
              <List navigation={navigation} title="Documentaries" content={documentaries} />
            </View>
          )}
        </ScrollView>
      )}

      {!isLoaded && <ActivityIndicator size="large" />}

      {error && <Error />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
});

export default Home;
