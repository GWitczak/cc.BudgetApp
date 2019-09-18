import AccountsView from '../views/accountsView';
import AccountsModel from '../models/accountsModel';

//jest to pierwsza strona, która wyświetla się po zalogowaniu
// strona wyświetla nazwę konta oraz kwotę, która znajduje się obecnie na koncie
// kliknięcie na konkretne konto przenosi do widoku danego konta
// kliknięcie na przysick dodania przenosi do widoku dodania konta


class AccountsCtrl {

    constructor() {
        this.view = new AccountsView();
        this.model = new AccountsModel();
    }

    _clickHandler(ev, ) {

    }

    _setListeners(menuClickCallback) {
        //const accountsEl = this.view.getElementsByElStr(this.view.elStr.accounts);
        const addAccountBtn = document.querySelector('.logged__button');

        // accountsEl.addEventListener('click', (ev) => {
        //     this._clickHandler(ev, clickHandler)
        // });

        addAccountBtn.addEventListener('click', this._openAddAccountPage);
    }

    _openAddAccountPage() {
        this.view.renderLoader(this.view.el.content);

        this.view.render(
            this.view.el.content,
            this.view.createAccountAdd()
        );

        let logged__button_add = document.querySelector('.logged__button_add');
        logged__button_add.addEventListener('click', this._addAccountAndRender)
    }

    async _addAccountAndRender(e) {
        let input_type = document.querySelector('.logged__add_input_type');
        let input_name = document.querySelector('.logged__add_input_name');
        let input_balance = document.querySelector('.logged__add_input_balance');

        let res = await this.model.createAccount(input_type.value, input_name.value, input_balance.value);

        if(res.error) {
            let error = document.createElement('div');
            error.innerText = res.error;
            input_balance.parentNode.appendChild(error);
        }else {
            this.init();
        }
    }

    init(menuClickCallback) {
        console.log('Accounts Ctrl working...');

        this.view.renderLoader(this.view.el.content);

        const accounts = this.model.getFakeAccounts();

        this.view.render(
            this.view.el.content,
            this.view.createAccountMarkup(accounts)
        );

        this._setListeners(menuClickCallback);
    }
}



export default AccountsCtrl;
