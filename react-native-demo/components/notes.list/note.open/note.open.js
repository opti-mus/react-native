import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import CustomButton from '../../todo.list/custom.button/custom.button'
import { useNavigation } from '@react-navigation/native'
import ListItemAnimation from '../../todo.list/list.item.animation/list.item.animation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NoteOpenTitle from '../note.open.title/note.open.title'
import * as React from 'react'
import { toggleModalDelete } from '../../../actions/todo.actions'
import { useDispatch } from 'react-redux'

const NoteOpen = ( { route } ) => {
    const { item, setNotesList } = route.params
    const [editValue, setEditValue] = useState( item.value )
    const [editTitle, setEditTitle] = useState( item.title )

    const navigation = useNavigation()
    const dispatch = useDispatch()

    useLayoutEffect( () => {
        navigation.setOptions( {
            headerTitle: props => <NoteOpenTitle
                route={route}
                editTitle={editTitle}
                setEditTitle={setEditTitle}/>,
            headerRight: () => (
                <ListItemAnimation>
                    <CustomButton onPress={deleteNotes}>
                        <Icon name="delete" size={24} color="#fff"/>
                    </CustomButton>
                </ListItemAnimation>
            ),
        } )
    }, [editTitle] )

    const deleteNotes = () => {
        dispatch( toggleModalDelete( {
            current: true,
            callback: () => {
                setNotesList( ( prev ) => prev.filter( ( el ) => el.id !== item.id ) )
                navigation.goBack()
            },
        } ) )
    }
    const confirmEdit = () => {
        if ( !editTitle.length ) {
            Alert.alert( 'Поле не должно быть пустым!' )
            return
        }
        setNotesList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === item.id ) {
                    el.value = editValue
                    el.title = editTitle
                }
            } )
        ] )
        navigation.goBack()
    }

    return (
        <Pressable style={styles.wrapperNote} onPress={() => Keyboard.dismiss()}>
            <TextInput
                multiline={true}
                value={editValue}
                onChangeText={setEditValue}
                style={styles.textareaInput}
                placeholder="Введите содержание заметки"
            />
            <CustomButton styles={styles.confirmBtn} onPress={confirmEdit}>
                <Text style={styles.confirmBtnText}>Изменить</Text>
            </CustomButton>
        </Pressable>
    )
}

const styles = StyleSheet.create( {
    textareaInput: {
        padding: 10,
        fontSize: 17,
    },
    wrapperNote: {
        flex: 1,
    },
    confirmBtn: {
        height: 40,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 0,
    },
    confirmBtnText: {
        fontSize: 18,
        color: '#fff',

    },
} )

export default NoteOpen
