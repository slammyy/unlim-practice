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

import React, { useState } from 'react';

import * as DocumentPicker from 'expo-document-picker';
import * as MailComposer from 'expo-mail-composer';

let inputValue = "";
let userAttachment = null;

const Request = () => {
    const [text, setText] = useState('Прикрепить файл');

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        userAttachment = await result.uri
        setText('Поменять файл');
    }

    const sendEmail = () => {
        if (MailComposer.isAvailableAsync) {
            if (inputValue && userAttachment) {
                MailComposer.composeAsync({
                    recipients: 'maksimsavincev@gmail.com',
                    subject: 'Вопрос клиента',
                    body: inputValue,
                    attachments: userAttachment
                });
            } else if (inputValue) {
                MailComposer.composeAsync({
                    recipients: 'maksimsavincev@gmail.com',
                    subject: 'Вопрос клиента',
                    body: inputValue,
                });
            }
        }
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
                onChangeText={newValue => inputValue = newValue}
            />
            <InputAccessoryView nativeID='inputID'>
                <Button onPress={Keyboard.dismiss} title="Скрыть клавиатуру" />
            </InputAccessoryView>
            <Button
                title={text}
                accessibilityLabel='Кнопка для отправки файла'
                onPress={pickDocument}
            />
            <Pressable
                onPress={sendEmail}
                style={({ pressed }) => [{
                    opacity: pressed ? 0.5 : 1
                }, styles.button]}>
                <Text style={styles.buttonText}>Отправить запрос</Text>
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
        height: 250,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    button: {
        position: 'absolute',
        bottom: 60,
        width: Dimensions.get('screen').width - 50,
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
