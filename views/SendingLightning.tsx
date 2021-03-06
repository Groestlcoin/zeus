import * as React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-native-elements';

import TransactionsStore from './../stores/TransactionsStore';

interface SendingLightningProps {
    navigation: any;
    TransactionsStore: TransactionsStore;
}

@inject('TransactionsStore')
@observer
export default class SendingLightning extends React.Component<
    SendingLightningProps,
    {}
> {
    getBackgroundColor() {
        const { TransactionsStore } = this.props;
        const { payment_route, payment_error, error } = TransactionsStore;

        if (error) {
            return 'darkred';
        } else if (payment_route) {
            return 'green';
        } else if (payment_error) {
            return 'lightcoral';
        }

        return 'white';
    }

    render() {
        const { TransactionsStore, navigation } = this.props;
        const {
            loading,
            error,
            error_msg,
            payment_hash,
            payment_route,
            payment_error
        } = TransactionsStore;

        const backgroundColor = this.getBackgroundColor();

        return (
            <View
                style={{
                    ...styles.container,
                    backgroundColor
                }}
            >
                <View style={styles.content}>
                    {loading && (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                    {loading && <Text>Sending Transaction</Text>}
                    {(error || payment_error) && (
                        <Text
                            style={{
                                color: 'white',
                                padding: 20,
                                fontSize: 40
                            }}
                        >
                            Error: {payment_error || error_msg}
                        </Text>
                    )}
                    {payment_route && (
                        <Text
                            style={{
                                color: 'white',
                                padding: 20,
                                fontSize: 40
                            }}
                        >
                            Transaction successfully sent
                        </Text>
                    )}
                    {payment_hash && (
                        <Text
                            style={{
                                color: 'white',
                                padding: 20,
                                fontSize: 15
                            }}
                        >{`Payment Hash: ${payment_hash}`}</Text>
                    )}
                    {payment_route && (
                        <Button
                            title=""
                            icon={{
                                name: 'check',
                                size: 125,
                                color: 'white'
                            }}
                            style={{ padding: 20 }}
                            onPress={() => void 0}
                            buttonStyle={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    )}
                    {error && (
                        <Button
                            title=""
                            icon={{
                                name: 'error',
                                size: 125,
                                color: 'white'
                            }}
                            style={{ padding: 20 }}
                            onPress={() => void 0}
                            buttonStyle={{
                                backgroundColor: 'transparent'
                            }}
                        />
                    )}

                    {(error || payment_error || payment_route) && (
                        <Button
                            title="Go to Wallet"
                            icon={{
                                name: 'list',
                                size: 25,
                                color: backgroundColor
                            }}
                            onPress={() => navigation.navigate('Wallet')}
                            style={styles.button}
                            buttonStyle={{
                                backgroundColor: '#fff',
                                borderRadius: 30
                            }}
                            titleStyle={{
                                color: backgroundColor
                            }}
                        />
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10
    }
});
