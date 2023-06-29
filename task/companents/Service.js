import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
} from 'react-native';
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
                    size={50}
                    color="white"
                />
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    frame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: '#007aff',
        borderRadius: '15%',
        width: Dimensions.get('screen').width - 50,
        height: 100,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    }
});

export default Service;
