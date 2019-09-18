import BaseView from './_baseView';

class AccountsView extends BaseView {
    constructor() {
        super();
        this.elStr = {
          account: '.account'
        }
    }

  createAccountMarkup(account){
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
          <div class="logged__add">
            <button class="logged__button">+</button>
          </div>
        </div>
      </div>
    `;
    return markup;

  }

  createAccountAdd() {

      let add = `
      <div class="logged">
        <div class="logged__header">
          <h2>Dodaj konto</h2>
        </div>
        <div class="logged__container">
          <input class="logged__add_input_type" type='text' placeholder='Nazwa'/>
          <input class="logged__add_input_name" type='text' placeholder='Wybierz rodzaj'/>
          <input class="logged__add_input_balance" type='text' placeholder='Kwota na koncie'/>
          <div class="logged__add">
            <button class="logged__button_add">+</button>
          </div>
        </div>
      </div>
    `;
      return add;
  }

  displaySingleAccount (accountRecord){
    return `
      <div class="logged__account">
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
