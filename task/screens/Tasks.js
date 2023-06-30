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
                <Service text="Финансовые услуги" icon="credit-card" />
                <Service text="Контакты клуба" icon="id-card-o" />
                <Service text="Инвестиции" icon="bar-chart" />
                <Service text="Эдвайзеры" icon="group" />
                <Service text="Логистика" icon="truck" />
                <Service text="Продажи" icon="line-chart" />
                <Service text="Дэшборд" icon="pie-chart" />
                <Service text="Маркетинг" icon="shopping-cart" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        alignItems: 'center',
        gap: 30,
    },
});

export default Tasks;
