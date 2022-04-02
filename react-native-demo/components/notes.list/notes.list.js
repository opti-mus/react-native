import { Keyboard, Pressable, StatusBar, StyleSheet, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { randomID } from '../todo.list/utils/utils'
import { getData } from '../../store/app.store'
import { NOTES_STORE } from '../../constants/store.constants'
import NotesRender from './notes.render/notes.render'
import NotesInput from './notes.input/notes.input'

const NotesList = () => {
    const [loading, setLoading] = useState( false )
    const data = [
        {
            id: randomID(),
            title: 'first note',
            value: 'test1',
            complete: false,
            edit: false,
        },
        {
            id: randomID(),
            title: 'second note',
            value: 'test2',
            complete: false,
            edit: false,
        },
        {
            id: randomID(),
            title: 'third note',
            value: 'test3',
            complete: false,
            edit: false,
        },
        {
            id: randomID(),
            title: 'four note',
            value: 'test4',
            complete: false,
            edit: false,
        },
    ]

    const [notesList, setNotesList] = useState( data )

    useEffect( () => {
        getData( NOTES_STORE )
            .then( res => {
                if ( !!res ) setNotesList( res )
            } )
            .then( () => setLoading( true ) )
    }, [] )

    return loading ?
        <Pressable style={styles.todolist} onPress={() => Keyboard.dismiss()}>
            <NotesInput setNotesList={setNotesList}/>
            <NotesRender
                notesList={notesList}
                setNotesList={setNotesList}
            />
        </Pressable>
        : null
}

const styles = StyleSheet.create( {
    todolist: {
        paddingTop: StatusBar.currentHeight || 60,
        width: '100%',
        paddingHorizontal: 30,
        flex: 1,
    },
} )

export default NotesList
