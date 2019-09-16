import MenuCtrl from '../controllers/menuCtrl';
import HistoryCtrl from '../controllers/historyCtrl';
import LoggedCtrl from '../controllers/loggedCtrl';

class MainCtrl {
    constructor() {
        this.menuCtrl = new MenuCtrl();
        this.historyCtrl = new HistoryCtrl();
        this.loggedCtrl = new LoggedCtrl();
    }

    // To tylko teoretyczny przykład, nie zawsze musimy wysyłac callbacka
    moreHistoryClickCallback(params) {
        console.log('moreHistoryClickHandler runs - params:', params);
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
                    this.moreHistoryClickCallback.bind(this)
                );
            break;

            case 'account':
                this.loggedCtrl.init();
            break;

            case '...':
                // odpowiedniCtrl.init(); + ewentualny callback
            break;
    
        }

    }

    init() {
        console.log('Main Ctrl working...');
        this.menuCtrl.init( this.menuClickCallback.bind(this) );
        this.loggedCtrl.init(this.menuClickCallback.bind(this));
    }
}

export default MainCtrl;
