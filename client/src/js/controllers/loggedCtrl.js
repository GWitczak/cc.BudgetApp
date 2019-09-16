import LoggedView from '../views/loggedView';
import LoggedModel from '../models/loggedModel';

//jest to pierwsza strona, która wyświetla się po zalogowaniu
// strona wyświetla nazwę konta oraz kwotę, która znajduje się obecnie na koncie
// kliknięcie na konkretne konto przenosi do widoku danego konta
// kliknięcie na przysick dodania przenosi do widoku dodania konta


class LoggedCtrl {

    constructor() {
        this.view = new LoggedView();
        this.model = new LoggedModel();
    }

    _clickHandler(ev, ) {

    }

    _setListeners(menuClickCallback) {
        const loggedEl = this.view.getElementsByElStr(this.view.elStr.logged);

        loggedEl.addEventListener('click', (ev) => {
            this._clickHandler(ev, clickHandler)
        });
    }

    init() {
        console.log('Logged Ctrl working...')
    }
};



export default LoggedCtrl;