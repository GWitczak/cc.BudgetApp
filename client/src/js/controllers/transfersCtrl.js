import TransfersModel from '../models/transfersModel';
import TransfersView from '../views/transfersView';

class TransfersCtrl {
    constructor() {
        this.model = new TransfersModel();
        this.view = new TransfersView();
    }

    async _addTransferHandler(ev, list) {
        const inputAccFrom = this.view.getElementByElStr(this.view.elStr.inputAccFrom).value;
        const inputAccTo = this.view.getElementByElStr(this.view.elStr.inputAccTo).value;
        const inputAccAmount = this.view.getElementByElStr(this.view.elStr.inputAccAmount).value;
        const inputAccTitle = this.view.getElementByElStr(this.view.elStr.inputAccTitle).value;

        const data = {
            idAccountFrom: inputAccFrom,
            idAccountTo: inputAccTo,
            amount: inputAccAmount,
            title: inputAccTitle
        }

        const result = await this.model.addTransfer(data);
        if(result) list();
        ev.preventDefault();
    }

    _setListeners(list) {
        const addTransferBtn = this.view.getElementByElStr(this.view.elStr.addTransferBtn);
        addTransferBtn.addEventListener('click', (ev) => {
            this._addTransferHandler(ev, list);
        })
    }


    async init(data, list) {
        this.view.renderLoader(this.view.el.content);

        this.view.render(this.view.el.content, this.view.createTransferAdd());

        this._setListeners(data, list);
    }
}

export default TransfersCtrl;