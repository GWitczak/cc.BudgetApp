import HistoryView from '../views/historyView';
import HistoryModel from '../models/historyModel';

class HistoryCtrl {

    constructor() {
        this.view = new HistoryView();
        this.model = new HistoryModel();
    }
    _clickHandler(ev, ) {

    }

    _setListeners(menuClickCallback) {
        const historyEl = this.view.getElementsByElStr(this.view.elStr.history);

        historyEl.addEventListener('click', (ev) => {
            this._clickHandler(ev, clickHandler)
        });
    }

    init() {
        console.log('History Ctrl working...')
        
        // 1. Wyszyść widok + załaduj loader

        // 2. Pobierz historię z api

        // 3. Wyświetl pobrane dane + usuń loader (LUB) wyświetl komunikat o błędzie

        // 4. Ustaw listenery (jeżeli potrzebne)
        this._setListeners(menuClickCallback);
    }
}

export default HistoryCtrl;