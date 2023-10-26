function addMemeClickHandler(meme){    
    meme.addEventListener('click', ()=>{
        const memeplace = document.querySelector(".memeplace");
        const workspace = document.querySelector(".workspace");

        const selectedMeme = new Image();
        selectedMeme.src = meme.src;

        memeplace.innerHTML = '';
        memeplace.appendChild(selectedMeme);

        const textOverlay = document.createElement('div');
        textOverlay.classList.add('text-overlay');
        textOverlay.innerHTML = 'мемный текст (двойной клик чтобы исправить)';
        memeplace.appendChild(textOverlay);

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = textOverlay.textContent;
        textInput.classList.add('input-overlay');
        textInput.style.display = "none";
        memeplace.appendChild(textInput);

        let colorInput = document.querySelector('#colorInput');
        let sizeInput = document.querySelector('#sizeInput');
        let saveButton = document.querySelector('#saveButton');

        if (!colorInput) {
            colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.id = 'colorInput';
            colorInput.value = '#ffffff';
            workspace.appendChild(colorInput);
        }

        if (!sizeInput) {
            sizeInput = document.createElement('input');
            sizeInput.type = 'range';
            sizeInput.id = 'sizeInput';
            sizeInput.min = 10;
            sizeInput.max = 70;
            sizeInput.value = 28;
            workspace.appendChild(sizeInput);
        }

        if(!saveButton){
            saveButton = document.createElement('button');
            saveButton.id = 'saveButton';
            saveButton.textContent = 'Сохранить мем';
            workspace.appendChild(saveButton);
        }
        
        saveButton.addEventListener('click', () => {
            const canvas = document.createElement('canvas');
            canvas.width = memeplace.offsetWidth;
            canvas.height = memeplace.offsetHeight;
            const ctx = canvas.getContext('2d');
        
            const backgroundImage = new Image();
            backgroundImage.src = memeplace.querySelector('img').src;
            
            backgroundImage.onload = () => {
                ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
                
                let text = textOverlay.textContent;
                const fontSize = getComputedStyle(textOverlay).fontSize;
                const textTransform = getComputedStyle(textOverlay).textTransform;
                const textColor = getComputedStyle(textOverlay).color;
                const fontWeight = getComputedStyle(textOverlay).fontWeight;
                const fontFamily = getComputedStyle(textOverlay).fontFamily;
        
                ctx.font = `${fontWeight} ${fontSize} ${fontFamily}`;
                ctx.fillStyle = textColor;
                
                if (textTransform === 'uppercase') {
                    text = text.toUpperCase();
                } else if (textTransform === 'lowercase') {
                    text = text.toLowerCase();
                }
                
                ctx.fillText(text, parseFloat(textOverlay.style.left), parseFloat(textOverlay.style.top));
        
                const memeImage = canvas.toDataURL('image/png');
        
                const downloadLink = document.createElement('a');
                downloadLink.href = memeImage;
                downloadLink.download = 'meme.png';
                downloadLink.click();
            };
        });                                    

        colorInput.addEventListener('input', () => {
            textOverlay.style.color = colorInput.value;
        });

        sizeInput.addEventListener('input', () => {
            textOverlay.style.fontSize = `${sizeInput.value}px`;
        });

        textInput.addEventListener('blur', ()=>{
            textOverlay.innerHTML = textInput.value;
            textInput.style.display = "none";
            textOverlay.style.display = "block";
        });

        textOverlay.addEventListener('dblclick', ()=>{
            textOverlay.style.display = "none";
            textInput.style.display = "block";
            textInput.style.top = textOverlay.style.top;
            textInput.style.left = textOverlay.style.left;
            textInput.style.color = textOverlay.style.color;
            textInput.style.fontSize = textOverlay.style.fontSize;
            textInput.focus();
        });

        dragElement(textOverlay, memeplace);
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

            if(newX > 0 && newX < parentElement.getBoundingClientRect().width - element.getBoundingClientRect().width / 3){
                element.style.left = `${newX}px`;
            }
            if(newY > 0 && newY < parentElement.getBoundingClientRect().height - element.getBoundingClientRect().height){
                element.style.top = `${newY}px`;
            }
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

export {addMemeClickHandler};