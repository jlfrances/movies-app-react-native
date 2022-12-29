import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PlayButton extends React.PureComponent {
    render() {
        return (
            <Pressable style={styles.button}>
                <Icon name="caret-forward-circle-outline" size={30} color={'white'}/>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    button: {
      alignContent: 'center',
      borderRadius: 50,
      width: 50,
      padding: 10,
      backgroundColor: '#4481FC',
    },

});

export default PlayButton;