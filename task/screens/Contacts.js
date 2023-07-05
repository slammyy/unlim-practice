import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    TextInput,
    ActivityIndicator,
    FlatList,
    Image,
    Dimensions,
    Pressable,
    RefreshControl,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import filter from 'lodash.filter';
import { useState, useEffect } from 'react';

const api = 'https://random-data-api.com/api/v2/users?size=30';

const Contacts = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetchData(api);
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        fetchData(api);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setFullData(json);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    }

    const contains = ({ first_name, last_name, address, employment }, query) => {
        const { city } = address;
        const { title } = employment;
        if (first_name.includes(query) ||
            last_name.includes(query) ||
            city.includes(query) ||
            title.includes(query)) {
            return true;
        } else {
            return false;
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filteredData = filter(fullData, (user) => {
            return contains(user, query);
        });
        setData(filteredData);
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Please check your internet connection
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <TextInput
                style={styles.search}
                placeholder='Search...'
                clearButtonMode='always'
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
            />
            <FlatList
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh}
                    />
                    }
                        data={data}
                        keyExtractor={(item) => item.uid}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Контакт', {
                                        name: item.first_name + ' ' + item.last_name,
                                        position: item.employment.title,
                                        city: item.address.city
                                    })
                                }}
                                style={styles.itemContainer}>
                                <Image style={styles.itemImage} source={{ uri: item.avatar }} />
                                <View >
                                    <Text style={styles.itemName}>{item.first_name} {item.last_name}</Text>
                                    <Text style={styles.itemCompany}>Unlim group</Text>
                                </View>
                            </Pressable>
                        )}
                    />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginTop: 10,
        marginBottom: 35,

    },
    search: {
        width: Dimensions.get('screen').width - 50,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        alignSelf: 'center',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 20,
        gap: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    itemName: {
        fontSize: 20,
        fontWeight: 500,
    },
    itemCompany: {
        fontSize: 15,
        opacity: .7,
    },
});

export default Contacts;
