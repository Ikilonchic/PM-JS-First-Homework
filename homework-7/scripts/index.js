const fileGrid = document.getElementById('file-grid');
const controller = document.getElementById('file-grid-controller');
const controllerBtn = controller.querySelectorAll('label');

let currentFile = null;

const setPosition = (element, x, y) => {
    if (x < document.documentElement.clientWidth / 2) {
        element.style.left = x + 'px';
        element.style.removeProperty('right');
    } else {
        element.style.right = document.documentElement.clientWidth - x + 'px';
        element.style.removeProperty('left');
    }
    
    if (y < document.documentElement.clientHeight / 2) {
        element.style.top = y + 'px';
        element.style.removeProperty('bottom');
    } else {
        element.style.bottom = document.documentElement.clientHeight - y + 'px';
        element.style.removeProperty('top');
    }
};

const isFile = (element) => {
    return element.classList ? element.classList.contains('file') : false;
};

const createFile = (name, size) => {
    return `<div class="file">
                <div class="file__name" title="${name}">
                    ${name}
                </div>
                <div class="file__size">
                    ${size}b
                </div>
            </div>`;
};

const createFileHandler = (event) => {
    let files = controllerBtn[0].getElementsByTagName('input')[0].files;

    for (let i = 0; i < files.length; i++) {
        fileGrid.innerHTML += createFile(files[i].name, files[i].size);
    }
};

const renameFileHandler = (event) => {
    let fileName = currentFile.querySelector('.file__name');

    let newName = prompt('Enter new file name:', fileName.innerText);

    if (newName === '') {
        alert("Don't enter empty file name!")
        return;
    } else if (newName != null) {
        fileName.innerText = newName;
    }
};

const deleteFileHandler = (event) => {
    if (!currentFile) return;

    currentFile.remove();
};

const hideController = (event) => {
    controller.classList.add('block--hide');
    controllerBtn.forEach(btn => btn.classList.add('block--hide'));
};

const showController = (event) => {
    event.preventDefault();

    if (isFile(event.target)) {
        controllerBtn[0].classList.add('block--hide');
        controllerBtn[1].classList.remove('block--hide');
        controllerBtn[2].classList.remove('block--hide');
    } else {
        controllerBtn[0].classList.remove('block--hide');
        controllerBtn[1].classList.add('block--hide');
        controllerBtn[2].classList.add('block--hide');
    }

    setPosition(controller, event.clientX, event.clientY);
    
    controller.classList.remove('block--hide');
};

const selectCurrentFile = (event) => {
    event.preventDefault();

    if (isFile(event.target)) {
        currentFile = event.target;
    } else {
        currentFile = null;
    }
};

document.addEventListener('click', hideController);
document.addEventListener('contextmenu', showController);
document.addEventListener('contextmenu', selectCurrentFile);

controllerBtn[0].getElementsByTagName('input')[0].addEventListener('change', createFileHandler);
controllerBtn[1].getElementsByTagName('input')[0].addEventListener('click', renameFileHandler);
controllerBtn[2].getElementsByTagName('input')[0].addEventListener('click', deleteFileHandler);
