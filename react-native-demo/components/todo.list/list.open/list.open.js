import { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, StatusBar, LogBox, Image, Keyboard, Pressable } from 'react-native'
import ListInput from '../list.input/list.input'
import ListRender from '../list.render/list.render'
import CustomButton from '../custom.button/custom.button'
import { toggleModalDelete } from '../../../actions/todo.actions'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ListOpen = ( { route, navigation } ) => {
    const { item, setTodoList } = route.params
    const { id, subtasks } = item

    const [subtask, setSubtask] = useState( subtasks )
    const dispatch = useDispatch()


    useEffect( () => {
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === id ) {
                    el.subtasks = [...subtask]
                }
            } )]
        )
    }, [subtask] )

    useLayoutEffect( () => {

        navigation.setOptions( {
            ...route.params,
            title: item.value,
            headerRight: () => (
                <CustomButton styles={styles.editBtn} onPress={deleteItem}>
                    {/*<Image style={styles.icon} source={require( './icon-del.png' )}/>*/}
                    <Icon name="delete" size={24} color="#fff"/>
                </CustomButton>

            ),
            // headerSearchBarOptions: {
            //     placeholder: 'Найти заметку',
            //     textColor: '#fff',
            //     onChangeText: (event) => searchHandler(event.nativeEvent.text),
            //
            // }
        } )
    }, [navigation] )


    const searchHandler = ( value ) => {
        const filtered = subtask.filter( el => el.value.includes( value ) )
        setSubtask( filtered )
    }

    const deleteItem = () => {
        const deleteCallback = () => {
            setTodoList( ( prev ) => prev.filter( ( el ) => el.id !== item.id ) )
            navigation.popToTop()
        }

        dispatch( toggleModalDelete( {
            current: true,
            callback: deleteCallback,
        } ) )

    }
    return (
        <Pressable style={styles.subtasks} onPress={() => Keyboard.dismiss()}>
            <ListInput setTodoList={setSubtask}/>
            <ListRender todoList={subtask} setTodoList={setSubtask} navigation={navigation}/>
        </Pressable>
    )
}
const styles = StyleSheet.create( {
    icon: {
        width: 20,
        height: 20,
    },
    subtasks: {
        paddingTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 20,
        flex: 1,
    },
} )
export default ListOpen
