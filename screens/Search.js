import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Error from '../components/Error';
import { search } from '../services/services';

const Search = ({navigation}) => {
  const [text, onChangeText] = React.useState();
  const [searchResults, setSearchResults] = React.useState();
  const [error, setError] = React.useState(false);
  const onSubmit = (query) => {
    Promise.all([
      search(query, 'movie'),
      search(query, 'tv')
    ])
    .then(([movies, tvShows]) => {
      const allResults = [...movies, ...tvShows];
      setSearchResults(allResults);
    })
    .catch(() => {
      setError(true);
    });
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder={'Search movie or TV show'}
            />
          </View>
          <TouchableOpacity onPress={() => {onSubmit(text)}}>
            <Icon name={'search-outline'} size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchItems}>
          {/* Has results */}
          {searchResults && searchResults.length > 0 && (
            <FlatList
              numColumns={3}
              data={searchResults}
              renderItem={({item}) => (
                <Card navigation={navigation} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          )}
          
          {/* No results */}
          {searchResults && searchResults.length > 0 && (
            <View>
              <Text>{'No results :O'}</Text>
            </View>
          )}

          {/* Error */}
          {error && <Error />}
          
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 8,
  },
  container: {
    padding: 10,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    flexBasis: 'auto',
    flexGrow: 1,
    paddingRight: 8,
  },
  searchItems: {
    padding: 5,
  },
});

export default Search;
