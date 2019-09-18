import BaseView from './_baseView';

class AccountsView extends BaseView {
    constructor() {
        super();

        this.elStr = {
          account: '.account',
          loggedContainer: '.logged__container',
          singleAccount: '.logged__account',
          addAccountBtn: '.logged__button',
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
          <div class="logged__add">
            <button class="logged__button">+</button>
          </div>
        </div>
      </div>
    `
    return markup;

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
};

export default AccountsView; 