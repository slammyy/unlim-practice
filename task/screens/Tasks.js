import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Service from '../companents/Service';

const Tasks = () => {
    return (
        <ScrollView>
            <StatusBar />
            <View style={styles.container}>
                <Service text="Трансферы AirBack" icon="plane" />
                <Service text="Бизнес залы" icon="suitcase" />
                <Service text="Юрист" icon="legal" />
                <Service text="Бухгалтер" icon="money" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignItems: 'center',
        gap: 30,
    },
});

export default Tasks;
