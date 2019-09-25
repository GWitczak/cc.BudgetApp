import BaseView from './_baseView';

class TransfersView extends BaseView {
    constructor() {
        super();

        this.elStr = {
            addTransferBtn: '.logged__button_add',
            inputAccFrom: '.logged__add_input_acc-from',
            inputAccTo: '.logged__add_input_acc-to',
            inputAccAmount: '.logged__add_input_amount',
            inputAccTitle: '.logged__add_input_title'
        }
    }
    
    createTransferAdd() {
        let add = `
            <div class="logged">
                <div class="logged__header">
                    <h2>Wyślij przelew</h2>
                </div>
                <div class="logged__container_add">
                    <input class="logged__add_input_acc-from" type='text' placeholder='Id z którego konta'/>
                    <input class="logged__add_input_acc-to" type='text' placeholder='Id na jakie konto'/>
                    <input class="logged__add_input_amount" type='number' placeholder='Kwota'/>
                    <input class="logged__add_input_title" type='text' placeholder='Tytuł'/>
                    <div class="logged__add">
                        <button class="logged__button_add">Wyślij</button>
                    </div>
                </div>
            </div>
        `;
        return add;
    }

}


export default TransfersView;