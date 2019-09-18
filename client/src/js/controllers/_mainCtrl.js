import MenuCtrl from '../controllers/menuCtrl';
import HistoryCtrl from '../controllers/historyCtrl';
import AccountsCtrl from './accountsCtrl';

class MainCtrl {
    constructor() {
        this.menuCtrl = new MenuCtrl();
        this.historyCtrl = new HistoryCtrl();
        this.accountsCtrl = new AccountsCtrl();
    }

    // To tylko teoretyczny przykład, nie zawsze musimy wysyłac callbacka
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

        console.log(linkStr)
        switch(linkStr.toLowerCase()) {
            case 'history':
                this.historyCtrl.init(
                    this.moreHistoryClick.bind(this)
                );
            break;

            case 'accounts':
                this.accountsCtrl.init(
                    this.loadAccountDetails.bind(this),
                    this.createAccount.bind(this)
                );
            break;

            case '...':
                // odpowiedniCtrl.init(ewentualny callback);
            break;

        }

    }

    init() {
        console.log('Main Ctrl working...');
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
