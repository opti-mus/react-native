import TodoList from '../../todo.list/todo.list'
import NotesList from '../../notes.list/notes.list'
import * as React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'

const Tab = createBottomTabNavigator()


function MyTabBar( { state, descriptors, navigation } ) {
    const renderIcon = ( title, index ) => {
        const isFocused = state.index === index
        switch ( title ) {
            case 'todo' :
                return <Icon name="playlist-add-check" size={30} color={isFocused ? '#0c6085' : "#fff"} />
            case 'notes' :
                return <Icon name="menu-book" size={30} color={isFocused ? '#0c6085' : "#fff"} />
        }
    }
    return (
        <View style={styles.tabWrapper}>
            {state.routes.map( ( route, index ) => {
                const { options } = descriptors[route.key]

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit( {
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    } )

                    if ( !isFocused && !event.defaultPrevented ) {
                        navigation.navigate( { name: route.name, merge: true } )
                    }
                }

                const onLongPress = () => {
                    navigation.emit( {
                        type: 'tabLongPress',
                        target: route.key,
                    } )
                }

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tab,  { backgroundColor : isFocused ? '#15161a' : '#282c34' } ]}
                    >
                        {renderIcon(label, index)}
                    </TouchableOpacity>
                )
            } )}
        </View>
    )
}

function BottomTabs() {
    return (
        <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={{
                animation: 'slide_from_right',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#282c34' },
                headerTintColor: '#fff',
            }}>
            <Tab.Screen name="Home"
                        component={TodoList}
                        options={( { route } ) => ({
                            title: 'Список дел',
                            tabBarLabel: 'todo',
                        })}
            />
            <Tab.Screen name="Notes"
                        component={NotesList}
                        options={( { route } ) => ({
                            title: 'Заметки',
                            tabBarLabel: 'notes',
                        })}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    tabWrapper : {
        flexDirection: 'row',
        backgroundColor: '#282c34',
        height: 40,
    },
    tab: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        paddingVertical: 5,

    },
})

export default BottomTabs
