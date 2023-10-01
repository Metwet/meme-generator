import { addMemeClickHandler } from "./addMemeClickHandler.js";

function addMemeImgFile() {
    const memesContainer = document.querySelector(".pick-meme");
    const newImage = new Image();
    const file = imageInput.files[0];

    if(file){
        const reader = new FileReader();

        reader.onload = (event)=>{
            newImage.src = event.target.result;
            newImage.alt = "Your img";
            newImage.classList.add("meme");

            const newMemeContainer = document.createElement("div");
            newMemeContainer.classList.add("meme");
            newMemeContainer.appendChild(newImage);

            memesContainer.insertBefore(newMemeContainer, imageInput.parentElement);
            
            imageInput.value = null;

            addMemeClickHandler(newImage);
        }

        reader.readAsDataURL(file);
    }
}

export {addMemeImgFile};