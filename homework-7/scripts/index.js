const fileGrid = document.getElementById('file-grid');

const controller = document.getElementById('file-grid-controller');
const controllerBtn = controller.querySelectorAll('label');

let currentFile = null;

function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

const setNormalPosition = (element, x, y) => {
    if (x < document.documentElement.clientWidth / 2) {
        element.style.left = x + 'px';
        element.style.removeProperty('right');
    } else {
        element.style.right = document.documentElement.clientWidth - x + 'px';
        element.style.removeProperty('left');
    }
    
    if (y < document.documentElement.clientHeight / 2) {
        element.style.top = y + getBodyScrollTop() + 'px';
        element.style.removeProperty('bottom');
    } else {
        element.style.bottom = document.documentElement.clientHeight - getBodyScrollTop() - y + 'px';
        element.style.removeProperty('top');
    }
};

const isFile = (element) => {
    return element.classList ? element.classList.contains('file') : false;
};

const selectCurrentFile = (event) => {
    event.preventDefault();

    if (isFile(event.target)) {
        currentFile = event.target;
    } else {
        currentFile = null;
    }
};

const getReadableFileSizeString = (fileSizeInBytes) => {
    let i = 0;
    let byteUnits = [' B', ' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    
    while (fileSizeInBytes > 1000) {
        fileSizeInBytes = fileSizeInBytes / 1000;
        i++;
    }

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

const buildFileView = (name, size) => {
    let readebleFileSize = getReadableFileSizeString(size)
    return `<div class="file" title="${name}, ${readebleFileSize}">
                <div class="file__name">
                    ${name}
                </div>
                <div class="file__size">
                    ${readebleFileSize}
                </div>
            </div>`;
};

const createFileHandler = (event) => {
    let files = controllerBtn[0].getElementsByTagName('input')[0].files;

    for (let i = 0; i < files.length; i++) {
        fileGrid.innerHTML += buildFileView(files[i].name, files[i].size);
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
    if (currentFile) currentFile.remove();
};

const isController = (element) => [...controllerBtn].includes(element);

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

    setNormalPosition(controller, event.clientX, event.clientY);
    
    controller.classList.remove('block--hide');
};

const mouseDownHandler = (event) => {
    event.preventDefault();

    if(!isController(event.target)) {
        hideController();
    }
    
    if (!isFile(event.target) || event.button) return;

    let dragedFile = event.target;

    let currentWidth = dragedFile.clientWidth;
    let ghostFile = dragedFile.cloneNode(false);

    ghostFile.classList.add('file--ghost');

    fileGrid.insertBefore(ghostFile, dragedFile);
    document.body.appendChild(dragedFile);

    dragedFile.style.width = currentWidth + 'px';
    dragedFile.style.position = 'fixed';
    dragedFile.style.zIndex = 1000;
  
    const moveAt = (e) => {
        dragedFile.style.left = e.clientX - dragedFile.offsetWidth / 2 + 'px';
        dragedFile.style.top = e.clientY - dragedFile.offsetHeight / 2 + 'px';
    }
  
    const onMoveHandler = (e) => {
        moveAt(e);

        if (!fileGrid.children.length) return;

        let minLength = 9999;
        let nearestFile = ghostFile;

        for (let i = 0; i < fileGrid.children.length; i++) {
            let dx = fileGrid.children[i].offsetTop  + fileGrid.children[i].offsetWidth / 2 - (dragedFile.offsetTop + getBodyScrollTop() + dragedFile.offsetWidth / 2);
            let dy = fileGrid.children[i].offsetLeft + fileGrid.children[i].offsetHeight / 2 - (dragedFile.offsetLeft + dragedFile.offsetHeight / 2);
            
            let length = Math.sqrt(dx * dx + dy * dy);

            if (length < minLength) {
                minLength = length;
                nearestFile = fileGrid.children[i];
            }
        }

        if (nearestFile != ghostFile) {
            let tempGhost = nearestFile.cloneNode(false);
            tempGhost.classList.add('file--ghost');
            fileGrid.insertBefore(tempGhost, nearestFile);
    
            fileGrid.replaceChild(nearestFile, ghostFile);
            ghostFile = tempGhost;
        }
    };

    const onMouseUpHandler = () => {
        dragedFile.removeAttribute('style');

        fileGrid.replaceChild(dragedFile, ghostFile);

        document.onscroll = null;
        document.onmousemove = null;
        document.onmouseup = null;
    }

    moveAt(event);

    document.onmousemove = onMoveHandler;
    document.onscroll = onMoveHandler;
    document.onmouseup = onMouseUpHandler;
};

document.addEventListener('click', hideController);
document.addEventListener('contextmenu', showController);
document.addEventListener('contextmenu', selectCurrentFile);

document.addEventListener('mousedown', mouseDownHandler);

controllerBtn[0].getElementsByTagName('input')[0].addEventListener('change', createFileHandler);
controllerBtn[1].getElementsByTagName('input')[0].addEventListener('click', renameFileHandler);
controllerBtn[2].getElementsByTagName('input')[0].addEventListener('click', deleteFileHandler);
