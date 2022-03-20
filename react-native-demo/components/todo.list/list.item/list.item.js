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
import { useRoute } from '@react-navigation/native'
import { connect, useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    editTodolistItem,
    removeTodolistItem,
    toggleModalDelete, confirmEditTodolistItem, cancelEditTodolistItem
} from '../../../actions/todo.actions'

const ListItem = ( { navigation, todoList, item, setTodoList } ) => {
    const [editValue, setEditValue] = useState( item.value )

    const route = useRoute()
    const dispatch = useDispatch()

    const deleteCallback = () => {
        setTodoList( ( prev ) => prev.filter( ( el ) => el.id !== item.id ) )


    }
    const deleteSelected = () => {
        setTodoList( ( prev ) => prev.filter( ( el ) => !el.selected ) )
    }
    const editItem = () => {
        // dispatch(editTodolistItem(item))
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
            callback: deleteCallback,
        } ) )

    }
    const changeText = ( val ) => {
        setEditValue( val )
    }
    const confirmEdit = () => {
        // dispatch( confirmEditTodolistItem( item, editValue ) )
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
        // dispatch( cancelEditTodolistItem( item ) )
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
        const isSelected = todoList.filter(el => el.selected)

        if(isSelected.length) {
            selectItem()
        } else {
            if ( route.name === 'Home' ) {
                navigation.navigate( 'List', { item, setTodoList } )
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
                        <Button onPress={deleteSelected} title="Delete"/>
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
        <ListItemAnimation>
            <Pressable onPress={openList} onLongPress={selectItem}>
                <View style={[styles.wrapper, item.selected ? styles.itemSelected : null]}>
                    <View style={styles.defaultWrapper}>
                        <Text style={styles.itemValue}>{item.value}</Text>
                        <View style={styles.btnWrapper}>
                            <CustomButton styles={styles.editBtn} onPress={editItem}>
                                <Image
                                    style={styles.icon}
                                    source={require( './icon-edit.png' )}
                                />
                            </CustomButton>
                            <CustomButton styles={styles.editBtn} onPress={deleteItem}>
                                <Image style={styles.icon} source={require( '../list.open/icon-del.png' )}/>
                            </CustomButton>
                            {/*{item.selected ? (*/}
                            {/*    <CustomButton styles={[styles.selectItem]} onPress={selectItem}/>*/}
                            {/*) : null}*/}
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
                                <Image
                                    style={styles.icon}
                                    source={require( './icon-save.png' )}
                                />
                            </CustomButton>
                            <CustomButton styles={styles.editBtn} onPress={cancelEdit}>
                                <Image
                                    style={styles.icon}
                                    source={require( './icon-cancel.png' )}
                                />
                            </CustomButton>
                        </View>
                    ) : null}
                </View>
            </Pressable>
        </ListItemAnimation>
    )
}
const styles = StyleSheet.create( {
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

const mapStateToProps = ( state ) => {
    const { modalDelete } = state
    return { modalDelete }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators( {
        toggleModalDelete,
        removeTodolistItem,
        editTodolistItem,
    }, dispatch )
)

// export default connect(mapStateToProps,mapDispatchToProps)(ListItem);
export default ListItem
