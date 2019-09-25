import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';

export default class Main extends Component {
    // Título que aparecerá no header da tela
    static navigationOptions = {
        title: "Notepad"
    }

    state = {
        data: null
    }

    // Código que será executado assim que o component for montado
    componentDidMount() {
        this.allNotes();
    }
    
    // Pega todos as anotações (caso houver)
    allNotes = async () => {
        try {
            let data = await AsyncStorage.getItem('@ReactNotes:notes');

            if (data != null) {
                const json = JSON.parse(data);
                this.setState({data: json});
            }
        }
        catch (error) {
            //
        }
    }

    // Apresenta as anotações de acordo com os dados vindo da FlatList
    renderItem = ({item}) => (
        <TouchableOpacity style={styles.noteButton}>
            <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <Text style={styles.noteDescription}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );
    
    // Apresenta essa tela quando o "this.state.data" estiver vazio
    emptyDataList = () => (
        <View style={styles.containerNoNotes}>
            <Text style={styles.textNoNotes}>Não há Anotações</Text>
        </View>
    );

    // Apresentação da tela
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    renderItem={this.renderItem}
                    contentContainerStyle={styles.list}
                    data={this.state.data}
                    keyExtractor={(item) => item.key.toString()}
                    ListEmptyComponent={this.emptyDataList}
                />

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => {
                        this.props.navigation.navigate("Note",{
                            noteKey: new Date().getTime()
                        });
                    }}
                >
                    <Text style={styles.actionButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    };
};

// Estilos dos componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10
    },

    list: {
        padding: 20,
        flex: 1
    },

    noteButton: {
        marginVertical: 10
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
    },

    containerNoNotes: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center'
    },

    textNoNotes: {
        color: '#ccc',
        fontSize: 35
    }
});