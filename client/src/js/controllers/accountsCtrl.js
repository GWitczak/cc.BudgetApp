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

  async _createAccountHandler(ev, cb) {
    const selectType = this.view.getElementByElStr(this.view.elStr.selectType);
    const inputName = this.view.getElementByElStr(this.view.elStr.inputName);
    const inputBalance = this.view.getElementByElStr(
      this.view.elStr.inputBalance
    );

    const result = await this.model.createAccount(
      selectType.options[selectType.selectedIndex].value,
      inputName.value,
      inputBalance.value
    );

    cb(result);
  }

  _addAccountHandler(ev, cb) {
    this.view.render(this.view.el.content, this.view.createAccountAdd());

    const createAccBtn = this.view.getElementByElStr(
      this.view.elStr.createAccountBtn
    );

    createAccBtn.addEventListener("click", async ev => {
      await this._createAccountHandler(ev, cb);
    });
  }

  _setListeners(accountClickCallback, addAccountCallback) {
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
  }

  async init(accountClickCallback, addAccountCallback) {
    this.view.renderLoader(this.view.el.content);

    const accounts = this.model.getFakeAccounts();
    this.model.getAccounts();
    this.view.render(
      this.view.el.content,
      this.view.createAccountMarkup(accounts)
    );

    this._setListeners(accountClickCallback, addAccountCallback);
  }
}

export default AccountsCtrl;
