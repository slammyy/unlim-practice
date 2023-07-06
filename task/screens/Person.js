import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Person = ({ route }) => {
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={styles.view}>
                <View style={styles.head}>
                    <Image
                        source={{ uri: route.params.avatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{route.params.name}</Text>
                </View>
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <Ionicons name="information-circle-outline" size={24} color="black" />
                        <Text style={styles.mainInfo}>Основная информация</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Компания</Text>
                        <Text style={styles.infoContent}>Unlim group</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Отрасль</Text>
                        <Text style={styles.infoContent}>{route.params.position}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Выручка</Text>
                        <Text style={styles.infoContent}>$1200</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Город проживания</Text>
                        <Text style={styles.infoContent}>{route.params.city}</Text>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            navigation.navigate('Запрос контакта', {
                                name: route.params.name
                            })
                        }}
                    >
                        <Text style={styles.buttonText}>Запросить контакт</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        gap: 10,
    },
    head: {
        paddingVertical: 20,
        width: '100%',
        alignItems: 'center',
        gap: 20,
        backgroundColor: 'white',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    name: {
        textAlign: 'center',
        fontSize: 45,
        fontWeight: 'bold',
    },
    info: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20,
        backgroundColor: 'white',
    },
    mainInfo: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    infoTitle: {
        fontSize: 22,
        marginBottom: 2,
    },
    infoContent: {
        fontSize: 17,
        opacity: .7,
    },
    buttonArea: {
        paddingHorizontal: 30,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
    },
    button: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#0961d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default Person;
