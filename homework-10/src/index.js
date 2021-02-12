import './index.css';

import UserSearch from './scripts/components/UserSearch';
import DOMService from './scripts/services/DOMService';

class App {
    constructor() {
        this.userSearch = new UserSearch({
            rootElement: DOMService.getElementById('root')
        });

        this.render = this.render.bind(this);
    }

    render() {
        this.userSearch.render();
    }
}

const app = new App();
app.render();
