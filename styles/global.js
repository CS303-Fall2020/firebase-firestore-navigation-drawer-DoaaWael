import { StyleSheet } from 'react-native'


export const globalStyles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        // marginTop: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 14,
        borderRadius: 6,
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    modelToggle: {
        marginTop: 40,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        borderRadius: 10,
        alignSelf: 'center',
    },
    modelClose: {
        alignSelf: 'baseline',
        margin: 10,
        marginTop: 10,
    },
    modelContent: {
        flex: 1,
        padding: 20,

    },
    offline: {
        padding: 14,
        backgroundColor: '#ddd',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
    refresh: {
        position: 'relative',
        bottom: 10,
    }


});

