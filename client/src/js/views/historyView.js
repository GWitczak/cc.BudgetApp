import BaseView from './_baseView';

class HistoryView extends BaseView {

    constructor() {
        super();

        this.elStr = {
            history: 'history',
            historyMoreBtn: 'history__more-info',
            historyItem: 'history__item'
        }
    };

    createHistoryMarkup(history) {
        let recordsMarkup = ``;
        history.forEach(record => recordsMarkup += this._createSingleRecord(record) );

        let markup = `
        <div class="logged">
          <div class="logged__header">
            <h2>Historia operacji</h2>
          </div>
          <div class="logged__container">
            ${ recordsMarkup }
          </div>
        </div>
      `;
      return markup;
    }

    _createSingleRecord(historyRecord) {
        let sign = ''; 
        if (historyRecord.type === "Wydatek") {
            sign = '-';
        } else if (historyRecord.type === "Przychod") {
            sign = '+';
        }

        return `
            <div class="history__item ">
                <div class="history__item-upper">
                    <p class="history__item-title">${ historyRecord.title ? this._capitalize(historyRecord.title) : '' }</p>
                    <p class="history__item-date">${ historyRecord.date ? this._displayDate(historyRecord.date) : '' }</p>
                </div>
                <div class="history__item-lower">
                    <p class="history__item-category">${ historyRecord.category ? this._capitalize(historyRecord.category) : '' }</p>
                    <p class="history__item-money">${sign}${historyRecord.amount}$</p>
                </div>
            </div>
        `
    }

}

export default HistoryView;