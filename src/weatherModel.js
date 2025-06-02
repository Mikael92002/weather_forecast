export class weatherModel {
  city = null;
  retrievedCity = null;
  currentConditions = {}
  dayArray = [];
  gif = null;
  APIformat =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  APIkey = "D45NABX95DYWXEZMFRMCSZCZ2";

  constructor(city) {
    this.city = city;
  }

  async getWeatherInfo() {
    try {
      const response = await fetch(
        this.APIformat + this.city + "?key=" + this.APIkey
      );
      if (response.ok) {
        const json = await response.json();

        // for in loop just returns keys (can use array[key] to retrieve object)
        // for of loop returns values of keys
        for (let dayNumber of json.days) {
          console.log(dayNumber.hours); // returns 15 days with hour as key
          // containing 24 values 0-23
          this.dayArray.push(dayNumber.hours); //add days to dayArray
        }
         this.retrievedCity = json["resolvedAddress"] //city name to display
         this.currentConditions = json["currentConditions"] //curr conditions

        //response 400 if bad request!!!
        return json;
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      console.error("Error: " + error.message);
      return error.message;
    }
  }
}