export default class DOMService {
    static isElementExistById(id) {
        return document.getElementById(id) !== null;
    }

    static getElementById(id) {
        return document.getElementById(id);
    }

    static createElement(element, view) {
        let wrapElement = document.createElement('div')
        wrapElement.innerHTML = view(element);
        return wrapElement.firstChild;
    }
    
    static replaceElement(newElement, oldElement) {
        let parentElement = oldElement.parentElement;
        parentElement.replaceChild(newElement, oldElement);
        return newElement;
    }
    
    static removeElement(element) {
        let parentElement = element.parentElement;
        return parentElement.removeChild(element);
    }
};
