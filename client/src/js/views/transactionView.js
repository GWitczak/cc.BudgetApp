import BaseView from './_baseView';

class AddTransactionView extends BaseView {
    constructor() {
        super();

        this.elStr = {
            addTransactionBtn: '.logged_button',
            inputTitle: '.logged_add_input_name',
            inputType: '.logged_add_select_type',
            inputCategory: '.logged_add_select_category',
            inputAmount: '.logged_add_input_balance'
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
                        <option value="exp">Wydatek</option>
                        <option value="inc">Przychód</option>
                    </select>
                    <input class="logged__add_input_balance" type='text' placeholder='Kwota'/>
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


export default AddTransactionView;