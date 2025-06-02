// To import files:
import "./style.css";
import {weatherModel} from "./weatherModel.js";
import {weatherView} from "./weatherView.js";
import {weatherController} from "./weatherController.js";
// import imgSrc from "./odin.png"
// import many like this (???): import(file directory).then((module)=>{
    // })
const app = new weatherController(new weatherModel(), new weatherView());