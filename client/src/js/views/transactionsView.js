import BaseView from './_baseView';

class TransactionsView extends BaseView {
    constructor() {
        super();

        this.elStr = {
            addTransactionBtn: '.logged__button_add',
            inputTitle: '.logged__add_input_name',
            inputType: '.logged__add_select_type',
            inputCategory: '.logged__add_select_category',
            inputAmount: '.logged__add_input_amount'
        }
    }
    
    createTransactionAdd() {
        let add = `
            <div class="logged">
                <div class="logged__header">
                    <h2>Dodaj Transakcję</h2>
                </div>
                <div class="logged__container_add">
                    <input class="logged__add_input_name" type='text' placeholder='Tytuł'/>
                    <select class="logged__add_select_type">
                        <option value="" disabled selected>Wybierz rodzaj</option>
                        <option value="Wydatek">Wydatek</option>
                        <option value="Przychod">Przychód</option>
                    </select>
                    <input class="logged__add_input_amount" type='text' placeholder='Kwota'/>
                     <select class="logged__add_select_category">
                        <option value="" disabled selected>Kategoria</option>
                        <option value="Jedzenie">Jedzenie</option>
                        <option value="Rachunki">Rachunki</option>
                        <option value="Samochód">Samochód</option>
                        <option value="Rozrywka">Rozrywka</option>
                        <option value="Ogólne">Ogólne</option>
                        <option value="Zdrowie">Zdrowie</option>
                        <option value="Wakacje">Wakacje</option>
                        <option value="Odzież">Odzież</option>
                        <option value="Prezenty">Prezenty</option>
                        <option value="Wyplata">Wypłata</option>
                        <option value="Wplata">Wplata</option>
                    </select>
                    <div class="logged__add">
                        <button class="logged__button_add">+</button>
                    </div>
                </div>
            </div>
        `;
        return add;
    }

}


export default TransactionsView;