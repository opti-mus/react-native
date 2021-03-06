import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import { useState } from 'react'
import { randomID } from '../../todo.list/utils/utils'


const NotesInput = ( { setNotesList } ) => {

    const [inputValue, setInputValue] = useState( '' )

    const inputHandler = ( value ) => {
        setInputValue( value )
    }
    const createItem = () => {
        if ( !inputValue.trim() ) {
            Alert.alert( 'Поле не должно быть пустым!' )
            return
        }

        const nextItemData = {
            id: randomID(),
            title: inputValue,
            value: '',
            complete: false,
            edit: false,
        }

        setNotesList( ( prev ) => ([...prev, nextItemData]) )
        setInputValue( '' )
    }

    return (
        <View style={styles.wrapper}>
            <TextInput value={inputValue}
                       blurOnSubmit={false}
                       onSubmitEditing={createItem}
                       onChangeText={inputHandler}
                       placeholder={'Введите название новой заметки'}
                       style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    iconText: {
        color: '#fff',
    },
    wrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        // paddingHorizontal: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#282c34',
        flex: 1,
        padding: 5,
    },
} )

export default NotesInput
