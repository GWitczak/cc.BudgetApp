import LoginView from '../views/loginView';
import LoginModel from '../models/loginModel';
import { runInThisContext } from 'vm';

class LoginCtrl {

    constructor() {
        this.view = new LoginView();
        this.model = new LoginModel();
    }

    _getValues() {
        return [
            this.view.getElementByElStr(this.view.elStr.passInput).value,
            this.view.getElementByElStr(this.view.elStr.emailInput).value
        ];
    }

    async _loginHandler(ev, cb) {
        ev.preventDefault();

        const [pass, email] = [...this._getValues()];
        if(!(pass !== '' && email !== '')) return;

        const credentials = {
            email: email,
            password: pass
        }

        const isLogged = await this.model.login(credentials);

        if(isLogged) cb(isLogged)
    }

    async _registerHandler(ev, cb) {
        ev.preventDefault();

        const [pass, email] = [...this._getValues()];
        if(!(pass !== '' && email !== '')) return;

        const credentials = {
            email: email,
            name: email,
            password: pass
        }

        const isLogged = await this.model.register(credentials);

        if(isLogged) cb(isLogged)

    }

    _setListeners(mode, succesLoginCb) {
        const form = this.view.getElementByElStr(this.view.elStr.form);

        form.addEventListener('submit', (ev) => {

            if(mode === 'login') {
                this._loginHandler(ev, succesLoginCb) 
            } else {
                this._registerHandler(ev, succesLoginCb)
            }
        });
    }

    init(mode, succesLoginCb) {
        console.log('Login Ctrl working...');

        this.view.render(
            this.view.el.content,
            this.view.createForm(mode)
        );
       
        this._setListeners(mode, succesLoginCb);
    }
}

export default LoginCtrl;