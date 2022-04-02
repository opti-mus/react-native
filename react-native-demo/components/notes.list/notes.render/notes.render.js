import { useEffect, useState } from 'react'
import { storeData } from '../../../store/app.store'
import { NOTES_STORE } from '../../../constants/store.constants'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NotesItem from '../notes.item/notes.item'

const NotesRender = ( { notesList, setNotesList } ) => {
    const [selectedItems, setSelectedItems] = useState({})

    const renderList = () => {
        return <View style={styles.wrapperItems}>
            {notesList.map( ( el, index ) => (
                <NotesItem
                    key={el.id}
                    item={el}
                    setNotesList={setNotesList}
                    notesList={notesList}
                    indexItem={index}
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                />
            ) )}
        </View>
    }

    useEffect( () => {
        storeData( NOTES_STORE, notesList )
    }, [notesList] )

    return (
        <ScrollView
            style={styles.list}
            disableScrollViewPanResponder={true}
            snapToInterval={100}
            decelerationRate="normal"
            contentInsetAdjustmentBehavior="automatic"
        >
            {notesList.length ? renderList() : (
                <Text>Пока что нету заметок...</Text>
            )}
        </ScrollView>
    )
}
const styles = StyleSheet.create( {
    wrapperItems: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignContent: 'flex-end',
        // justifyContent: 'center',
        // marginLeft: -5,
        // marginRight: -5,
        flex: 1,
        width: '100%',
    },
    list: {

        // flexDirection: 'row',

        // flexWrap: 'wrap',
        // flex: 1,
    },
} )

export default NotesRender
