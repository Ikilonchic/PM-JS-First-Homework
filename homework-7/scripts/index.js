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

const hideController = () => {
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

const dragAndDropFile = (event) => {
    event.preventDefault();

    if(![...controllerBtn].includes(event.target)) {
        hideController();
    }
    
    if (!isFile(event.target) || event.button) return;

    let dragedFile = event.target;

    let currentWidth = dragedFile.clientWidth;
    let ghost = dragedFile.cloneNode(false);

    fileGrid.insertBefore(ghost, dragedFile);
    document.body.appendChild(dragedFile);

    dragedFile.style.width = currentWidth + 'px';
    dragedFile.style.position = 'absolute';
    dragedFile.style.zIndex = 1000;

    moveAt(event);
  
    function moveAt(e) {
        dragedFile.style.left = e.pageX - dragedFile.offsetWidth / 2 + 'px';
        dragedFile.style.top = e.pageY - dragedFile.offsetHeight / 2 + 'px';
    }
  
    document.onmousemove = function(e) {
        moveAt(e);

        if (!fileGrid.children.length) return; 

        let minLength = 9999;
        let nearestFile = ghost;

        for (let i = 0; i < fileGrid.children.length; i++) {
            let dx = fileGrid.children[i].offsetTop  + fileGrid.children[i].offsetWidth / 2 - (dragedFile.offsetTop + dragedFile.offsetWidth / 2);
            let dy = fileGrid.children[i].offsetLeft + fileGrid.children[i].offsetHeight / 2 - (dragedFile.offsetLeft + dragedFile.offsetHeight / 2);
            
            let length = Math.sqrt(dx * dx + dy * dy);

            if (length < minLength) {
                minLength = length;
                nearestFile = fileGrid.children[i];
            }
        }

        if (nearestFile != ghost) {
            let temp_ghost = nearestFile.cloneNode(false);
            fileGrid.insertBefore(temp_ghost, nearestFile);
    
            fileGrid.replaceChild(nearestFile, ghost);
            ghost = temp_ghost;
        }
    }
  
    document.onmouseup = function() {
        dragedFile.removeAttribute('style');

        fileGrid.replaceChild(dragedFile, ghost);

        document.onmousemove = null;
        document.onmouseup = null;
    }
};

document.addEventListener('click', hideController);
document.addEventListener('contextmenu', showController);
document.addEventListener('contextmenu', selectCurrentFile);
document.addEventListener('mousedown', dragAndDropFile);

controllerBtn[0].getElementsByTagName('input')[0].addEventListener('change', createFileHandler);
controllerBtn[1].getElementsByTagName('input')[0].addEventListener('click', renameFileHandler);
controllerBtn[2].getElementsByTagName('input')[0].addEventListener('click', deleteFileHandler);
