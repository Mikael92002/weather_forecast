import {weatherModel} from 'weatherModel.js';

class weatherController{
    model;
    view;
    constructor(model, view){
        this.model = model;
        this.view = view;
    }

    logRequest(){
        console.log(this.model.getWeatherInfo());
    }
}