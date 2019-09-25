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
          addTransactionButton: '.logged__icon_add',
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
          <div class="logged__add">
            <button class="logged__button">+</button>
          </div>
          <div class="logged__details"></div>
        </div>
      </div>
    `;
    return markup;
  };

  displaySingleAccount (accountRecord) {
      let name = '';
      if(!accountRecord.name)
          name = `Karta Kredytowa (${accountRecord.owner})`;
      else
          name = accountRecord.name;
    return `
      <div class="logged__account" data-id="${accountRecord._id}">
        <p>${name}</p>
        <p>${accountRecord.balance}$ <i class="logged__icon trash alternate icon"></i>
        <i class="logged__icon_add add alternate icon"></i></p>
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
    const gotHistory = account.history.length > 0;
    let type;
    if (account.type === 'account') type = 'Konto Bankowe';
    else {
      type = account.type === 'debitCard' ? 'Karta Kredytowa' : 'Gotówka';
    }
    const markup = `
        <div class="logged__accounts-details">
            <h3>Szczegóły konta</h3>
        </div>
        <div class="history__item">
            <div class="history__item-upper">
                <p class="history__item-date">ID konta:</p>
                <p class="history__item-money">${account._id}</p>
            </div>
            <div class="history__item-upper">
                <p class="history__item-date">Typ:</p>
                <p class="history__item-money">${type}</p>
            </div>
            <div class="history__item-upper">
                <p class="history__item-date">Stan na dzień ${new Date().toLocaleDateString()}:</p>
                <p class="history__item-money">${account.balance}$</p>
            </div>
        </div>
        ${ gotHistory ? this._renderHistory(account.history) : '' }
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
                <select class="logged__add_select_type">
                    <option value="" disabled selected>Wybierz rodzaj</option>
                    <option value="account">Konto Bankowe</option>
                    <option value="debitCard">Karta Kredytowa</option>
                    <option value="cash">Gotówka</option>
                </select>
                <input class="logged__add_input_name logged__add_invisible" type='text' placeholder='Nazwa konta'/>
                <input class="logged__add_input_owner logged__add_invisible" type='text' placeholder='Właściciel konta'/>
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

  _renderHistory(history) {
      const historyMarkup = history.map(record => this._createSingleHistoryRecord(record))
      return `
        <div class="logged__accounts-details">
            <h3>Historia konta</h3>
        </div>
        ${ historyMarkup.join('<br />') }
      `
  }

  _createSingleHistoryRecord(historyRecord) {
    const sign = historyRecord.type === "Wydatek" ? '-' : '+';
    return `
        <div class="history__item">
            <div class="history__item-upper">
                <p class="history__item-title">${this._capitalize(historyRecord.title)}</p>
                <p class="history__item-date">${this._displayDate(historyRecord.date)}</p>
            </div>
            <div class="history__item-lower">
                <p class="history__item-category">${this._capitalize(historyRecord.category)}</p>
                <p class="history__item-money">${sign}${historyRecord.amount}$</p>
            </div>
        </div>
    `
    }

    init () {}
}

export default AccountsView;
