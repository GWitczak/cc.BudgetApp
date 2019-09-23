class BaseView {

    constructor(){
        this.el = {
            menu: document.querySelector('.menu'),
            content: document.querySelector('.content'),
        }
    
        this.elStr = {}
    };

    render(DOMElement, markup) {
        this._clearElementContent(DOMElement);
        DOMElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderLoader(DOMElement) {
        this._clearElementContent(DOMElement);
        const markup = `
            <div class="lds-default">
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
            </div>
        `;
        DOMElement.insertAdjacentHTML('afterbegin', markup);
    }

    getElementsByElStr(elStr) {
        return document.querySelectorAll(`${elStr}`);
    }

    getElementByElStr(elStr) {
        return document.querySelector(`${elStr}`);
    }

    _clearElementContent(element) {
        let el;
        if (typeof element === 'string') {
            el = document.querySelector(`${element}`)
        } else {
            el = element;
        }
        el.innerHTML = '';
    };

    _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    _displayDate(rawDate) {
        return new Date(rawDate).toLocaleDateString();
    }

}

export default BaseView;