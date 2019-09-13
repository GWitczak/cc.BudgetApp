import style from './../sass/main.scss';
import './files';
import MainCtrl from './controllers/_mainCtrl';


// Inicjalizcja głownego kontrolera, nic tutaj nie zmieniamy
const mainCtrl = new MainCtrl();
mainCtrl.init();