import {
    StyleSheet,
    Text,
    TextInput,
    InputAccessoryView,
    SafeAreaView,
    Button,
    Pressable,
    Keyboard,
    Dimensions,
} from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

const Request = () => {
    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);
        console.log(result);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.p}>
                Задайте свой вопрос бухгалтеру - это бесплатно.
                На подготовку решения может уйти до 24 часов,
                но мы будем стараться вернуться с ответом как
                можно быстрее.
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Ваш вопрос *'
                multiline
                inputAccessoryViewID='inputID'
            />
            <InputAccessoryView nativeID='inputID'>
                <Button onPress={Keyboard.dismiss} title="Скрыть клавиатуру" />
            </InputAccessoryView>
            <Button
                title='Прикрепить файл'
                accessibilityLabel='Кнопка для отправки файла'
                onPress={pickDocument}
            />
            <Pressable
                style={({ pressed }) => [{
                    opacity: pressed ? 0.5 : 1
                }, styles.button]}>
                <Text style={styles.buttonText}>Новый запрос</Text>
            </Pressable>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    p: {
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        marginBottom: 20,
        width: Dimensions.get('screen').width - 50,
        height: 120,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    button: {
        position: 'absolute',
        bottom: 60,
        width: 350,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#0961d9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    }
});

export default Request;
