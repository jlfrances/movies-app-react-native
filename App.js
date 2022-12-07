import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getUpcomingMovies} from './services/services';

const App = () => {
  const [movie, setMovie] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcomingMovies()
      .then(movies => {
        setMovie(movies[0]);
      })
      .catch(err => {
        setError(err);
      });
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Title: {movie.original_title}</Text>
      <Text>Language: {movie.original_language}</Text>
      <Text>Release date: {movie.release_date}</Text>
      {error && <Text style={{color: 'red'}}>There was an error</Text>}
    </View>
  );
};

export default App;
