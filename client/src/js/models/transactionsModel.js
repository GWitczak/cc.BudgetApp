import BaseModel from './_baseModel';


class TransactionsModel extends BaseModel {
    constructor() {
        super();
        this.endpoint = 'transactions';
    }

    async addTransaction(data) {
        this.url = `${this.baseApiUrl}${this.endpoint}`;
        const token = this.getAuthToken();

        console.log(token);
        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: { ...token },
                body: JSON.stringify(data)
                
            });
            this.data = await response.json();

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}


export default TransactionsModel;