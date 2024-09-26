// import {v4} from "uuid";
import BeeperStatus from "../utils/enumStatus";
class Beeper {
    public id: number;
    public created_at: Date;
    public status: string
    public Longitude : number
    public Latitude : number
    public detonated_at?: Date
    
    constructor(
        public name: string, 
    ) {
        this.id = +Math.random().toString().split(".")[1]
        this.created_at = new Date();
        this.status = "manufactured"
        this.Longitude = 0
        this.Latitude = 0
        
        
        
    }
}

export default Beeper;