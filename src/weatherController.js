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
    this.searchButton.addEventListener("click", (event) =>
      this.searchEvent(event)
    );

    //inputField:
    this.inputField = document.querySelector("#search-input");
    this.inputField.addEventListener("keydown", (event) => {
      if (event["key"] !== undefined) {
        if (event["key"].toLowerCase() === "enter") {
          this.searchEvent(event);
        }
      }
    });
  }

  async searchEvent(event) {
    if (this.inputField.value !== "") {
      this.model.city = this.inputField.value;

      let result = await this.model.getWeatherInfo();

      //Fail/no city found:
      if (result === "400") {
        this.inputField.value = "WRONG CITY";
        console.log("ERROR ERROR ERROR");
      }

      //Success:
      else {
        console.log(result);
        for (let day of this.model.dayArray) {
          console.log("Day: " + JSON.stringify(day));
        }
        this.view.updateCityName(result["resolvedAddress"]);
      }
    }
  }
}
