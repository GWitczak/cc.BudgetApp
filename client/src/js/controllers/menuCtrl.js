import MenuView from '../views/menuView';
import MenuModel from '../models/menuModel';

class MenuCtrl {

    constructor() {
        this.view = new MenuView();
        this.model = new MenuModel();
    }

    _clickHandler(ev, mainCtrlCallback) {
        ev.preventDefault();

        // Wewnętrzna logika
        const link = ev.target.closest(`${this.view.elStr.menuLink}`);
        if (!link) return;

        // Przekazujemy dane na zewnątrz do MainCtrl o tym co zostało kliknięte
        mainCtrlCallback(link.pathname.slice(1));
    }

    _setListeners(menuClickCallback) {
        this.view.el.menu.addEventListener('click', (ev) => {
            this._clickHandler(ev, menuClickCallback)
        });
    }

    init(menuClickCallback) {
        console.log('Menu Ctrl working...');

        this._setListeners(menuClickCallback);
    }
}

export default MenuCtrl;