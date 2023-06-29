import { StyleSheet, Text, View, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Service = (props) => {
    const navigation = useNavigation();
    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.navigate('Новый запрос')}
        >
            <View style={styles.frame}>
                <FontAwesome
                    name={props.icon}
                    size={30}
                    color="white"
                />
            </View>
            <Text style={styles.text}>{props.text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 4,
        width: 100,
        height: 130,
    },
    frame: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007aff',
        borderRadius: '15%',
        width: 70,
        height: 70,

    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    }
});

export default Service;
