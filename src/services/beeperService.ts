import { getNextStatus } from "../utils/founctionToUse";
import { getFileData,saveFile } from "../config/fileDataLayer";
import Beeper from "../models/Beeper";
import BeeperStatus from "../utils/enumStatus";


export default class BeeperService {
    public static async createBeeper(newBeeper: BeeperDTO): Promise<boolean> {
        //create new User
        const {name} = newBeeper
        const beeper:Beeper = new Beeper(name);
        //add to the user file
        //get the file as an array
        let beepers:Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        if(!beepers){
            beepers = [];
        }
        //push
        beepers.push(beeper);
        //save the array back to the file 
        return await saveFile('beepeers', beepers);         
     }
    public static async getBeepers(): Promise<Beeper[]> {
        //get the file as an array
        const beepers:Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        return beepers || [];        
 
    }
    public static async getBeeperById(id: string): Promise<Beeper | undefined> {
        //get the file as an array
        const beepers:Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        return beepers?.find(beeper => beeper.id === parseInt(id));
    }
    public static async getBeepersByStatus(status:BeeperStatus): Promise<Beeper[]> {
        //get the file as an array
        const beepers:Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        return beepers.filter(beeper => beeper.status == status);
    }
    public static async deleteBeeper(id: string): Promise<boolean> {
        //get the file as an array
        let beepers: Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        if(!beepers){
            return false;
        }
        //remove
        beepers = beepers.filter(beeper => beeper.id !== parseInt(id));
        //save the array back to the file 
        return await saveFile('beepeers', beepers);
    }
    public static async updateStatusBeeper(id: string, status?:string,Latitude?:number,Longitude?:number): Promise<boolean> {
        //get the file as an array
        let beepers: Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        if(!beepers){
            return false;
        }
        //find the beeper
        const beeperIndex = beepers.findIndex((beep) => beep.id === parseInt(id));
        if (beeperIndex === -1) {
            console.log("no such beeper");
            return false;  
        }
        const beeper = beepers[beeperIndex]
        //update the status and save
        const newStatus = status ? status : getNextStatus(beeper.status as BeeperStatus) 
         //check if allready det
         if(newStatus === BeeperStatus.detonated){
            console.log("you detonated the beeper");
            return false;
        }
        beeper.status = newStatus
        //check if status is deployed
        if(newStatus === BeeperStatus.deployed){
            console.log("you deployed the beeper");
            if(!Latitude || !Longitude){
                console.log("you did not provide location for deployment");
                return false;
            }
            //check if the long is in range
            if(Longitude < 35.04438 || Longitude > 36.59793 || Latitude < 33.01048 || Latitude > 34.6793){
                console.log("beeper is out of range");
                return false;
            } 
            beeper.Longitude = Longitude;
            beeper.Latitude = Latitude;
            setTimeout(() => {
                beeper.status = BeeperStatus.detonated;
                beeper.detonated_at = new Date();
                console.log("in 10 seconed the beeper will be detonated");
                   saveFile('beepeers', beepers);
            }, 10000);
        } 
        //save the array back to the file
        return await saveFile('beepeers', beepers);
    }
}