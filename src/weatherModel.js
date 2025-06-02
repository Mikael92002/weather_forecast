class weatherModel{
    city;
    temperature;
    gif;
    APIformat = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"

    constructor(city, temperature){
        this.city = city;
    }

    async getWeatherInfo(){
        const response = await fetch(this.APIformat + this.city);
        return response;
    }
}