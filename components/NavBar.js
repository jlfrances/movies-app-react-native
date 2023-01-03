import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../themes/Colors';

const propTypes = {
  main: PropTypes.bool,
};

const defaultProps = {
  main: false,
};

class NavBar extends React.PureComponent {
  render() {
    const {navigation, main} = this.props;
    return (
      <SafeAreaView>
        {main 
        ? (<View style={styles.mainNavBar}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo/playstore.png')} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}>
              <Icon name={'search-outline'} size={30} color={Colors.white} />
            </TouchableOpacity>
        </View>) 
        : <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name={'chevron-back'} size={40} color={Colors.white} />
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  mainNavBar: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
