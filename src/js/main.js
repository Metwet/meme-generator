import { addMemeClickHandler } from "./addMemeClickHandler.js";
import { addMemeImgFile } from "./addMemeImgFile.js";

const imageInput = document.getElementById("imageInput");
imageInput.addEventListener('change', addMemeImgFile);

const memes = document.querySelectorAll(".meme img");
memes.forEach(addMemeClickHandler);