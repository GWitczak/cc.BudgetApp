import BaseView from './_baseView';

class HistoryView extends BaseView {

    constructor() {
        super();

        this.elStr = {
            history: 'history',
            historyMoreBtn: 'history__more-info'
        }
    };

    createHistoryMarkup(history) {
        let recordsMarkup = ``;
        history.forEach(record => recordsMarkup += this._createSingleRecord(record) );

        let markup = `        
            <section class="history">
                <h2 class="heading-primary text-center">Historia operacji</h2>
                <ul class="history__list">
                    ${ recordsMarkup }
                </ul>
            </section>
        `;

        return markup;
    }

    _createSingleRecord(historyRecord) {
        return `
            <li class="history__item">
                <div class="history__item-upper">
                    <p class="history__item-title">${historyRecord.title}</p>
                    <p class="history__item-date">${historyRecord.date}</p>
                </div>
                <div class="history__item-lower">
                    <p class="history__item-category">${historyRecord.category}</p>
                    <p class="history__item-money">${historyRecord.money}</p>
                </div>
            </li>
        `
    }

}

export default HistoryView;