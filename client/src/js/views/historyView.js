import BaseView from './_baseView';

class HistoryView extends BaseView {

    constructor() {
        super();

        this.elStr = {
            history: '.history',
            historyMoreBtn: '.history__more-info'
        }
    };

    createHistoryMarkup(history) {
        let markup = '';
        history.forEach(record => {
            markup += this._createSingleRecord(record);
        })
        return markup;
    }

    _createSingleRecord(historyRecord) {
        return `
            <div class="history">
                <h3 class="history__title">${historyRecord.title}</h3>
                ...
                ...
                ...
            </div>
        `
    }

}

export default HistoryView;