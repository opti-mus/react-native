import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native'

import TodoList from './todo.list'
import ListOpenListOpen from './list.open/list.open'
import { Provider } from 'react-redux'
import configureStore from '../../reducers/reduces.store'
import NotesList from '../notes.list/notes.list'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

const store = configureStore()

function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// function MyTabs() {
//     return (
//         <Tab.Navigator screenOptions={{
//             animation :'slide_from_right',
//             headerTitleAlign: 'center',
//             headerStyle: { backgroundColor: '#282c34'},
//             headerTintColor: '#fff',
//         }}>
//             <Tab.Screen name="Todo list" component={TodoList} />
//             <Tab.Screen name="Notes list" component={NotesList} />
//         </Tab.Navigator>
//     );
// }

const PagesRoutes = () => {
    return (
        <Provider store={store}>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{
                    animation :'slide_from_right',
                    headerStyle: { backgroundColor: '#282c34'},
                    headerTintColor: '#fff',
                }} >
                    <Stack.Screen
                        name="Home"
                        component={TodoList}
                        options={({ route }) => ({
                            title: 'Заметки',
                            headerTitleAlign: 'center',
                        })}
                    />
                    <Stack.Screen
                        name="List"
                        component={ListOpenListOpen}
                        options={({ route }) => ({
                            title: route.params.title,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>

        </Provider>
    )
}

export default PagesRoutes
