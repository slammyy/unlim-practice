import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import Service from '../companents/Service';

const Tasks = () => {
    return (
        <ScrollView>
            <StatusBar />
            <View style={styles.container}>
                <Service 
                    text="Дэшборд бизнеса" 
                    window="Дэшборд бизнеса" 
                    icon="pie-chart" />
                <Service 
                    text="Продажи" 
                    window="Продажи" 
                    icon="line-chart" />
                <Service 
                    text="Маркетинг" 
                    window="Маркетинг" 
                    icon="shopping-cart" />
                <Service 
                    text="Бухгалтер" 
                    window='Новый запрос'
                    icon="money"/>
                <Service 
                    text="Юрист" 
                    window="Юрист" 
                    icon="legal" />
                <Service 
                    text="Логистика" 
                    window="Логистика" 
                    icon="truck" />
                <Service 
                    text="Финансовые услуги" 
                    window="Финансовые услуги" 
                    icon="credit-card" />
                <Service 
                    text="Контакты клуба" 
                    window='Контакты клуба'
                    icon="id-card-o"/>
                <Service 
                    text="Инвестиции" 
                    window="Инвестиции" 
                    icon="bar-chart" />
                <Service 
                    text="Эдвайзеры" 
                    window="Эдвайзеры" 
                    icon="group" />
                <Service 
                    text="Бизнес мероприятия" 
                    window="Бизнес мероприятия" 
                    icon="calendar" />
                <Service 
                    text="Трансферы" 
                    window="Трансферы" 
                    icon="plane" />
                <Service 
                    text="Бизнес залы" 
                    window="Бизнес залы" 
                    icon="suitcase" />
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
