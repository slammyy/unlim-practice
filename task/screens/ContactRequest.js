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

import React from 'react';

import * as MailComposer from 'expo-mail-composer';

let inputValue = "";

const ContactRequest = ({ route }) => {
    const sendEmail = () => {
        if (MailComposer.isAvailableAsync || inputValue) {
            MailComposer.composeAsync({
                recipients: 'maksimsavincev@gmail.com',
                subject: `Запрос контакта [${route.params.name}]`,
                body: inputValue,
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.p}>
                Прежде чем предоставить вам контакты,
                мы должны рассмотреть ваш запрос.
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Ваш запрос *'
                multiline
                inputAccessoryViewID='inputID'
                onChangeText={newValue => inputValue = newValue}
            />
            <InputAccessoryView nativeID='inputID'>
                <Button onPress={Keyboard.dismiss} title="Скрыть клавиатуру" />
            </InputAccessoryView>
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

export default ContactRequest;
