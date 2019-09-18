import BaseModel from './_baseModel';

// nadanie endpointa

class AccountsModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'accounts';
    }

    async createAccount(type, name, balance) {
        this.url = `${this.baseApiUrl}${this.endpoint}`;

        const token = this.getAuthToken();

        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');

        // wysłanie danych na serwer
        try { // nie do końca rozumiem czym dokładnie jest x-auth-token
            const rawData = await fetch(this.url, {
                method: 'POST',
                headers: { ...this.getAuthTokenHeaderObj(),
                body: JSON.stringify({type: type, name: name, balance: balance})}
            });

            this.accounts = await rawData.json();

            // zwrócenie pobranych danych
            return this.accounts;

        } catch (error) {
            console.log(error);
        }
    }

    async getAccounts() {
        this.url = `${this.baseApiUrl}${this.endpoint}`;

        const token = this.getAuthToken();

        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');
        
        // pobranie danych z API
        try { // nie do końca rozumiem czym dokładnie jest x-auth-token
            const rawData = await fetch(this.url, {
                'headers': { ...this.getAuthTokenHeaderObj() }
            });

            this.accounts = await rawData.json();

            // zwrócenie pobranych danych
            return this.accounts;

        } catch (error) {
            console.log(error);
        }
    }

    getFakeAccounts(){
        return [
            {name: 'mBank', balance: '1345,34'},
            {name: 'mBank', balance: '1345,34'},
            {name: 'mBank', balance: '1345,34'}
        ]
    }
}



export default AccountsModel;
