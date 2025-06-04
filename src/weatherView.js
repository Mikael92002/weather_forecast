export class weatherView {
  weatherForecastDiv;
  cityName;
  currentTemp;
  weatherGrid;
  hourlyGrid;
  weeklyTitle;
  dailyTitle;

  constructor() {
    this.weatherForecastDiv = document.querySelector("#forecast-container");
    this.cityName = document.querySelector("#city-name");
    this.currentTemp = document.querySelector("#current-temp");
    this.weatherGrid = document.querySelector("#weather-grid");
    this.hourlyGrid = document.querySelector("#hourly-grid");
    this.weeklyTitle = document.querySelector("#weekly-title");
    this.dailyTitle = document.querySelector("#daily-title");

    //forecast Divs:
    const forecastContainer = document.querySelector("#forecast-container");
    this.forecastContainerChildrenDivs = Array.from(forecastContainer.children);
  }

  updateCityName(newCity) {
    this.cityName.classList.remove("visible");

    setTimeout(() => {
      this.cityName.textContent = newCity;
      this.cityName.classList.add("visible");
    }, 500);
  }

  clearGrid() {
    while (this.weatherGrid.firstChild) {
      this.weatherGrid.removeChild(this.weatherGrid.lastChild);
    }
    while (this.hourlyGrid.firstChild) {
      this.hourlyGrid.removeChild(this.hourlyGrid.lastChild);
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
    }, 500);
  }

  loadView() {
    this.updateCityName("loading");
    this.updateCurrentTemp("loading");
    this.weeklyDailyTextHandling("loading");
  }

  errorView() {
    this.updateCityName("City not found!");
    this.updateCurrentTemp("");
    this.weeklyDailyTextHandling("remove");
  }

  visibilityOn(){
    this.forecastContainerChildrenDivs.forEach((divs) => {
      divs.classList.remove("visible")
    });

    setTimeout(() => {
      this.forecastContainerChildrenDivs.forEach((divs) =>{
        divs.classList.add("visible");
      })
    }, 500);
  }

  weeklyDailyTextHandling(operation){
    if(operation === "remove" || operation === "loading"){
      this.weeklyTitle.textContent = ""
    this.dailyTitle.textContent = ""
    }
    else{
      this.weeklyTitle.textContent = "Weekly Average Forecast";
      this.dailyTitle.textContent = "Today's Forecast";
    }
  }
}
