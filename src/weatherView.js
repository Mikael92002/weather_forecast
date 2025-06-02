export class weatherView {
  weatherForecastDiv;
  cityName;
  currentTemp;

  constructor() {
    this.weatherForecastDiv = document.querySelector("#forecast-container");
    this.cityName = document.querySelector("#city-name");
    this.currentTemp = document.querySelector("#current-temp")
  }

  updateCityName(newCity) {

    this.cityName.classList.remove("visible");

    setTimeout(() => {
      this.cityName.textContent = newCity;
      this.cityName.classList.add("visible");
    }, 250);
  }

  addToGrid(){

  }

  updateCurrentTemp(temp){
    this.currentTemp.classList.remove("visible");

    setTimeout(()=>{
        this.currentTemp.textContent = temp;
        this.currentTemp.classList.add("visible")
    }, 250)
  }
}
