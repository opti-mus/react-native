import { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'

const ListItemAnimation = ( { children } ) => {
    const dropAnim = useRef( new Animated.Value( -20 ) ).current
    const fadeAnim = useRef( new Animated.Value( 0 ) ).current

    const defaultStyles = {
        startAnimation: {
            opacity: 0
        },
        endAnimation: {
            transform:
                [
                    { translateY: dropAnim },
                ],
            opacity: fadeAnim
        }
    }

    const fadeIn = () => {
        Animated.spring( fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        } ).start()
    }
    const dropDown = () => {
        Animated.spring( dropAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        } ).start()
    }

    useEffect( () => {
        dropDown()
        fadeIn()
    }, [] )

    return (
        <Animated.View
            style={[
                defaultStyles.animated,
                defaultStyles.endAnimation
            ]}
        >
            {children}
        </Animated.View>
    )
}



export default ListItemAnimation
