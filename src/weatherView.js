export class weatherView {
  weatherForecastDiv;
  cityName;
  currentTemp;
  weatherGrid;

  constructor() {
    this.weatherForecastDiv = document.querySelector("#forecast-container");
    this.cityName = document.querySelector("#city-name");
    this.currentTemp = document.querySelector("#current-temp");
    this.weatherGrid = document.querySelector("#weather-grid");
  }

  updateCityName(newCity) {
    this.cityName.classList.remove("visible");

    setTimeout(() => {
      this.cityName.textContent = newCity;
      this.cityName.classList.add("visible");
    }, 250);
  }

  addToGrid() {}
  clearGrid() {
    while (this.weatherGrid.firstChild) {
      this.weatherGrid.removeChild(this.weatherGrid.lastChild);
    }
  }

  updateCurrentTemp(temp, CorF) {
    this.currentTemp.classList.remove("visible");

    setTimeout(() => {
      if (typeof temp === "number" && !Number.isNaN(temp)) {
        if (CorF === "C") {
          this.currentTemp.textContent = temp + "\u00B0C";
        } else if (CorF === "F") {
          this.currentTemp.textContent = temp + "\u00B0F";
        }
      } else {
        this.currentTemp.textContent = "";
      }
      this.currentTemp.classList.add("visible");
    }, 250);
  }

  loadView() {
    this.updateCityName("loading");
    this.updateCurrentTemp("loading");
  }

  errorView() {
    this.updateCityName("City not found!");
    this.updateCurrentTemp("");
  }

  updateGrid() {}

  //UNFINISHEDDD
  // updateGridTemp(dayArray, CorF, rounding) {
  //   for (let i = 0; i < dayArray.length; i++) {
  //     let day = dayArray[i];
  //     if (CorF === "C") {
  //       this.weatherGrid.children[i].textContent = rounding((day["temp"]-32)/(9/5));
  //     }
  //     else if (CorF === "F"){
  //       this.weatherGrid.children[i].textContent = day["temp"];
  //     }
  //   }
  // }
}
