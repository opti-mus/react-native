import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Alert,
    Pressable, Button,
} from 'react-native'
import { useEffect, useLayoutEffect, useState } from 'react'
import CustomButton from '../custom.button/custom.button'
import ListItemAnimation from '../list.item.animation/list.item.animation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    editTodolistItem,
    removeTodolistItem,
    toggleModalDelete, confirmEditTodolistItem, cancelEditTodolistItem
} from '../../../actions/todo.actions'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CountSubtask from './components/countSubtask'

const ListItem = ( { todoList, item, setTodoList } ) => {
    const [editValue, setEditValue] = useState( item.value )

    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()


    const deleteSelected = () => {
        dispatch( toggleModalDelete( {
            current: true,
            callback: () => {
                setTodoList( ( prev ) => prev.filter( ( el ) => !el.selected ) )
                navigation.setOptions( {
                    ...route.params,
                    headerRight: () => {
                    },
                } )
            },
        } ) )

    }
    const editItem = () => {
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === item.id ) {
                    el.edit = true
                } else {
                    el.edit = false
                }
            } )
        ] )
    }
    const deleteItem = () => {
        dispatch( toggleModalDelete( {
            current: true,
            callback: () => setTodoList( ( prev ) => prev.filter( ( el ) => el.id !== item.id ) ),
        } ) )

    }
    const changeText = ( val ) => {
        setEditValue( val )
    }
    const confirmEdit = () => {
        if ( !editValue.length ) {
            Alert.alert( 'Поле не должно быть пустым!' )
            return
        }
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === item.id ) {
                    el.value = editValue
                    el.edit = false
                }
            } )
        ] )
    }
    const cancelEdit = () => {
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === item.id ) {
                    el.edit = false
                    setEditValue( el.value )
                }
            } ),
        ] )

    }
    const openList = () => {
        const isSelected = todoList.filter( el => el.selected )

        if ( isSelected.length ) {
            selectItem()
        } else {
            if ( route.name === 'Home' ) {
                navigation.navigate( 'List', { item, setTodoList, todoList } )
            } else {
                setTodoList( ( prev ) => [
                    ...prev,
                    ...prev.filter( ( el ) => {
                        if ( el.id === item.id ) {
                            el.complete = !el.complete
                        }
                    } ),
                ] )
            }
        }

    }
    const selectItem = () => {
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter( ( el ) => {
                if ( el.id === item.id ) {
                    el.selected = !el.selected
                }
            } ),
        ] )
    }

    useLayoutEffect( () => {
        const hasSelected = todoList.filter( ( el ) => el.selected )

        if ( route.name === 'Home' ) {
            if ( hasSelected.length ) {
                navigation.setOptions( {
                    ...route.params,
                    headerRight: () => (
                        <ListItemAnimation>
                            <CustomButton styles={styles.editBtn} onPress={deleteSelected}>
                                <Icon name="delete" size={24} color="#fff"/>
                            </CustomButton>
                        </ListItemAnimation>
                    ),
                } )
            } else {
                navigation.setOptions( {
                    ...route.params,
                    headerRight: () => {
                    },
                } )
            }

        }

    }, [todoList] )

    return (
        <ListItemAnimation removeItem={deleteItem}>
            <Pressable onPress={openList} onLongPress={selectItem}>
                <View style={[styles.wrapper, item.selected ? styles.itemSelected : null]}>
                    <View style={styles.defaultWrapper}>
                        <Text numberOfLines={2} style={[styles.itemValue, item.complete ? styles.itemComplete : null]}>{item.value}</Text>
                        <View style={styles.btnWrapper}>
                            <CountSubtask item={item}/>
                            <CustomButton styles={styles.editBtn} onPress={editItem}>
                                <Icon name="edit" size={20} color="#282c34"/>
                            </CustomButton>
                            {route.name !== 'Home' ?
                                <CustomButton styles={styles.editBtn} onPress={deleteItem}>
                                    <Icon name="delete-outline" size={24} color="#282c34"/>
                                </CustomButton>
                                : null}
                        </View>
                    </View>

                    {item.edit ? (
                        <View style={styles.editWrapper}>
                            <TextInput
                                autoFocus={true}
                                onSubmitEditing={confirmEdit}
                                style={styles.editInput}
                                value={editValue}
                                onChangeText={changeText}
                            />
                            <CustomButton styles={styles.editBtn} onPress={confirmEdit}>
                                <Icon name="check" size={20} color="#282c34"/>
                            </CustomButton>
                            <CustomButton styles={styles.editBtn} onPress={cancelEdit}>
                                <Icon name="close" size={20} color="#282c34"/>
                            </CustomButton>
                        </View>
                    ) : null}
                </View>
            </Pressable>
        </ListItemAnimation>
    )
}
const styles = StyleSheet.create( {
    subtaskCount: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#282c34',
        padding: 3,
        borderRadius: 3,
    },
    count: {
        fontSize: 10,
    },
    selectItem: {
        borderRadius: 50,
        width: 15,
        height: 15,
        margin: 10,
        zIndex: 9999,
    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
    editBtn: {
        width: 40,
        height: 30,
        backgroundColor: 'transparent',
    },
    wrapper: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 2,
    },
    itemSelected: {
        borderColor: '#0c6085',
        borderWidth: 2,
    },
    itemValue: {
        padding: 10,
        flex: 1,
    },
    itemComplete: {
        textDecorationLine: 'line-through',
    },
    defaultWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    editWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        position: 'absolute',
        borderRadius: 7,
        top: 0,
        left: 0,
        paddingLeft: 10,
        backgroundColor: '#fff',
        zIndex: 999,
    },
    editInput: {
        flex: 1,
    },
} )


export default ListItem
