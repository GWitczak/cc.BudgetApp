import MenuCtrl from '../controllers/menuCtrl';
import HistoryCtrl from '../controllers/historyCtrl';

class MainCtrl {
    constructor() {
        this.menuCtrl = new MenuCtrl();
        this.historyCtrl = new HistoryCtrl();
    }

    // To tylko teoretyczny przykład, nie zawsze musimy wysyłac callbacka
    moreHistoryClickCallback(params) {
        console.log('moreHistoryClickHandler runs - params:', params);
    }


    // Tutaj callback jest przydatny -> MenuCtrl ustawia listenera na elementach menu,
    // po czym wysyła do MainCtrl informacje o tym co zostało kliknięte (params),
    // na podstawie tych informacji możemy z poziomu MainCtrl inicjalizowac odpowiednie kontrolery
    // np. historyCtrl.init() i w init() mamy możliwosc przekazania kolejnych callbacków
    menuClickCallback(params) {
        console.log('menuClickCallback runs - params:', params);
        console.log(this.menuCtrl);
        // Tutaj na podstawie tego co ktoś wybrał w menu zrobimy np.:

        switch(params) {
            case 'history':
                this.historyCtrl.init( 
                    this.moreHistoryClickCallback.bind(this)
                );
            break;

            case '...':
                // odpowiedniCtrl.init(); + ewentualny callback
            break;
    
        }

    }

    init() {
        console.log('Main Ctrl working...');
        this.menuCtrl.init( this.menuClickCallback.bind(this) );
    }
}

export default MainCtrl;
