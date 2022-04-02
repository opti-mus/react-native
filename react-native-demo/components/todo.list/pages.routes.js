import * as React from 'react'
import {  NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import ListOpen from './list.open/list.open'
import { Provider } from 'react-redux'
import configureStore from '../../reducers/reduces.store'
import BottomTabs from '../pages/bottom.tabs/bottom.tabs'
import NoteOpen from '../notes.list/note.open/note.open'
import NoteOpenTitle from '../notes.list/note.open.title/note.open.title'


const Stack = createNativeStackNavigator()
const store = configureStore()


const PagesRoutes = () => {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    animation: 'slide_from_right',
                    headerStyle: { backgroundColor: '#282c34' },
                    headerTintColor: '#fff',
                }}>
                    <Stack.Screen
                        name="Home"
                        component={BottomTabs}
                        options={( { route } ) => ({
                            title: 'Заметки',
                            headerTitleAlign: 'center',
                            headerShown: false,
                        })}
                    />
                    <Stack.Screen
                        name="List"
                        component={ListOpen}
                        options={( { route } ) => ({
                            title: route.params.title,
                        })}
                    />
                    <Stack.Screen
                        name="Note"
                        component={NoteOpen}
                        options={( {  navigation, route } ) => ({
                            title: route.params.title,

                        })}

                    />
                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
    )
}

export default PagesRoutes
