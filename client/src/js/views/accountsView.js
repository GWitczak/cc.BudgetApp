import BaseView from './_baseView';

class AccountsView extends BaseView {
    constructor() {
        super();

        this.elStr = {
          account: '.account',
          loggedContainer: '.logged__container',
          singleAccount: '.logged__account',
          addAccountBtn: '.logged__button',
          createAccountBtn: '.logged__button_add',
          selectType: '.logged__add_select_type',
          inputName: '.logged__add_input_name',
          inputBalance: '.logged__add_input_balance',
          loggedDetails: '.logged__details',
          deleteButton: '.logged__icon',
          loggedAddError: '.logged__add_error',
          inputOwner: '.logged__add_input_owner',
          inputMaxDebit: '.logged__add_input_maxDebit',
          inputBalanceDebit: '.logged__add_input_balanceDebit',
          inputBalanceCash: '.logged__add_input_balanceCash'
        }
    }

  createAccountMarkup(accounts) {
    let recordsMarkup = ``;
    console.log(accounts);

    accounts.forEach(record => recordsMarkup += this.displaySingleAccount(record));

    let markup = `
      <div class="logged">
        <div class="logged__header">
          <h2>Witaj Użytkowniku</h2>
        </div>
        <div class="logged__container">
          <div class="logged__accounts">
           <h3>Twoje konta</h3>
          </div>
          ${ recordsMarkup }
          <div class="logged__details"></div>
          <div class="logged__add">
            <button class="logged__button">+</button>
          </div>
        </div>
      </div>
    `;
    return markup;
  };

  displaySingleAccount (accountRecord) {
      let name = '';
      if(!accountRecord.name)
          name = accountRecord.owner;
      else
          name = accountRecord.name;
    return `
      <div class="logged__account" data-id="${accountRecord._id}">
        <p>${name}</p>
        <p>${accountRecord.balance} <i class="logged__icon trash alternate icon"></i></p>
      </div>
    `
  }

  deleteAccountView() {
    let deleteAccount = `
    <div class=card>
      <div class="content">
        Jesteś pewny, że chcesz usunąć konto?
      </div>
      <div class="extra content">
        <div class="ui two buttons">
          <div class="ui basic green button">Tak</div>
          <div class="ui basic red button">Nie</div>
        </div>
      </div>
    </div>
    `;
    return deleteAccount;
  }

  showDetails(account) {
      const markup = `
        <div class="logged__accounts-details">
            <h3>Szczegóły konta</h3>
        </div>
        <p>ID konta: ${account._id}</p>
        <p>Kasa: ${account.balance}</p>
        <p>Typ: ${account.type}</p>
        <p>Historia: ${JSON.stringify(account.history)}</p>
      `;

      const el = this.getElementByElStr(this.elStr.loggedDetails);
      this.render(el, markup);
  }

  createAccountAdd() {

      let add = `
      <div class="logged">
        <div class="logged__header">
          <h2>Dodaj konto</h2>
        </div>
        <div class="logged__container_add">
          <input class="logged__add_input_name logged__add_invisible" type='text' placeholder='Nazwa konta'/>
          <input class="logged__add_input_owner logged__add_invisible" type='text' placeholder='Właściciel konta'/>
          <select class="logged__add_select_type">
            <option value="" disabled selected>Wybierz rodzaj</option>
            <option value="account">account</option>
            <option value="debitCard">creditCard</option>
            <option value="cash">cash</option>
          </select>
         <input class="logged__add_input_balanceDebit logged__add_invisible" type='text' placeholder='Saldo'/>
         <input class="logged__add_input_maxDebit logged__add_invisible" type='text' placeholder='Maksymalne zadłużenie'/>
         <input class="logged__add_input_balance logged__add_invisible" type='text' placeholder='Kwota na koncie'/>
         <input class="logged__add_input_balanceCash logged__add_invisible" type='text' placeholder='Saldo'/>
          <h4 class="logged__add_error"></h4>
          <div class="logged__add">
            <button class="logged__button_add">+</button>
          </div>
        </div>
      </div>
    `;
      return add;
  }




    init () {

    }
}

export default AccountsView;
