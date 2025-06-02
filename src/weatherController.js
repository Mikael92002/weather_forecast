import { weatherModel } from "./weatherModel.js";

export class weatherController {
  model;
  view;
  searchButton;
  inputField;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    // searchButton:
    this.searchButton = document.querySelector("#search-button");
    this.searchButton.addEventListener("click", async () => {
      if (this.inputField.value !== "") {
        model.city = this.inputField.value;
        await this.model.getWeatherInfo();
      }
    });

    //inputField:
    this.inputField = document.querySelector("#search-input");
    this.inputField.addEventListener("keydown",  async (event) => {
      if (event["key"] !== undefined) {
        if (event["key"].toLowerCase() === "enter") {
          if (this.inputField.value !== "") {
            model.city = this.inputField.value;
            let result = await this.model.getWeatherInfo();
            if(result === "400"){
                this.inputField.value = "WRONG CITY";
                console.log("ERROR ERROR ERROR");
            }
            else{
                console.log(this.model.getWeatherInfo());
            }
          }
        }
      }
    });
  }

  
}
