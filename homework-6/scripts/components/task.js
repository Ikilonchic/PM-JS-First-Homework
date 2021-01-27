class Task {
    constructor (config) {
        this.taskElement = config.taskElement;
        this.id = config.taskElement.id;

        this.description = config.description;

        this.inputs = config.inputs;
        this.solution = config.solution;

        this.init = this.init.bind(this);
        this.buildView = this.buildView.bind(this);
    }

    init() {
        if (DOMService.isElementExistById(this.taskElement.id)) {
            this.taskElement.innerHTML = this.buildView();
        }

        this.inputFields = this.taskElement.querySelectorAll('input');

        function getSolutionHandler() {
            let args = [...this.inputFields].map(field => field.value);
            this.outputField.value = this.solution(...args);
        }

        this.inputBtn = this.taskElement.querySelector('#' + this.id + '-btn');
        this.inputBtn.addEventListener('click', getSolutionHandler.bind(this));

        this.outputField = this.taskElement.querySelector('#' + this.id + '-output');
    }

    buildView() {
        function buildInputsBlock(inputs) {
            let list = '<div class="task__input">';

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].setAttribute('id', this.id + '-input-' + i);
                list += `<label for="${this.id + '-input-' + i}">${inputs[i].name}:</label>
                         ${inputs[i].buildView()}`;
            }

            list += `<button id="${this.id + '-btn'}" type="button">click</button>`;

            return list + '</div>';
        }

        return `<div class="task__description">
                    ${this.description}
                </div>

                ${buildInputsBlock.call(this, this.inputs)}

                <textarea id="${this.id + '-output'}" class="task__output" cols="30" rows="10" disabled></textarea>`;
    }
}
