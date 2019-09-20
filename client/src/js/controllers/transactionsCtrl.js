import TransactionsModel from '../models/transactionsModel';
import TransactionsView from '../views/transactionView';

class TransactionsCtrl {
    constructor() {
        this.model = new TransactionsModel();
        this.view = new TransactionsView();
    }

    _addtransactionHandler(ev) {
        const inputTitle = this.view.getElementByElStr(this.view.elStr.inputTitle);
        const inputType = this.view.getElementByElStr(this.view.elStr.inputType);
        const inputCategory = this.view.getElementByElStr(this.view.elStr.inputCategory);
        const inputAmount = this.view.getElementByElStr(this.view.elStr.inputAmount);

        const result = this.model.addTransaction('...');
        // przekierowanie do details konta 
        ev.preventDefault();
    }

    _setListeners(addTransactionCallback) {
        const addTransactionBtn = this.view.getElementByElStr(this.view.elStr.addTransactionBtn);

        addTransactionBtn.addEventListener('click', (ev) => {
            this._clickHandler(ev);
        })
    }


    async init() {
        this.view.renderLoader(this.view.el.content);

        this.view.render(this.view.el.content, this.view.createTransactionAdd());

        this._setListeners(addTransactionCallback);
    }
}

export default TransactionsCtrl;