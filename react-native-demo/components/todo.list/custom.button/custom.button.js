import { Pressable, TouchableOpacity, Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

const CustomButton = ({ styles, onPress, children }) => {
   const defaultStyles = StyleSheet.create({
       wrapper : {
           alignItems: 'center',
           justifyContent: 'center',
           width: 50,
           height: 50,
           backgroundColor: '#282c34',
           color: '#fff',
           borderRadius: 5,
       },

   })

    return (
        <TouchableWithoutFeedback accessibilityRole={'button'} onPress={onPress}  >
            <View style={[defaultStyles.wrapper, styles]}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}
// const stylesCustom = StyleSheet.create({
//     text: {
//         color: styles.color,
//     }
// })
export default CustomButton
