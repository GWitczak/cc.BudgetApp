import BaseModel from './_baseModel';

// nadanie endpointa

class LoggedModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'logged';
    }

    async getAccounts() {
        this.url = `${this.baseApiUrl}${this.endpoint}`;

        const token = this.getAuthToken();

        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');
        
        // pobranie danych z API
        try { // nie do końca rozumiem czym dokładnie jest x-auth-token
            const rawData = await fetch(this.url, {
                '???': { ...this.getAuthTokenHeaderObj() }
            });

            this.logged = await rawData.json();

            // zwrócenie pobranych danych
            return this.logged;

        } catch (error) {
            console.log(error);
        }
    }
};



export default LoggedModel;