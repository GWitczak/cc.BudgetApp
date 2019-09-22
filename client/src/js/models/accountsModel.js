import BaseModel from "./_baseModel";

// nadanie endpointa

class AccountsModel extends BaseModel {
  constructor() {
    super();
    this.endpoint = "users";
    this.deleteEndpoint = "wallet";
    this.addEndpoint = "wallet";
  }

  async createAccount(type, name, balance) {
    this.url = `${this.baseApiUrl}${this.addEndpoint}`;

    const token = this.getAuthToken();

    if (!token) return {ok: false, statusText: 'Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego.'};
    // wysłanie danych na serwer
    let status = false;
    if(type === 'debitCard')
      return await fetch(this.url, {
        method: 'POST',
        headers: { 'x-auth-token': token, 'Content-Type': 'application/json'},
        body: JSON.stringify({type: type, balance: balance, owner: name})
      })
          .then(res => {status = res.ok; return res.text()})
          .then(res =>{ return {ok: status, statusText: res}});
    else
      return await fetch(this.url, {
        method: 'POST',
        headers: { 'x-auth-token': token, 'Content-Type': 'application/json'},
        body: JSON.stringify({type: type, name: name, balance: balance})
      })
          .then(res => {status = res.ok; return res.text()})
          .then(res =>{ return {ok: status, statusText: res}});
  }

  async getAccounts() {
    this.url = `${this.baseApiUrl}${this.endpoint}`;

    const token = this.getAuthTokenHeaderObj();

    if (!token)
      return console.log(
        "Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego."
      );

    // pobranie danych z API
    try {
      const response = await fetch(`${this.url}`, {
        method: "GET",
        headers: { ...token }
      });

      this.usersData = await response.json();
      this.accounts = this.usersData.wallet;
      // zwrócenie pobranych danych
      return this.accounts;
    } catch (error) {
      console.log(error);
    }
  }

  async getAccountDetails(accId) {
    this.url = `${this.baseApiUrl}${this.endpoint}`;

    const token = this.getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(`${this.url}`, {
        headers: { ...this.getAuthTokenHeaderObj() }
      });

      this.user = await response.json();

    } catch (error) {
      console.log(error);
    }

    const account = this.user.wallet.filter(acc => acc._id === accId);
    return account[0];
  }

  async deleteAccount(accId) {
    this.url = `${this.baseApiUrl}${this.deleteEndpoint}/${accId}`;

    const token = this.getAuthTokenHeaderObj();

    if (!token)
      return console.log(
        "Nie możesz wysłać zapytania pod wskazany adres bez tokena autoryzującego."
      );

    try {
      const response = await fetch(`${this.url}`, {
        method: "DELETE",
        headers: { ...token }
      });

      this.response = await response.json();
      console.log(this.response);
      // zwrócenie pobranych danych
    } catch (error) {
      console.log(error);
    }
  }

  getFakeAccounts() {
    return [
      { name: "mBank", balance: "1345,34", id: "5d7bc37c8c31d13d57e63b4e" },
      { name: "mBank", balance: "1345,34", id: "5d7fba31923d5342f9d754d5" },
      { name: "mBank", balance: "1345,34", id: "5d7fcbc4ed0ba8705308c2e1" }
    ];
  }
}

export default AccountsModel;
