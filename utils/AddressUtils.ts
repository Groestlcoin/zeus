import { satoshisPerBTC } from './../stores/UnitsStore';

const btcNonBech = /^[F3][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
const btcBech = /^(grs1|[F3])[a-zA-HJ-NP-Z0-9]{25,39}$/;

const lnInvoice = /^(lngrsrt|lntgrs|lngrs|LNGRSRT|LNTGRS|LNGRS)([0-9]{1,}[a-zA-Z0-9]+){1}$/;

/* testnet */
const btcNonBechTestnet = /^[2][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
<<<<<<< HEAD
const btcBechTestnet = /^(tgrs1|[2])[a-zA-HJ-NP-Z0-9]{25,39}$/;
=======
const btcBechTestnet = /^(bc1|[2])[a-zA-HJ-NP-Z0-9]{25,39}$/;
const btcBechPubkeyScriptHashTestnet = /^(tb1|[2])[a-zA-HJ-NP-Z0-9]{25,39}$/;
>>>>>>> b65de604239ce475b7f030a2e10954d0404e437e

class AddressUtils {
    processSendAddress = (input: string) => {
        let value, amount;

        // handle addresses prefixed with 'groestlcoin:' and
        // payment requests prefixed with 'lightning:'

        // handle BTCPay invoices with amounts embedded
        if (input.includes('groestlcoin:') && input.includes('?amount=')) {
            const btcAddressAndAmt = input.split('groestlcoin:')[1];
            const amountSplit = btcAddressAndAmt.split('?amount=');
            value = amountSplit[0];
            amount = Number(amountSplit[1]) * satoshisPerBTC;
            amount = amount.toString();
        } else if (input.includes('groestlcoin:')) {
            value = input.split('groestlcoin:')[1];
        } else if (input.includes('lightning:')) {
            value = input.split('lightning:')[1];
        } else if (input.includes('LIGHTNING:')) {
            value = input.split('LIGHTNING:')[1];
        } else {
            value = input;
        }

        return { value, amount };
    };

    isValidBitcoinAddress = (input: string, testnet: boolean) => {
        if (testnet) {
            return (
                btcNonBechTestnet.test(input) ||
                btcBechTestnet.test(input) ||
                btcBechPubkeyScriptHashTestnet.test(input)
            );
        }

        return btcNonBech.test(input) || btcBech.test(input);
    };

    isValidLightningPaymentRequest = (input: string) => lnInvoice.test(input);
}

const addressUtils = new AddressUtils();
export default addressUtils;
