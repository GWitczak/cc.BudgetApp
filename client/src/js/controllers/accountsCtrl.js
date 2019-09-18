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
        // const accountsEl = this.view.getElementsByElStr(this.view.elStr.accounts);

        // accountsEl.addEventListener('click', (ev) => {
        //     this._clickHandler(ev, clickHandler)
        // });
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
