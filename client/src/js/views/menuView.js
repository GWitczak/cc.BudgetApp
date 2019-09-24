import BaseView from './_baseView';

class MenuView extends BaseView {

    constructor() {
        super();

        this.elStr = {
            menuLink: '.menu__nav-link',
            jsLogin: '.js-login',
            jsRegister: '.js-register',
            jsAccounts: '.js-accounts',
            jsTransfer: '.js-transfer',
            jsHistory: '.js-history',
            jsHistory: '.js-history',
            jsQuit: '.js-quit',
        }
    };

    showHideLinks(isLogged) {
        this.getElementByElStr(this.elStr.jsLogin).style.display = isLogged ? 'none' : 'block' ;
        this.getElementByElStr(this.elStr.jsRegister).style.display = isLogged ? 'none' : 'block';
        this.getElementByElStr(this.elStr.jsAccounts).style.display = isLogged ? 'block' : 'none';
        this.getElementByElStr(this.elStr.jsTransfer).style.display = isLogged ? 'block' : 'none';
        this.getElementByElStr(this.elStr.jsHistory).style.display = isLogged ? 'block' : 'none';
        this.getElementByElStr(this.elStr.jsQuit).style.display = isLogged ? 'block' : 'none';
    }
}

export default MenuView;