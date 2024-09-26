import {v4} from "uuid";
class Beeper {
    public id: string;
    public dateCreated: Date;
    public explosionDate: Date;
    constructor(
        public beeperName: string,
        public Longitude : number,
        public Latitude : number


    ) {
        this.id = v4();
        this.dateCreated = new Date();
        this.explosionDate = new Date();
    }
}