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
    public static async getBeepersByStatus(status:string): Promise<Beeper[]> {
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
}
     
