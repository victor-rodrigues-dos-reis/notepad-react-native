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
        const { navigation } = this.props;

        /*
            Foi escolhido fazer desse jeito para que quando o usuário atualizar alguma nota e voltar para essa tela, ela já apresente as modificações feitas
        */
        // Cria um listener para verificar se essa tela está aberta
        // Se sim, será carregado todas as notas
        this.focusListener = navigation.addListener('didFocus', () => {
            this.allNotes();
        });
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

    // Remove a anotação selecionada
    removeNote = (key) => {
        let notes = this.state.data;

        const index = notes.map(function(note) { return note['key']; }).indexOf(key);

        // Remove os dados da anotação do array
        notes.splice(index, 1);

        // Atualiza o state e o armazenamento local
        if (notes.length != 0)
            this.setState({data: notes});
        else {
            this.setState({data: null});
        }

        AsyncStorage.setItem('@ReactNotes:notes', JSON.stringify(notes));
    }

    // Diminui a mensagem da anotação cortando uma parte dela
    minifyMessage = (message) => {
        // Verifica se a mensagem excede 100 caracteres
        if (message.length > 100) {
            // Verifica se a mensagem tem quebra de linha
            if (message.includes("\n"))
                return message.split("\n")[0] + ' ...'

            return message.slice(0, 100) + '...'
        }
        
        return message
    }

    // Apresenta as anotações de acordo com os dados vindo da FlatList
    renderItem = ({item}) => {
        const minifiedMessage = this.minifyMessage(item.message);

        return (
            <TouchableOpacity
            style={styles.noteButton}
            onPress={() => {this.props.navigation.navigate('Note', {note: item})}}>
                <View style={styles.noteContainer}>
                    <Text style={styles.noteTitle}>{item.title}</Text>
                    <Text style={styles.noteDescription}>{minifiedMessage}</Text>
                </View>

                <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => {this.removeNote(item.key)}}>
                    <Text style={styles.textRemoveButton}>X</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };
    
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
        flexGrow: 1
    },

    noteButton: {
        marginVertical: 10
    },

    noteContainer: {
        backgroundColor: '#6b52ae',
        padding: 10,
        paddingRight: 40,
        paddingHorizontal: 15,
        borderRadius: 5,
    },

    noteTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: '#fff'
    },

    noteDescription: {
        color: '#eee',
        fontSize: 15,
    },

    actionButton: {
        backgroundColor: '#6b52ae',
        borderColor: "#eee",
        borderWidth: 2,
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

    removeButton: {
        backgroundColor: "#43346E",
        position: "absolute",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        top: 5,
        right: 5,
        borderRadius: 5,
    },
    
    textRemoveButton: {
        color: "#ddd",
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