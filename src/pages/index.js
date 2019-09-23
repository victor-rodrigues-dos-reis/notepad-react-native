import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Notepad"
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.noteButton}>
                    <View style={styles.noteContainer}>
                        <Text style={styles.noteTitle}>Título</Text>
                        <Text style={styles.noteDescription}>Descrição</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                        this.props.navigation.navigate("Note");
                    }}
                >
                    <Text style={styles.actionButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10
    },

    noteButton: {

    },

    noteContainer: {
        backgroundColor: '#4B0CE8',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },

    noteTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },

    noteDescription: {
        color: '#eee',
        fontSize: 15,
    },

    actionButton: {
        backgroundColor: '#4B0CE8',
        position: 'absolute',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-end",
        height: 70,
        width: 70,
        bottom: 10,
        right: 10
    },

    actionButtonText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#fff',
    }
});