import BaseView from './_baseView';

class LoginView extends BaseView {

    constructor() {
        super();

        this.elStr = {
            form: '.js-login-form',
            emailInput: '.js-email',
            passInput: '.js-password',
        }
    };


    createForm(mode) {
        return `
            <form class="logged js-login-form">
                <div class="logged__header">
                    <h2>${mode == 'login' ? 'Logowanie' : 'Rejestracja'}</h2>
                </div>
                <div class="logged__container_add">
                    <input class="logged__add_input_name js-email" type='email' placeholder='E-mail'/>
                    <input class="logged__add_input_balance js-password" type='password' placeholder='Hasło'/>
                    <div class="logged__add">
                        <button class="logged__button_add logged__button_add--small" type="submit">${mode == 'login' ? 'Zaloguj' : 'Zarejestruj'}</button>
                    </div>
                </div>
            </form>
        `;
    }
}

export default LoginView;