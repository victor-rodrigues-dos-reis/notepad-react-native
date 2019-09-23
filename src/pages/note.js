import React, {Component} from 'react';
import {View, TextInput, StyleSheet, AsyncStorage} from 'react-native';

export default class Note extends Component {
    static navigationOptions = {
        title: "Título"
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputTitle}/>
                <TextInput 
                    style={styles.inputMessage} 
                    multiline={true} />
            </View>
        )
    }
};

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    
    inputTitle: {
        fontSize: 23,
        borderBottomColor: '#4B0CE8',
        color: '#3408A3',
        borderBottomWidth: 1,
        margin: 10,
    },

    inputMessage: {
        textAlignVertical: "top",
        color: '#333',
        fontSize: 15,
        flex: 1,
    }
});