import { Button, Dimensions, Keyboard, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import ListItem from './list.item/list.item'
import { useEffect, useLayoutEffect, useState } from 'react'
import ListInput from './list.input/list.input'
import ListRender from './list.render/list.render'
import { isEqual, randomID } from './utils/utils'
import ModalComponent from './modal/modal.component'
import { useSelector } from 'react-redux'
import { getData, storeData } from '../../store/app.store'
import { TODO_STORE } from '../../constants/store.constants'

const TodoList = ( ) => {
    const [loading, setLoading] = useState( false )
    const data = [
        {
            id: randomID(),
            value: 'Test value',
            complete: true,
            edit: false,
            color: '#282c34',
            subtasks: [
                {
                    id: randomID(),
                    value: 'subtask1',
                    complete: false,
                    edit: false,
                    color: '#282c34',
                },
                {
                    id: randomID(),
                    value: 'subtask2',
                    complete: false,
                    edit: false,
                    color: '#282c34',
                },
            ],
        },
        {
            id: randomID(),
            value: 'Test value3',
            complete: false,
            edit: false,
            color: '#282c34',
            subtasks: [],
        },
    ]

    const [todoList, setTodoList] = useState( data )

    useEffect( () => {
        getData(TODO_STORE)
            .then( res => {
                if ( !!res ) setTodoList( res )
            } )
            .then( () => setLoading( true ) )
    }, [] )


    return loading ? (
        <Pressable style={styles.todolist} onPress={() => Keyboard.dismiss()}>
            <ListInput setTodoList={setTodoList}/>
            <ListRender
                todoList={todoList}
                setTodoList={setTodoList}
            />
            <ModalComponent />
        </Pressable>
    ) : <></>
}

const styles = StyleSheet.create( {
    todolist: {
        paddingTop: StatusBar.currentHeight || 60,
        width: '100%',
        paddingHorizontal: 30,
        flex: 1,
    },
} )


export default TodoList
