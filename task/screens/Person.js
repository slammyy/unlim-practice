import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const Person = ({ route }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <Text style={styles.name}>{route.params.name}</Text>
            <Text style={styles.info}>Компания: Unlim group</Text>
            <Text style={styles.info}>Должность: {route.params.position}</Text>
            <Text style={styles.info}>Отрасль: серверы</Text>
            <Text style={styles.info}>Выручка: 120000</Text>
            <Text style={styles.info}>Город проживания: {route.params.city}</Text>
            <Button
                title='Зарпостить контакт'
                onPress={() => {
                    navigation.navigate('Запрос контакта', {
                        name: route.params.name
                    })
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        textAlign: 'center',
        fontSize: 20,
        opacity: .8,
    }
});

export default Person;
