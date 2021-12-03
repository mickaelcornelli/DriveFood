import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {IconButton, TextInput, FAB} from 'react-native-paper'
import HeaderNotes from './headerNotes';

function AddNotes(navigation){
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')

    function onSaveNote(){
        navigation.navigation.state.params.addNotes({noteTitle, noteDescription})
        /*let data = {
            title : noteTitle,
            description : noteDescription
        }*/
        navigation.navigation.goBack()
    }
    //console.log("NAVIGATION",navigation)
    return(
        <>
            <HeaderNotes titleText = 'Ajouter une note'/>
            <FAB
            style = {styles.iconButton}
            small
            icon = "close"
            onPress = {()=>navigation.navigation.goBack()}
            
            />

            <View style={styles.container}>
                <TextInput
                    label = "Titre de la note"
                    value = {noteTitle}
                    mode = 'outlined'
                    onChangeText = {setNoteTitle}
                    style = {styles.title}
                />
                <TextInput
                    label = "Description de la note"
                    value = {noteDescription}
                    mode = 'outlined'
                    onChangeText = {setNoteDescription}
                    multiline = {true}
                    style = {styles.text}
                    scrollEnabled = {true}
                    returnKeyLabel = 'done'
                    blurOnSubmit = {true}
                />
                <FAB
                    style = {styles.fab}
                    small
                    icon = "check"
                    disabled = {noteTitle == '' ? true : false}
                    onPress = {()=> onSaveNote()}
                    
                />                
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    iconButton: {
        
        backgroundColor: 'red',
        position: 'absolute',
        right: 0,
        top: 30,
        margin: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    text: {
        height: 300,
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0
    }
})

export default AddNotes