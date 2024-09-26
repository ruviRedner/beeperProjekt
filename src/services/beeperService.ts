
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
    public static async updateStatusBeeper(id: string, status:string,Latitude?:number,Longitude?:number): Promise<boolean> {
        //get the file as an array
        let beepers: Beeper[] = await getFileData<Beeper>('beepeers') as Beeper[];
        if(!beepers){
            return false;
        }
        let beeper:Beeper|any = beepers.find(bep => bep.id == parseInt(id))
        if (!beeper) {
            console.log("no such beeper");  
        }
        beeper.status = status
        beepers.push(beeper)
       
        if(status === BeeperStatus.deployed){
            console.log("you deployed the beeper");
            if(!Latitude || !Longitude){
                console.log("you did not provide location for deployment");
                return false;
            }
            //check if the long is in range
            if(Longitude < 35.04438 || Longitude > 36.59793){
                console.log("beeper is out of range");
                return false;
            } 
            //check if the lat is in range
            if(Latitude < 33.01048 || Latitude > 34.6793){
                console.log("beeper is out of range");
                return false;
            }
            beeper.Longitude = Longitude;
            beeper.Latitude = Latitude;
            setTimeout(() => {
                beeper.status = BeeperStatus.detonated;
                beeper.detonated_at = new Date(); 
                   saveFile('beepeers', beepers);
            }, 10000);
        }
        //check if allready det
        if(status === BeeperStatus.detonated){
            console.log("you detonated the beeper");
            return false;
        }
        //check if no status at body
        if(status == ""){
            console.log(beeper.status)
              switch(beeper.status){
                case "manufactured":
                    beeper.status = BeeperStatus.assembled;
                    break;
                case "assembled":
                    beeper.status = BeeperStatus.shipped;
                    break;
                case "shipped":
                    beeper.status = BeeperStatus.deployed;
                    break;
                default:
                    console.log("no such status");
                    return false;
      
        }
        beepers.push(beeper)
        return await saveFile('beepeers', beepers);
    }

        //save the array back to the file
        return await saveFile('beepeers', beepers);
    }
}
               
 
    
    

     
