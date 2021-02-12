import HTTPService from './HTTPService';

export default class UserService {
    static async getUser(userName) {
        return HTTPService.request({ path: `/users/${userName}` })
            .then(data => data.json())
            .then(data => {
                if (data.message) return null;

                return {
                    login: data.login,
                    avatar_url: data.avatar_url,
                    repos: data.public_repos,
                    followers: data.followers,
                    url: data.html_url,
                };
            });
    }

    static async getUserRepos(userName) {
        return HTTPService.request({ path: `/users/${userName}/repos` })
            .then(data => data.json())
            .then(data => {
                if (data.message) return null;

                return data.map(element => {
                    return {
                        name: element.name,
                        url: element.html_url,
                        ...(
                            element.description && {
                                description: element.description,
                            }
                        )
                    };
                })
            });
    }

    static async getUserFollowers(userName) {
        return HTTPService.request({ path: `/users/${userName}/followers` })
            .then(data => data.json())
            .then(data => {
                if (data.message) return null;

                return data.map(element => {
                    return {
                        login: element.login,
                        url: element.html_url,
                    };
                })
            });
    }
};
