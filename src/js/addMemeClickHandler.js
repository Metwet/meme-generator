function addMemeClickHandler(meme){    
    meme.addEventListener('click', ()=>{
        const memeplace = document.querySelector(".memeplace");

        const selectedMeme = new Image();
        selectedMeme.src = meme.src;

        memeplace.innerHTML = '';
        memeplace.appendChild(selectedMeme);

        const textOverlay = document.createElement('div');
        textOverlay.classList.add('text-overlay');
        textOverlay.innerHTML = 'введите мемный текст';
        memeplace.appendChild(textOverlay);

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = textOverlay.textContent;
        textInput.classList.add('text-overlay');
        textInput.style.display = "none";
        memeplace.appendChild(textInput);

        dragElement(textOverlay, memeplace)

        textInput.addEventListener('blur', ()=>{
            textOverlay.innerHTML = textInput.value;
            textInput.style.display = "none";
            textOverlay.style.display = "block";
        });

        textOverlay.addEventListener('dblclick', ()=>{
            textOverlay.style.display = "none";
            textInput.style.display = "block";
            textInput.focus();
        })
    });
}

function dragElement(element, parentElement) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX - parentElement.getBoundingClientRect().left;
            const newY = e.clientY - offsetY - parentElement.getBoundingClientRect().top;

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

export {addMemeClickHandler};