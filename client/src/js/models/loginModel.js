import BaseModel from './_baseModel';

class LoginModel extends BaseModel {

    constructor() {
        super();
        this.endpoint = 'login';
    }

    // johny@johny.com / 12345 :)    
    async login(loginData) {
        try {
            const response = await fetch(this.baseApiUrl + this.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const type = response.headers.get('Content-Type')
            const token = response.headers.get('x-auth-token');

            if(type.indexOf('text') >= 0) {
                const data = await response.text();

                console.log(data)

                return false;

            } else {
                const data = await response.json();   

                this.saveAuthToken(token);
                this.save('user', data);

                return true;
            }

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async register(loginData) {
        try {
            const response = await fetch(`${this.baseApiUrl}users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const type = response.headers.get('Content-Type')
            const token = response.headers.get('x-auth-token');

            if(type.indexOf('text') >= 0) {
                const data = await response.text();

                console.log(data)

                return false;

            } else {
                const data = await response.json();   

                this.saveAuthToken(token);
                this.save('user', data);

                return true;
            }

        } catch (error) {
            console.log(error);
            return false;
        }

    }


}



export default LoginModel;
