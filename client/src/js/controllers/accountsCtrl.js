import AccountsView from "../views/accountsView";
import AccountsModel from "../models/accountsModel";

//jest to pierwsza strona, która wyświetla się po zalogowaniu
// strona wyświetla nazwę konta oraz kwotę, która znajduje się obecnie na koncie
// kliknięcie na konkretne konto przenosi do widoku danego konta
// kliknięcie na przysick dodania przenosi do widoku dodania konta

class AccountsCtrl {
  constructor() {
    this.view = new AccountsView();
    this.model = new AccountsModel();
  }

  async _clickHandler(ev, cb) {
    const accountEl = ev.target.closest(this.view.elStr.singleAccount);
    const accountID = accountEl ? accountEl.dataset.id : null;

    if (!accountID) return;

    const account = await this.model.getAccountDetails(accountID);

    if (!account) return;

    this.view.showDetails(account);
  }

  // RENDER WIDOKU DODAWANIA KONTA
  _renderCreateAccountView(e) {
    let selectType = e.target.options[e.target.selectedIndex].value;
    const inputName = this.view.getElementByElStr(this.view.elStr.inputName);
    const inputBalance = this.view.getElementByElStr(this.view.elStr.inputBalance);
    const inputBalanceCash = this.view.getElementByElStr(this.view.elStr.inputBalanceCash);
    const inputBalanceDebit = this.view.getElementByElStr(this.view.elStr.inputBalanceDebit);
    const inputMaxDebit = this.view.getElementByElStr(this.view.elStr.inputMaxDebit);
    const inputOwner = this.view.getElementByElStr(this.view.elStr.inputOwner);

    if(selectType === 'account') {
      inputName.classList.remove('logged__add_invisible');
      inputBalance.classList.remove('logged__add_invisible');
      inputBalanceCash.classList.add('logged__add_invisible');
      inputBalanceDebit.classList.add('logged__add_invisible');
      inputMaxDebit.classList.add('logged__add_invisible');
      inputOwner.classList.add('logged__add_invisible');
    }else if(selectType === 'debitCard') {
      inputName.classList.add('logged__add_invisible');
      inputBalance.classList.add('logged__add_invisible');
      inputBalanceCash.classList.add('logged__add_invisible');
      inputBalanceDebit.classList.remove('logged__add_invisible');
      inputMaxDebit.classList.remove('logged__add_invisible');
      inputOwner.classList.remove('logged__add_invisible');
    }else if(selectType === 'cash') {
      inputName.classList.add('logged__add_invisible');
      inputBalance.classList.add('logged__add_invisible');
      inputBalanceCash.classList.remove('logged__add_invisible');
      inputBalanceDebit.classList.add('logged__add_invisible');
      inputMaxDebit.classList.add('logged__add_invisible');
      inputOwner.classList.add('logged__add_invisible');
    }

  }

   // DODAWANIE KONTA
  async _createAccountHandler(ev, cb) {
    const selectType = this.view.getElementByElStr(this.view.elStr.selectType);
    const inputName = this.view.getElementByElStr(this.view.elStr.inputName);
    const inputBalance = this.view.getElementByElStr(this.view.elStr.inputBalance);
    const inputBalanceCash = this.view.getElementByElStr(this.view.elStr.inputBalanceCash);
    const inputBalanceDebit = this.view.getElementByElStr(this.view.elStr.inputBalanceDebit);
    const inputMaxDebit = this.view.getElementByElStr(this.view.elStr.inputMaxDebit);
    const inputOwner = this.view.getElementByElStr(this.view.elStr.inputOwner);
    const error = this.view.getElementByElStr(this.view.elStr.loggedAddError);

    const result = await this.model.createAccount(
      selectType.options[selectType.selectedIndex].value,
      inputName.value,
      parseFloat(inputBalance.value),
      parseFloat(inputBalanceCash.value),
      parseFloat(inputBalanceDebit.value),
      inputMaxDebit.value,
      inputOwner.value
    );

    if(!result.ok)
      error.innerText = result.statusText;
    else {
      error.innerText = '';
      cb(result);
    }

  }

  _addAccountHandler(ev, cb) {
    this.view.render(this.view.el.content, this.view.createAccountAdd());

    const selectType = this.view.getElementByElStr(
        this.view.elStr.selectType
    );

    const createAccBtn = this.view.getElementByElStr(
      this.view.elStr.createAccountBtn
    );

    selectType.addEventListener('change', this._renderCreateAccountView.bind(this));

    createAccBtn.addEventListener("click", async ev => {
      await this._createAccountHandler(ev, cb);
    });
  }

  // USUWANIE KONTA
  async _deleteAccountHandler(ev, cb){
    const accountEl = ev.target.closest(this.view.elStr.singleAccount);
    const accountID = accountEl ? accountEl.dataset.id : null;
    // const account = await this.model.getAccountDetails(accountID);

    console.log(accountID);
    await this.model.deleteAccount(accountID);

    const accounts = await this.model.getAccounts();
    this.view.render(
      this.view.el.content,
      this.view.createAccountMarkup(accounts)
    );

  }

  async _addTransactionHandler(ev, cb) {
    const accountEl = ev.target.closest(this.view.elStr.singleAccount);
    const accountID = accountEl ? accountEl.dataset.id : null;
    const account = await this.model.getAccountDetails(accountID);
    let owner = 'none';
    if (account.type === 'debitCard') owner = account.owner;
    const data = {
      accountID: accountID ,
      cardOwner: owner,
      accountType: account.type
    }
    cb(data);
  }

  _setListeners(accountClickCallback, addAccountCallback, deleteAccountCallback, addTransactionCallback) {
    const loggedContainer = this.view.getElementByElStr(
      this.view.elStr.loggedContainer
    );
    const addAccBtn = this.view.getElementByElStr(
      this.view.elStr.addAccountBtn
    );

    loggedContainer.addEventListener("click", ev => {
      this._clickHandler(ev, accountClickCallback);
    });

    addAccBtn.addEventListener("click", ev => {
      this._addAccountHandler(ev, addAccountCallback);
    });


    this.addTransactionButtons= this.view.getElementsByElStr(this.view.elStr.addTransactionButton);
    this.addTransactionButtonsArray = [].slice.call(this.addTransactionButtons);
    this.addTransactionButtons.forEach((item) => {
      item.addEventListener("click", ev => {
        this._addTransactionHandler(ev, addTransactionCallback);
      });
    });
    //USUWANIE KONTA
    this.deleteButtons = this.view.getElementsByElStr(this.view.elStr.deleteButton);
    this.deleteButtonsArray = [].slice.call(this.deleteButtons);
    this.deleteButtonsArray.forEach((item) => {
      item.addEventListener("click", ev => {
      this._deleteAccountHandler(ev, deleteAccountCallback);
    });
  })
  }

  async init(accountClickCallback, addAccountCallback, addTransactionCallback, deleteAccountCallback) {
    this.view.renderLoader(this.view.el.content);

    const accounts = await this.model.getAccounts();
    this.view.render(
      this.view.el.content,
      this.view.createAccountMarkup(accounts)
    );

    this._setListeners(accountClickCallback, addAccountCallback, deleteAccountCallback, addTransactionCallback);
  }
}

export default AccountsCtrl;
