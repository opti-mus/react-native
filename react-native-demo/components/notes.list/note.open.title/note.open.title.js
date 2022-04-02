import { StyleSheet, Text, TextInput } from 'react-native'
import { useState } from 'react'

const NoteOpenTitle = ( { route, setEditTitle, editTitle }) => {
    return (
        <TextInput
            style={styles.titleInput}
            value={editTitle}
            onChangeText={setEditTitle}
            maxLength={25}
        />
    )
}
const styles = StyleSheet.create({
    titleInput : {
        flex: 1,
        fontSize: 17,
        color: '#fff',
    }
})
export default NoteOpenTitle
