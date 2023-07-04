import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const Person = ({ route }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.name}>{route.params.name}</Text>
            <Text style={styles.info}>Компания: Unlim practice</Text>
            <Text style={styles.info}>Должность: руководитель</Text>
            <Text style={styles.info}>Отрасль: серверы</Text>
            <Text style={styles.info}>Выручка: 120000</Text>
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
