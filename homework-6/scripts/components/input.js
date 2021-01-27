class Input {
    constructor (config) {
        for (let property in config) {
            this[property] = config[property];
        }

        this.buildView = this.buildView.bind(this);
        this.setAttribute = this.setAttribute.bind(this);
    }

    buildView() {
        function getAttribute(name, value) {
            return value ? `${name}="${value}"` : '';
        }

        return `<input
            ${getAttribute('id', this.id)}
            ${getAttribute('type', this.type)}
            ${getAttribute('value', this.value)}
            ${getAttribute('placeholder', this.placeholder)}
            ${getAttribute('name', this.name)}
            ${getAttribute('disabled', this.disabled)}
            ${getAttribute('checked', this.checked)}
        >`;
    }

    setAttribute(name, value) {
        this[name] = value;
    }
}
