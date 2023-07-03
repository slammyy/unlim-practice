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
} from 'react-native';

import filter from 'lodash.filter';
import { useState, useEffect } from 'react';

const api = 'https://randomuser.me/api/?results=30';

const Contacts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetchData(api);
    }, [])

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            setFullData(json.results);
            setIsLoading(false);
            console.log(json.results);
        } catch (error) {
            setError(error);
            setIsLoading(false);
            console.log(error);
        }
    }

    const contains = ({ name, email }, query) => {
        const { first, last } = name;
        if (first.includes(query) || last.includes(query) || email.includes(query)) {
            return true;
        } else {
            return false;
        }
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) => {
            return contains(user, formattedQuery);
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
                data={data}
                keyExtractor={(item) => item.login.username}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image style={styles.itemImage} source={{ uri: item.picture.thumbnail }} />
                        <View>
                            <Text style={styles.itemName}>{item.name.first} {item.name.last}</Text>
                            <Text style={styles.itemCompany}>{item.email}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 10,
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
        marginLeft: 40,
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
