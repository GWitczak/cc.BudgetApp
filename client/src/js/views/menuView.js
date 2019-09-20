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
        }
    };

    showHideLinks(isLogged) {

        // Powinnismy tutaj USUWAĆ elementy, a nie je ukrywać
        // TODO
        this.getElementByElStr(this.elStr.jsLogin).style.display = isLogged ? 'none' : 'inline-block' ;
        this.getElementByElStr(this.elStr.jsRegister).style.display = isLogged ? 'none' : 'inline-block';
        this.getElementByElStr(this.elStr.jsAccounts).style.display = isLogged ? 'inline-block' : 'none';
        this.getElementByElStr(this.elStr.jsTransfer).style.display = isLogged ? 'inline-block' : 'none';
        this.getElementByElStr(this.elStr.jsHistory).style.display = isLogged ? 'inline-block' : 'none';
    }
}

export default MenuView;