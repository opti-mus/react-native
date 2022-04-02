import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import ListItemAnimation from '../../todo.list/list.item.animation/list.item.animation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../../todo.list/custom.button/custom.button'
import { toggleModalDelete } from '../../../actions/todo.actions'
import { useDispatch } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { customGap } from '../../todo.list/utils/utils'

const NotesItem = ( { item, setNotesList, notesList, indexItem, selectedItems, setSelectedItems  } ) => {

    const dispatch = useDispatch()
    const route = useRoute()
    const navigation = useNavigation()

    const deleteNotes = () => {
        dispatch( toggleModalDelete( {
            current: true,
            callback: () => {
                Object.values(selectedItems).forEach((item) => {
                    setNotesList((prev) => prev.filter( ( el ) => el.id !== item.id ))
                    setSelectedItems( {} )
                    navigation.setOptions( {
                        ...route.params,
                        headerRight: () => {
                        },
                    } )
                })
            },
        } ) )
    }
    const openNote = () => {
        const selected = Object.values(selectedItems).some(el => el?.selected )
        if(selected) {
            selectNote()
        } else {
            navigation.navigate('Note', { title : item.title, item, setNotesList })

        }
    }
    const selectNote = () => {
        if(selectedItems[item.id]?.selected) {
            setSelectedItems((prev) => ( { ...prev, [item.id] : { ...item, selected : false } } ))
        } else {
            setSelectedItems((prev) => ( { ...prev, [item.id] : { ...item, selected : true } } ))

        }

    }
    const isSelected = () => {
        return selectedItems[item.id]?.selected
    }

    useLayoutEffect(() => {
        const selected = Object.values(selectedItems).some(el => el?.selected )
        if ( selected ) {
            navigation.setOptions( {
                ...route.params,
                headerRight: () => (
                    <ListItemAnimation>
                        <CustomButton styles={styles.editBtn} onPress={deleteNotes}>
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

    }, [selectedItems])

    return (
        <ListItemAnimation>
            <Pressable onPress={openNote} onLongPress={selectNote}>
                <View style={ [
                    styles.item,
                    customGap(20, 3, indexItem),
                    isSelected() ? styles.selectItem : null,
                ]}>
                    <Text style={styles.itemText} numberOfLines={3}>{item.title}</Text>
                </View>
            </Pressable>
        </ListItemAnimation>
    )
}

const styles = StyleSheet.create( {
    selectItem : {
        borderColor: '#0c6085',
        borderWidth: 2,
    },
    deleteBtn: {
        width: 24,
        height: 24,
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 50,
        top: -10,
        right: 0,
        zIndex: 1,
    },
    item: {
        width: Math.round( Dimensions.get( 'window' ).width / 3 ) - 35,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 5,
        zIndex: 1,
    },
    itemText: {},
} )

export default NotesItem
