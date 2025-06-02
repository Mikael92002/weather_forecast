// To import files:
import "./style.css";
import {weatherModel} from "./weatherModel.js";
import {weatherView} from "./weatherView.js";
import {weatherController} from "./weatherController.js";
// import imgSrc from "./odin.png"
const app = new weatherController(new weatherModel(), new weatherView());