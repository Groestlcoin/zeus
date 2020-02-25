import { observable, computed } from 'mobx';
import BaseModel from './BaseModel';

export default class NodeInfo extends BaseModel {
    chains?: Array<string>;
    uris?: Array<string>;
    alias?: string;
    num_active_channels?: number;
    num_inactive_channels?: number;
    version?: string;
    identity_pubkey?: string;
    num_peers?: number;
    synced_to_chain?: boolean;
    @observable testnet?: boolean;
    @observable regtest?: boolean;
    block_hash?: string;
    @observable block_height?: number;
    best_header_timestamp?: string;
    // c-lightning
    id?: string;
    @observable network?: string;
    @observable blockheight?: number;
    address?: Array<any>;

    @computed public get isTestNet(): boolean {
        return this.testnet || this.network === 'testnet';
    }

    @computed public get isRegTest(): boolean {
        return this.regtest || this.network === 'regtest';
    }

    @computed public get currentBlockHeight(): Number {
        return this.block_height || this.blockheight || 0;
    }

    @computed public get getURIs(): Array<string> {
        // lnd
        if (this.uris) {
            return this.uris;
        }

        // c-lightning
        const uris: any[] = [];
        this.address &&
            this.address.forEach(uri => {
                uris.push(`${this.id}@${uri.address}:${uri.port}`);
            });
        return uris;
    }
}
