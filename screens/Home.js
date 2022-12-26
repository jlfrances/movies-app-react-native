import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovies,
  getPopularTV,
  getFamilyMovies,
  getDocumentaries,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

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
          setImages(moviesImages.slice(0, 10));

          setUpcomingMovies(upcomingMoviesData.slice(0, 10));
          setPopularMovies(popularMoviesData.slice(0, 10));
          setPopularTV(popularTVData.slice(0, 10));
          setFamilyMovies(familyMoviesData.slice(0, 10));
          setDocumentaries(documentariesData.slice(0, 10));
        },
      )
      .catch(err => {
        setError(err);
        console.log('error', err);
      });
  }, []);

  return (
    <React.Fragment>
      <ScrollView>
        {images && (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={images}
              autoplay={true}
              circleLoop={true}
              dotStyle={styles.sliderStyle}
              sliderBoxHeight={dimensions.height / 1.5}
            />
          </View>
        )}

        {popularMovies && (
          <View style={styles.sliderContainer}>
            <List title="Popular movies" content={popularMovies} />
          </View>
        )}

        {popularTV && (
          <View style={styles.sliderContainer}>
            <List title="Popular TV shows" content={popularTV} />
          </View>
        )}

        {familyMovies && (
          <View style={styles.sliderContainer}>
            <List title="Family movies" content={familyMovies} />
          </View>
        )}

        {documentaries && (
          <View style={styles.sliderContainer}>
            <List title="Documentaries" content={documentaries} />
          </View>
        )}
      </ScrollView>
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
