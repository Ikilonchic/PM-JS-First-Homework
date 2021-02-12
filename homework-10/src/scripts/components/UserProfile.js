import '../../styles/UserProfile.scss';

import DOMService from '../services/DOMService';

export default class UserProfile {
    constructor(config) {
        this.rootElement = config.rootElement;
        this.rootElement.classList.add('user-profile');

        this.currentUser = config.currentUser;

        this.render = this.render.bind(this);
        this.buildView = this.buildView.bind(this);
    }

    render() {
        if (DOMService.isElementExistById(this.rootElement.id)) {
            this.rootElement.innerHTML = this.buildView();
        }
    }

    buildView() {
        if (this.currentUser) {
            return `<div class="user-profile__avatar">
                        <img src=${this.currentUser.avatar_url}>
                    </div>
                    <div class="user-profile__data">
                        <div class="top">
                            <span class="user-profile__login"><a href="${this.currentUser.url}" target="_blank" rel="noopener noreferrer">${this.currentUser.login}</a></span>
                        </div>
                        <div class="buttom">
                            <span class="user-profile__repos">Repositories: ${this.currentUser.repos}</span>
                            <span class="user-profile__followers">Followers: ${this.currentUser.followers}</span>
                        </div>
                    </div>`;
        }

        return '<div class="user-profile__placeholder">User not found</div>';
    }
};
