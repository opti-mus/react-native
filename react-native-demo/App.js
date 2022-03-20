import { StyleSheet, Button, View, StatusBar } from 'react-native'
import TodoList from './components/todo.list/todo.list'
import PagesRoutes from './components/todo.list/pages.routes'
import { randomID } from './components/todo.list/utils/utils'
import { useEffect } from 'react'
import { storeData } from './store/app.store'

export default function App() {

    return (
        <PagesRoutes />

    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: StatusBar.currentHeight + 20 || 60,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
} )
