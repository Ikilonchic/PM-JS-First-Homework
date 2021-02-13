export default class DOMService {
    static isElementExistById(id) {
        return document.getElementById(id) !== null;
    }

    static getElementById(id) {
        return document.getElementById(id);
    }

    static createElement(element) {
        return document.createElement(element);
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
