import { Text, View, TextInput, Image } from 'react-native'
import { useState } from 'react'
import CustomButton from '../custom.button/custom.button'
import { CommonActions } from '@react-navigation/native'

const ListItemSettings = ({ route, navigation }) => {
    const { item, setTodoList } = route.params
    const [editValue, setEditValue] = useState( '' )

    const changeText = ( val ) => {
        setEditValue( val )
    }
    const confirmEdit = () => {
        // dispatch( confirmEditTodolistItem( item, editValue ) )
        setTodoList( ( prev ) => [
            ...prev,
            ...prev.filter((el) => {
                if (el.id === item.id) {
                    el.value = editValue
                }
            })
        ] )
        // navigation.setOptions({
        //     ...route.params,
        //     headerStyle: {
        //         backgroundColor: '#282c34',
        //     },
        //
        // });

    }
    return (
        <View>
            <TextInput value={editValue} onChangeText={changeText} placeholder={'Set new name'} />
            <CustomButton  onPress={confirmEdit}>
                <Text>Save</Text>
                {/*<Image*/}
                {/*    source={require( './icon-save.png' )}*/}
                {/*/>*/}
            </CustomButton>
        </View>
    )
}
export default ListItemSettings
