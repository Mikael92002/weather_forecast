export class hourModel{
    time;
    conditions;
    temp;

    constructor(time, temp, conditions){
        this.time = time;
        this.temp = temp;
        this.conditions = conditions;
    }
}