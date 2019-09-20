import BaseModel from './_baseModel';


class TransactionsModel extends BaseModel {
    constructor() {
        super();
        this.endpoint = 'transactions';
    }

    async addTransaction(accountType, cardtransaction, cardOwner, type, title, amount, category, from, wallet_id ) {
        this.url = `${this.baseApiUrl}${this.endpoint}`;
        const token = this.getAuthToken();

        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');

        try {
            const rawData = await fetch(this.url, {
                method: 'POST',
                headers: {
                    ...this.getAuthTokenHeaderObj(),
                    body: JSON.stringify({accountType: accountType, type: type, title: title, amount: amount, category: category})
                }
            });
            this.transaction = await rawData.json();

            return this.transaction;
        } catch (err) {
            console.log(err);
        }
    }
}


export default TransactionsModel;