import HistoryView from '../views/historyView';
import HistoryModel from '../models/historyModel';

class HistoryCtrl {

    constructor() {
        this.view = new HistoryView();
        this.model = new HistoryModel();
    }

    // _clickHandler(ev, menuClickCallback) {
    //     ev.preventDefault();
    // }

    // _setListeners(menuClickCallback) {
    // }

    async init(menuClickCallback) {
        console.log('History Ctrl working...')
    
        this.view.renderLoader(this.view.el.content);

        const history = await this.model.getHistory(); 

        this.view.render(
            this.view.el.content,
            this.view.createHistoryMarkup(history)
        );

        // this._setListeners(menuClickCallback);
    }
}

export default HistoryCtrl;