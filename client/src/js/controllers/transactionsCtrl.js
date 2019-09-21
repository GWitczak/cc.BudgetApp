import TransactionsModel from '../models/transactionsModel';
import TransactionsView from '../views/transactionsView';

class TransactionsCtrl {
    constructor() {
        this.view = new TransactionsView();
        this.model = new TransactionsModel();
    }

    async _addtransactionHandler(ev) {
        const inputTitle = this.view.getElementByElStr(this.view.elStr.inputTitle).value;
        const inputType = this.view.getElementByElStr(this.view.elStr.inputType).value;
        const inputCategory = this.view.getElementByElStr(this.view.elStr.inputCategory).value;
        const inputAmount = this.view.getElementByElStr(this.view.elStr.inputAmount).value;

        const data = {
            accountType: 'account',
            title: inputTitle,
            type: inputType,
            category: inputCategory,
            amount: inputAmount,
            wallet_id: '5d83bf1d9680274ae8d818c9'
        }

        const result = await this.model.addTransaction(data);
        // przekierowanie do details konta 
        ev.preventDefault();
    }

    _setListeners(addTransactionCallback) {
        const addTransactionBtn = this.view.getElementByElStr(this.view.elStr.addTransactionBtn);
        addTransactionBtn.addEventListener('click', (ev) => {
            this._addtransactionHandler(ev);
        })
    }


    async init(addTransactionCallback) {
        this.view.renderLoader(this.view.el.content);

        this.view.render(this.view.el.content, this.view.createTransactionAdd());

        this._setListeners(addTransactionCallback);
    }
}

export default TransactionsCtrl;