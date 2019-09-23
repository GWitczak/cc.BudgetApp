class BaseModel {
  constructor() {
    this.baseApiUrl = "http://localhost:8000/api/";
  }

  getAuthTokenHeaderObj() {
    return { "x-auth-token": this.getAuthToken() };
  }

  saveAuthToken(token) {
    localStorage.setItem("budgetAppToken", token);
  }

  save(where, what) {
    localStorage.setItem(where, JSON.stringify(what));
  }

  load(what) {
    return JSON.parse(localStorage.getItem(what));
  }

  isUserLoggedIn() {
    return localStorage.getItem("user") && localStorage.getItem("budgetAppToken");
  }

  getAuthToken() {
    return localStorage.getItem("budgetAppToken");
  }
}

export default BaseModel;
