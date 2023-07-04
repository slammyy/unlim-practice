import {
    View,
    Text,
    StyleSheet,
    Button,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import * as DocumentPicker from 'expo-document-picker';
import * as MailComposer from 'expo-mail-composer';

const Person = ({ route }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <Text style={styles.name}>{route.params.name}</Text>
            <Text style={styles.info}>Компания: Unlim group</Text>
            <Text style={styles.info}>Должность: руководитель</Text>
            <Text style={styles.info}>Отрасль: серверы</Text>
            <Text style={styles.info}>Выручка: 120000</Text>
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
        fontSize: 20,
        opacity: .8,
    }
});

export default Person;
