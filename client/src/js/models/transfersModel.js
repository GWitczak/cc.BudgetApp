import BaseModel from './_baseModel';


class TransfersModel extends BaseModel {
    constructor() {
        super();
        this.endpoint = 'transfers';
    }

    async addTransfer(data) {
        this.url = `${this.baseApiUrl}${this.endpoint}`;
        const token = this.getAuthToken();
        if (!token) return console.log('Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.');

        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                
            });
            this.data = await response.json();
            console.log(this.data);

            return response;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}


export default TransfersModel;