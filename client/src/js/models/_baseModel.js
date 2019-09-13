class BaseModel {

    constructor() {
        this.baseApiUrl = 'localhost:3000/api/';
    }

    getAuthTokenHeaderObj() {
        return { "x-auth-token": this.getAuthToken() };
    }

    saveAuthToken(token) {
        localStorage.setItem('budgetAppToken', token);
    }

    getAuthToken() {
        return localStorage.getItem('budgetAppToken');
    }

}

export default BaseModel;