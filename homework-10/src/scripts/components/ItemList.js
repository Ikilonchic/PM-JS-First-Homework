import '../../styles/ItemList.scss';

import DOMService from '../services/DOMService';

export default class ItemList {
    constructor(config) {
        this.rootElement = config.rootElement;
        this.rootElement.classList.add('item-list');

        this.title = config.title;
        this.itemArr = config.itemArr || [];

        this.render = this.render.bind(this);
        this.buildView = this.buildView.bind(this);
    }

    render() {
        if (DOMService.isElementExistById(this.rootElement.id)) {
            this.rootElement.innerHTML = this.buildView();
        }
    }

    buildView() {
        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const buildListView = (arr) => {
            return arr.reduce((prev, curr) => {
                prev += `<div class="item-list__item"><a ${curr.url && `href="${curr.url}" target="_blank" rel="noopener noreferrer"`}>`;

                for (const [key, value] of Object.entries(curr)) {
                    prev += (key !== 'url' && `<div>${capitalizeFirstLetter(key)}: ${value}</div>`) || '';
                }
                return prev + '</a></div>';
            }, '');
        }

        return (this.itemArr && this.itemArr.length && 
            `<div class="item-list__title">${this.title}</div>
            <div class="item-list__container">${buildListView(this.itemArr)}</div>`) || '';
    }
};
