export class weatherModel {
  city = null;
  temperature = null;
  gif = null;
  APIformat =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  APIkey = "D45NABX95DYWXEZMFRMCSZCZ2";

  constructor(city, temperature) {
    this.city = city;
  }

  async getWeatherInfo() {
    try {
      const response = await fetch(
        this.APIformat + this.city + "?key=" + this.APIkey
      );
      if (response.ok) {
        const json = await response.json();

        // for in loop just returns keys
        // for of loop returns values of keys
        // for(let dayNumber in JSON.days){
        //     console.log(dayNumber); //logs days 0-14
        //     //console.log(JSON.dayNumber.hours)
        // }
        for (let dayNumber of json.days) {
          console.log(dayNumber.hours); // returns 15 days with hour key
          // containing 24 values 0-24
        }

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