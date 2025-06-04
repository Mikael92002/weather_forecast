export class weatherModel {
  city = null;
  retrievedCity = null;
  currentConditions = {}
  dayArray = [];
  gif = null;
  APIformat =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  APIkey = "D45NABX95DYWXEZMFRMCSZCZ2";
  loadMode;

  constructor(city) {
    this.city = city;
  }

  async getWeatherInfo() {
    this.clearDayArray();
    try {
        this.loadMode = true;
      const response = await fetch(
        this.APIformat + this.city + "?key=" + this.APIkey
      );
      if (response.ok) {
        const json = await response.json();
        this.loadMode = false;

        // for in loop just returns keys (can use array[key] to retrieve object)
        // for of loop returns values of keys
        for (let day of json.days) {
        //    console.log(day); // returns 15 days (length)
          this.dayArray.push(day); //add days to dayArray
        }

         this.retrievedCity = json["resolvedAddress"] //city name to display
         this.currentConditions = json["currentConditions"] //curr conditions
        
        return json;
      } else {
        //response 400 if bad request!!!
        throw new Error(response.status)
      }
    } catch (error) {
      console.error("Error: " + error.message);
      return error.message;
    }
  }

clearDayArray(){
    this.dayArray = []
}

}