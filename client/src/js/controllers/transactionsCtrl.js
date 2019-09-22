import TransactionsModel from '../models/transactionsModel';
import TransactionsView from '../views/transactionsView';

class TransactionsCtrl {
    constructor() {
        this.view = new TransactionsView();
        this.model = new TransactionsModel();
    }

    async _addtransactionHandler(ev , accountData, list) {
        const inputTitle = this.view.getElementByElStr(this.view.elStr.inputTitle).value;
        const inputType = this.view.getElementByElStr(this.view.elStr.inputType).value;
        const inputCategory = this.view.getElementByElStr(this.view.elStr.inputCategory).value;
        const inputAmount = this.view.getElementByElStr(this.view.elStr.inputAmount).value;

        const data = {
            accountType: accountData.accountType,
            title: inputTitle,
            type: inputType,
            category: inputCategory,
            amount: inputAmount,
            wallet_id: accountData.accountID,
            cardOwner: accountData.cardOwner
        }

        const result = await this.model.addTransaction(data);
        // przekierowanie do details konta 
        if(result) list();
        ev.preventDefault();
    }

    _setListeners(accountData, list) {
        const addTransactionBtn = this.view.getElementByElStr(this.view.elStr.addTransactionBtn);
        addTransactionBtn.addEventListener('click', (ev) => {
            this._addtransactionHandler(ev, accountData, list);
        })
    }


    async init(data, list) {
        this.view.renderLoader(this.view.el.content);

        this.view.render(this.view.el.content, this.view.createTransactionAdd());

        this._setListeners(data, list);
    }
}

export default TransactionsCtrl;