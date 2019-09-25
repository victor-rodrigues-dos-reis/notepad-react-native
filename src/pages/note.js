import React, {Component} from 'react';
import {View, TextInput, StyleSheet, AsyncStorage} from 'react-native';

export default class Note extends Component {
    // Título que aparecerá no header da tela
    static navigationOptions = {
        title: "Título"
    }

    state = {
        key: "",
        title:"",
        message: ""
    }

    // Código que será executado assim que o component for montado
    async componentDidMount() {
        // const {navigation} = this.props;
        // const noteKey = navigation.getParam('noteKey', 'NO-KEY');

        await this.initNoteStorage();
        await this.setNote();
    }

    // Cria o local onde será guardado as anotações (caso não esteja criado)
    initNoteStorage = async () => {
        try {
            let data = await AsyncStorage.getItem('@ReactNotes:notes');

            if (data == null) {
                await AsyncStorage.setItem('@ReactNotes:notes', '[]');
            }
        }
        catch (error) {
            await AsyncStorage.setItem('@ReactNotes:notes', '[]');
        }
    }

    // Cria a anotação vazia com uma chave própria e guarda no state
    setNote = async () => {
        let notes = await AsyncStorage.getItem('@ReactNotes:notes');
        notes = JSON.parse(notes)

        // Cria uma chave única para a anotação
        this.setState({key: new Date().getTime()});
        notes.push(this.state);

        await AsyncStorage.setItem('@ReactNotes:notes', JSON.stringify(notes));
    }

    // Atualiza a anotação no armazenamento local e no state sempre que for digitado algo
    updateNote = async (textInput, text) => {
        let notes = await AsyncStorage.getItem('@ReactNotes:notes');
        let key = this.state.key;
        notes = JSON.parse(notes);
        
        this.setState({[textInput]: text});
        
        // Procura no armazenamento local onde está o JSON que possui a chave solicitada
        // quando encontrado retorna o índice dele
        let index = notes.map(function(note) { return note['key']; }).indexOf(key);
            
        notes[index] = this.state;

        await AsyncStorage.setItem('@ReactNotes:notes', JSON.stringify(notes));
    }

    // Apresentação da tela
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputTitle}
                    onChangeText={(text) => this.updateNote('title', text)}/>
                <TextInput 
                    style={styles.inputMessage} 
                    multiline={true}
                    onChangeText={(text) => this.updateNote('message', text)}/>
            </View>
        )
    }
};

// Estilos dos componentes
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