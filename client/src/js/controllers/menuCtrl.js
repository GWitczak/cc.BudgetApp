import MenuView from '../views/menuView';
import MenuModel from '../models/menuModel';

class MenuCtrl {

    constructor() {
        this.view = new MenuView();
        this.model = new MenuModel();
    }

    _clickHandler(event, mainCtrlCallback) {
        // Jakaś wewnętrzna logika MenuCtrl - jeżeli potrzebna
        // ... 
        // ...


        // Przekazujemy dane na zewnątrz do MainCtrl o tym co zostało kliknięte
        mainCtrlCallback(event.target);
    }

    _setListeners(menuClickCallback) {
        this.view.el.menu.addEventListener('click', (ev) => {
            this._clickHandler(ev, menuClickCallback)
        });
    }

    init(menuClickCallback) {
        console.log('Menu Ctrl working...')

        this._setListeners(menuClickCallback);
    }
}

export default MenuCtrl;