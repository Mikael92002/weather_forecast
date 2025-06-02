import { weatherModel } from "./weatherModel.js";

export class weatherController {
  model;
  view;
  searchButton;
  inputField;
  C;
  F;

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
          this.searchEvent();
        }
      }
    });

    //C:
    this.C = document.querySelector("#C");
    this.F = document.querySelector("#F");
    this.C.addEventListener("click", () => {
      this.C.classList.add("active");
      this.F.classList.remove("active");
      this.view.updateCurrentTemp(
        this.roundToOneDecimal(
          (this.model.currentConditions["temp"] - 32) / (9 / 5)
        ),
        "C"
      );
    });

    //F:
    this.F.addEventListener("click", () => {
      this.F.classList.add("active");
      this.C.classList.remove("active");
      this.view.updateCurrentTemp(this.model.currentConditions["temp"], "F");
    });
  }

  async searchEvent() {
    if (this.inputField.value !== "") {
      this.model.city = this.inputField.value;

      this.view.loadView();
      let result = await this.model.getWeatherInfo();

      //Fail/no city found:
      if (result === "400") {
        this.inputField.value = "WRONG CITY";
        console.log("ERROR ERROR ERROR");
        this.view.errorView();
      }

      //Success:
      else {
        console.log(result);
        for (let day of this.model.dayArray) {
          //console.log("Day: " + JSON.stringify(day));
        }

        //city name update:
        this.view.updateCityName(this.model.retrievedCity);

        //temp update:
        if (this.C.classList.contains("active")) {
          this.view.updateCurrentTemp(
            this.roundToOneDecimal(
              (this.model.currentConditions["temp"] - 32) / (9 / 5)
            ),
            "C"
          );
        } else {
          this.view.updateCurrentTemp(
            this.model.currentConditions["temp"],
            "F"
          );
        }

        //grid update:
      }
    }
  }

  roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }
}
