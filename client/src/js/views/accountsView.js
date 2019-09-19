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
          loggedDetails: '.logged__details'
        }
    }

  createAccountMarkup(account) {
    let recordsMarkup = ``;
    account.forEach(record => recordsMarkup += this.displaySingleAccount(record));

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
          <input class="logged__add_input_name" type='text' placeholder='Nazwa konta'/>
          <select class="logged__add_select_type">
            <option value="" disabled selected>Wybierz rodzaj</option>
            <option value="Oszczędnościowe">Oszczędnościowe</option>
          </select>
          <input class="logged__add_input_balance" type='text' placeholder='Kwota na koncie'/>
          <div class="logged__add">
            <button class="logged__button_add">+</button>
          </div>
        </div>
      </div>
    `;
      return add;
  }

  displaySingleAccount (accountRecord) {
    return `
      <div class="logged__account" data-id="${accountRecord.id}">
        <p>${accountRecord.name}</p>
        <p>${accountRecord.balance}</p>
      </div>
    `
  }
    // displayAccountsView (userRecord, accountRecord){
    //   return `
    //   <div class="logged">
    //     <div class="logged__header">
    //       <h2>Witaj Użytkowniku</h2>
    //     </div>
    //     <div class="logged__container">
    //       <div class="logged__accounts">
    //         <h3>Twoje konta</h3>
    //       </div>
    //       <div class="logged__account">
    //         <h4>${accountRecord.name}</h4>
    //       </div>
    //       <div class="logged__account">
    //         <h4>${accountRecord.name}</h4>
    //       </div>
    //       <div class="logged__account">
    //         <h4>${accountRecord.name}</h4>
    //       </div>
    //       <div class="logged__add">
    //         <button class="logged__button">+</button>
    //       </div>
    //     </div>
    //   </div>
    //   `
    // };

    init () {

    }
}

export default AccountsView;
