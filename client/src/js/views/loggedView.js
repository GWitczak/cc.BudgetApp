import BaseView from './_baseView';

class LoggedView extends BaseView {
    constructor() {
        super();
        this.elStr = {
          logged: '.logged'
        }
}

    _displayLoggedView (user, accountRecord){
      return `
      <div class="logged">
        <div class="logged__header">
          <h2>Witaj ${user.name}</h2>
        </div>
        <div class="logged__container">
          <div class="logged__accounts">
            <h3>Twoje konta</h3>
          </div>
          <div class="logged__account">
            <h4>${accountRecord.title}</h4>
          </div>
          <div class="logged__account">
            <h4>${accountRecord.title}</h4>
          </div>
          <div class="logged__account">
            <h4>${accountRecord.title}</h4>
          </div>
          <div class="logged__add">
            <button class="logged__button">+</button>
          </div>
        </div>
      </div>
      `
    };

    init () {
            
    }
};

export default LoggedView; 