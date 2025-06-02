export class weatherView {
  weatherForecastDiv;
  cityName;
  currentTemp;
  weatherGrid;

  constructor() {
    this.weatherForecastDiv = document.querySelector("#forecast-container");
    this.cityName = document.querySelector("#city-name");
    this.currentTemp = document.querySelector("#current-temp");
    this.weatherGrid = document.querySelector("weather-grid");
  }

  updateCityName(newCity) {
    this.cityName.classList.remove("visible");

    setTimeout(() => {
      this.cityName.textContent = newCity;
      this.cityName.classList.add("visible");
    }, 250);
  }

  addToGrid() {}

  updateCurrentTemp(temp, CorF) {
    this.currentTemp.classList.remove("visible");

    setTimeout(() => {
      if (CorF === "C") {
        this.currentTemp.textContent = temp + "\u00B0C";
      }
      else if (CorF === "F"){
        this.currentTemp.textContent = temp + "\u00B0F";
      }
      else{
        this.currentTemp.textContent = temp;
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

  updateGrid(){
    
  }
}
