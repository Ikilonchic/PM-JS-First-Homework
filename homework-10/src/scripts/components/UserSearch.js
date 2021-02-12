import '../../styles/UserSearch.scss';

import _ from '../utils';

import User from '../models/User';

import DOMService from '../services/DOMService';
import UserService from '../services/UserService';

import UserProfile from './UserProfile';
import ItemList from './ItemList';

export default class UserSearch {
    constructor(config) {
        this.rootElement = config.rootElement;
        this.rootElement.classList.add('user-search');

        this.currentUser = User.load();
        
        this.findUser = this.findUser.bind(this);
        this.findUserRepos = this.findUserRepos.bind(this);
        this.findUserFollowers = this.findUserFollowers.bind(this);
        this.update = this.update.bind(this);
        this.clear = this.clear.bind(this);
        this.render = this.render.bind(this);
        this.buildView = this.buildView.bind(this);
        this.registerListeners = this.registerListeners.bind(this);
    }

    async findUser(userName) {
        return UserService.getUser(userName)
            .then(user => {
                this.currentUser = user;
            });
    }

    async findUserRepos(userName) {
        return UserService.getUserRepos(userName)
            .then(repos => {
                if (repos) {
                    this.reposList.itemArr = repos;
                }
            });
    }

    async findUserFollowers(userName) {
        return UserService.getUserFollowers(userName)
            .then(followers => {
                if (followers) {
                    this.followersList.itemArr = followers;
                }
            });
    }

    update(newUserName) {
        this.findUser(newUserName)
            .then(() => {
                this.userProfile.currentUser = this.currentUser;
                this.userProfile.render();
            })
            .then(() => {
                if (this.currentUser) {
                    this.findUserRepos(this.currentUser.login)
                        .then(() => {
                            this.reposList.render();
                        });
                    this.findUserFollowers(this.currentUser.login)
                        .then(() => {
                            this.followersList.render();
                        });

                    User.save(this.currentUser);
                } else {
                    this.reposList.itemArr = null;
                    this.followersList.itemArr = null;

                    this.reposList.render();
                    this.followersList.render();
                }
            });
    }

    clear() {
        this.userProfile.currentUser = null;
        this.reposList.itemArr = null;
        this.followersList.itemArr = null;

        this.userProfile.render();
        this.reposList.render();
        this.followersList.render();
    }

    render() {
        if (DOMService.isElementExistById(this.rootElement.id)) {
            this.rootElement.innerHTML = this.buildView();
        }

        this.searchInput = DOMService.getElementById('user-search__input');
        this.searchInput.value = ( this.currentUser && this.currentUser.login ) || '';
        
        this.userProfile = new UserProfile({
            rootElement: DOMService.getElementById('user-profile'),
            currentUser: this.currentUser,
        })

        this.reposList = new ItemList({
            rootElement: DOMService.getElementById('user-repos-list'),
            title: 'Repositories',
        });
        this.followersList = new ItemList({
            rootElement: DOMService.getElementById('user-follower-list'),
            title: 'Followers',
        });

        this.update(( this.currentUser && this.currentUser.login ) || '');

        this.registerListeners();
    }

    buildView() {
        return `<div class="user-search__top">
                    <input type="text" id="user-search__input" class="user-search__input">
                    <div id="user-profile"></div>
                </div>
                <div class="user-search__buttom">
                    <div id="user-repos-list"></div>
                    <div id="user-follower-list"></div>
                </div>`;
    }

    registerListeners() {
        const searchHandler = _.debounce(() => {
            let newUserName = this.searchInput.value;
    
            if (newUserName) {
                this.update(newUserName);
            } else {
                this.clear();
            }
        }, 1000)

        this.searchInput.addEventListener('input', searchHandler);
    }
};
