import HistoryView from '../views/historyView';
import HistoryModel from '../models/historyModel';

class HistoryCtrl {

    constructor() {
        this.view = new HistoryView();
        this.model = new HistoryModel();
    }

    _clickHandler(ev, menuClickCallback) {
        ev.preventDefault();
    }

    _setListeners(menuClickCallback) {
    }

    init(menuClickCallback) {
        console.log('History Ctrl working...')
    
        // 1. Wyszyść widok + załaduj loader
        this.view.renderLoader(this.view.el.content);

        // 2. Pobierz historię z api
        //TODO
        const history = this.model.getFakeHistory(); 

        // 3. Wyświetl pobrane dane + usuń loader (LUB) wyświetl komunikat o błędzie
        this.view.render(
            this.view.el.content,
            this.view.createHistoryMarkup(history)
        );

        // 4. Ustaw listenery (jeżeli potrzebne)
        this._setListeners(menuClickCallback);
    }
}

export default HistoryCtrl;