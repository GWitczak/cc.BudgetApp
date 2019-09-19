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
                headers: { ...this.getAuthTokenHeaderObj() }
            });

            this.history = await rawData.json();

            return this.history;

        } catch (error) {
            console.log(error);
        }
    }

    getFakeHistory() {
        return [
            { title: 'Czynsz', date: '23.01.2020', money: 2000, category: 'Opłaty' },
            { title: 'Czynsz1', date: '23.01.2020', money: 1000, category: 'Opłaty' },
            { title: 'Czynsz2', date: '23.01.2020', money: 500, category: 'Opłaty' },
            { title: 'Czynsz3', date: '23.01.2020', money: 700, category: 'Opłaty' },
            { title: 'Czynsz4', date: '23.01.2020', money: 12000, category: 'Opłaty' },
        ]
    }

}

export default HistoryModel;