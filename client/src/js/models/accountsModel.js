import BaseModel from './_baseModel';

// nadanie endpointa

class AccountsModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'users';
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

            this.account = await rawData.json();

            // zwrócenie pobranych danych
            return this.account;

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
                headers: { ...this.getAuthTokenHeaderObj() }
            });

            this.accounts = await rawData.json();

            // zwrócenie pobranych danych
            return this.accounts;

        } catch (error) {
            console.log(error);
        }
    }

    async login(loginData = {email: "johny@johny.com", password: "12345"}) {
            
        try {
            const response = await fetch(`${this.baseApiUrl}login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const token = response.headers.get('x-auth-token');
            const data = await response.json();

            console.log('Zalogowany jako:', data);
            
            this.saveAuthToken(token);
            this.save('user', data);

        } catch (error) {
            console.log(error);
        }
    }

    async getAccountDetails(accId) {
        this.url = `${this.baseApiUrl}${this.endpoint}`;

        try {
            const response = await fetch(`${this.url}`, {
                headers: {...this.getAuthTokenHeaderObj()}
            });
            this.user = await response.json();
        } catch (error) {
            console.log(error);
        }

        const account = this.user.wallet.filter(acc => acc._id === accId);
        return account[0];
    }
    
    getFakeAccounts() {
        return [
            {name: 'mBank', balance: '1345,34', id: '5d7bc37c8c31d13d57e63b4e'},
            {name: 'mBank', balance: '1345,34', id: '5d7fba31923d5342f9d754d5'},
            {name: 'mBank', balance: '1345,34', id: '5d7fcbc4ed0ba8705308c2e1'},
        ]
    }
}



export default AccountsModel;
