import BaseModel from './_baseModel';

// nadanie endpointa

class AccountsModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'accounts';
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
};



export default AccountsModel;