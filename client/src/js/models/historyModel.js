import BaseModel from './_baseModel';

class HistoryModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'history';
    }

    async getHistory() {
        this.url = `${this.baseApiUrl}${this.endpoint}`;

        const token = this.getAuthToken();

        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');

        try {
            const rawData = await fetch(this.url, {
                'headers': { ...this.getAuthTokenHeaderObj() }
            });

            this.history = await rawData.json();

            return this.history;

        } catch (error) {
            console.log(error);
        }
    }

}

export default HistoryModel;