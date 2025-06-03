import cloudyImg from "./cloudy.png";
import sunnyImg from "./sunny.png";
import rainImg from "./rain.png";

export class weatherController {
  model;
  view;
  searchButton;
  inputField;
  C;
  F;
  weatherGrid;
  hourlyGrid;
  weeklyTitle;
  dailyTitle;

  constructor(model, view) {
    this.model = model;
    this.view = view;

    //hourly weather grid:
    this.dailyTitle = document.querySelector("#daily-title");
    this.hourlyGrid = document.querySelector("#hourly-grid")
    //weekly weather grid:
    this.weeklyTitle = document.querySelector("#weekly-title");
    this.weatherGrid = document.querySelector("#weather-grid");
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
      this.updateGridController();
    });

    //F:
    this.F.addEventListener("click", () => {
      this.F.classList.add("active");
      this.C.classList.remove("active");
      this.view.updateCurrentTemp(this.model.currentConditions["temp"], "F");
      this.updateGridController()
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
        this.view.clearGrid();
        this.model.currentConditions = "";
        this.weeklyTitle.classList.remove("visible");
        this.dailyTitle.classList.remove("visible");
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
        this.updateGridController();
        this.weeklyTitle.classList.add("visible");
        this.dailyTitle.classList.add("visible")
      }
    }
  }

  roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
  }

  updateGridController() {
    this.view.clearGrid();
    this.createWeeklyGrid();
    this.createHourlyGrid();
  }

  createWeeklyGrid(){
    for (let i = 0; i < this.model.dayArray.length; i++) {
      let day = this.model.dayArray[i];
      let dayNumber = new Date(day.datetime).getDay();

      //create weekly grid elements:
      let weatherDiv = document.createElement("div");
      let dayDiv = document.createElement("div");
      let tempDiv = document.createElement("div");
      let iconDiv = document.createElement("img");
      dayDiv.id = "day-div";
      tempDiv.id = "temp-div";

      dayDiv.textContent = this.dayNumberToDay(dayNumber);
      
      if (this.C.classList.contains("active")) {
        tempDiv.textContent = this.roundToOneDecimal((day["temp"] - 32) / (9 / 5)) + "\u00B0C";
      } else {
        tempDiv.textContent = day["temp"] + "\u00B0F";
      }

      iconDiv.src = this.iconSelect(day.conditions.toString());
      iconDiv.style.height = "100%"

      weatherDiv.id = "weather-div";
      //console.log(day);

      let hour = day["hours"];
      //console.log(hour);

      for (let j = 0; j < hour.length; j++) {
        //console.log(hour[j]["datetime"]);
      }
      weatherDiv.append(dayDiv, iconDiv, tempDiv);
      this.weatherGrid.appendChild(weatherDiv);
    }
  }

  createHourlyGrid(){
    let today = this.model.dayArray[0];
    let hourArray = today.hours
    for(let i = 0;i<hourArray.length;i++){
      let hour = hourArray[i];
      let time = hour.datetime.slice(0,hour.datetime.length-3);
      let conditions = hour.conditions;
      let temp = hour.temp;
      let realTime = this.MilitaryTimeConverter(time);
      console.log(conditions);
      console.log(temp);

      let containerDiv = document.createElement("div");
      let hourDiv = document.createElement("div");
      let tempDiv = document.createElement("div");
      let iconDiv = document.createElement("img");

      containerDiv.id = "hourly-container-div";

      hourDiv.textContent = realTime + ": ";
      if(this.C.classList.contains("active")){
        tempDiv.textContent = this.roundToOneDecimal((temp-32)/(9/5)) + "\u00B0C"
      }
      else{
        tempDiv.textContent = temp + "\u00B0F";
      }

      iconDiv.src = this.iconSelect(conditions);
      iconDiv.style.width = "40px";

      containerDiv.append(hourDiv, iconDiv, tempDiv);
      this.hourlyGrid.append(containerDiv);
    }
  }

  iconSelect(condition) {
    if (condition.toLowerCase().includes("cloudy")) {
      return cloudyImg;
    }
    else if(condition.toLowerCase().includes("clear")){
      return sunnyImg;
    }
    else if(condition.toLowerCase().includes("rain")){
      return rainImg;
    }
    else{
      return sunnyImg;
    }
  }

  dayNumberToDay(num){
    if(num === 0){
      return "Mon"
    }
    else if (num === 1){
      return "Tue"
    }
    else if (num === 2){
      return "Wed"
    }
    else if (num === 3){
      return "Thu"
    }
    else if (num === 4){
      return "Fri"
    }
    else if (num === 5){
      return "Sat"
    }
    else if (num === 6){
      return "Sun"
    }
  }

  MilitaryTimeConverter(hour){
    let firstTwoNums = hour.slice(0,2);

    if(firstTwoNums === "00"){
      return "12:00 a.m."
    }
    else if(Number(firstTwoNums)<12){
      return firstTwoNums + ":00 a.m."
    }
    else if(firstTwoNums === "12"){
      return "12:00 p.m."
    }
    else if(Number(firstTwoNums)>12){
      return firstTwoNums-12 + ":00 p.m."
    }
  }
}
