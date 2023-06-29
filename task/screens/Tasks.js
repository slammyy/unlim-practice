import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Service from '../companents/Service';

const Tasks = () => {
    return (
        <ScrollView>
            <StatusBar />
            <View style={styles.container}>
                <Service text="Трансферы AirBack" icon="plane" />
                <Service text="Рестораны" icon="coffee" />
                <Service text="Бизнес залы" icon="suitcase" />
                <Service text="Авиабилеты" icon="ticket" />
                <Service text="Отели" icon="hotel" />
                <Service text="Доктор" icon="stethoscope" />
                <Service text="Дети" icon="child" />
                <Service text="Фитнес" icon="soccer-ball-o" />
                <Service text="Юрист" icon="legal" />
                <Service text="Бухгалтер" icon="money" />
                <Service text="Стилист" icon="paint-brush" />
                <Service text="Афиша" icon="table" />
                <Service text="Гиды" icon="map" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
    },
});

export default Tasks;
