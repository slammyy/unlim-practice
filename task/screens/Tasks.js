import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Service from '../companents/Service';

const Tasks = () => {
    return (
        <ScrollView>
            <StatusBar />
            <View style={styles.container}>
                <Service text="Дэшборд бизнеса" icon="pie-chart" />
                <Service text="Продажи" icon="line-chart" />
                <Service text="Маркетинг" icon="shopping-cart" />
                <Service text="Бухгалтер" icon="money" />
                <Service text="Юрист" icon="legal" />
                <Service text="Логистика" icon="truck" />
                <Service text="Финансовые услуги" icon="credit-card" />
                <Service text="Контакты клуба" icon="id-card-o" />
                <Service text="Инвестиции" icon="bar-chart" />
                <Service text="Эдвайзеры" icon="group" />
                <Service text="Бизнес мероприятия" icon="calendar" />
                <Service text="Трансферы AirBack" icon="plane" />
                <Service text="Бизнес залы" icon="suitcase" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 25,
    },
});

export default Tasks;
