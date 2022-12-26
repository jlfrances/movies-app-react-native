import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {getPopularMovies, getUpcomingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('useEffect ' + Date.now());
    getUpcomingMovies()
      .then(movies => {
        const moviesImages = [];
        movies.forEach(mov => {
          moviesImages.push(
            `https://image.tmdb.org/t/p/w500${mov.poster_path}`,
          );
        });
        setImages(moviesImages.slice(0, 10));
      })
      .catch(err => {
        setError(err);
        console.log('error', err);
      });

    getPopularMovies()
      .then(movies => {
        setPopularMovies(movies.slice(0, 10));
      })
      .catch(err => {
        console.log('error', err);
        setError(err);
      });
  }, []);

  return (
    <React.Fragment>
      <View style={styles.sliderContainer}>
        <SliderBox
          images={images}
          autoplay={true}
          circleLoop={true}
          dotStyle={styles.sliderStyle}
          sliderBoxHeight={dimensions.height / 1.5}
        />
      </View>
      <View style={styles.sliderContainer}>
        <List title="Popular movies" content={popularMovies} />
      </View>
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
