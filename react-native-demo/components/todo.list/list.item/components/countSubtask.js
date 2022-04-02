import { StyleSheet, Text, View } from 'react-native'

const CountSubtask = ({ item }) => {

    const countCompleteSubtask = () => {
        return item.subtasks.filter(el => el.complete).length
    }

    return item.subtasks.length ? (
        <View style={styles.subtaskCount}>
            <Text style={styles.count}>{countCompleteSubtask()}</Text>
            <Text style={styles.count}>/</Text>
            <Text style={styles.count}>{item.subtasks.length || ''}</Text>
        </View>
    ) : null
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
})

export default CountSubtask
