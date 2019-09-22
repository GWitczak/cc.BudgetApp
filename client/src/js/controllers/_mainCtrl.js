import MenuCtrl from '../controllers/menuCtrl';
import HistoryCtrl from '../controllers/historyCtrl';
import AccountsCtrl from './accountsCtrl';
import TransactionsCtrl from './transactionsCtrl';
import LoginCtrl from './loginCtrl';

class MainCtrl {
    constructor() {
        this.menuCtrl = new MenuCtrl();
        this.historyCtrl = new HistoryCtrl();
        this.transactionsCtrl = new TransactionsCtrl();
        this.accountsCtrl = new AccountsCtrl();
        this.loginCtrl = new LoginCtrl();
    }

    afterSuccesLogin(isUserLogged) {
        this.menuCtrl.view.showHideLinks(isUserLogged);

        if (!isUserLogged) return;

        this.accountsCtrl.init(
            this.loadAccountDetails.bind(this),
            this.createAccount.bind(this)
        );
    }

    moreHistoryClick(params) {
        console.log('moreHistoryClickHandler runs - params:', params);
    }

    loadAccountDetails(accountId) {
        console.log('loadAccountDetails, params: ', accountId);
    }

    createAccount(result) {
        console.log('createAccount from mainCtrl', result);
        this.accountsCtrl.init(
            this.loadAccountDetails.bind(this),
            this.createAccount.bind(this)
        );
    }

    // Tutaj callback jest przydatny -> MenuCtrl ustawia listenera na elementach menu,
    // po czym wysyła do MainCtrl informacje o tym co zostało kliknięte (params),
    // na podstawie tych informacji możemy z poziomu MainCtrl inicjalizowac odpowiednie kontrolery
    // np. historyCtrl.init() i w init() mamy możliwosc przekazania kolejnych callbacków
    menuClickCallback(linkStr) {

        switch(linkStr) {
            case 'history':
                this.transactionsCtrl.init(this.createAccount.bind(this));
            break;

            case 'accounts':
                this.accountsCtrl.init(
                    this.loadAccountDetails.bind(this),
                    this.createAccount.bind(this)
                );
            break;

            case 'login':
            case 'register':
                this.loginCtrl.init(
                    linkStr,
                    this.afterSuccesLogin.bind(this)
                );
            break;


            case '...':
                // odpowiedniCtrl.init(ewentualny callback);
            break;

        }

    }

    init() {
        console.log('Main Ctrl working...');

        // Bez znaczenia na jakim Ctrl to wykonamy
        this.historyCtrl.model.clearStorage();

        this.menuCtrl.init(
            this.menuClickCallback.bind(this)
        );
        this.accountsCtrl.init(
            this.loadAccountDetails.bind(this),
            this.createAccount.bind(this)
        );
    }
}

export default MainCtrl;
