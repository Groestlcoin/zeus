import { action, observable } from 'mobx';
import Payment from './../models/Payment';
import SettingsStore from './SettingsStore';
import RESTUtils from './../utils/RESTUtils';

export default class PaymentsStore {
    @observable loading: boolean = false;
    @observable error: boolean = false;
    @observable error_msg: string;
    @observable payments: Array<Payment | any> = [];
    settingsStore: SettingsStore;

    constructor(settingsStore: SettingsStore) {
        this.settingsStore = settingsStore;
    }

    @action
    public getPayments = () => {
        this.loading = true;
        RESTUtils.getPayments(this.settingsStore)
            .then((response: any) => {
                // handle success
                const data = response.data;
                const payments = data.transaction || data.payments;
                this.payments = payments
                    .slice()
                    .reverse()
                    .map((payment: any) => new Payment(payment));
                this.loading = false;
            })
            .catch(() => {
                // handle error
                this.payments = [];
                this.loading = false;
            });
    };
}
