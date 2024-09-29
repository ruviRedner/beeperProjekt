import BeeperStatus from "./enumStatus";

export const  getNextStatus = (currStatus:BeeperStatus):BeeperStatus => {
    const statues = Object.values(BeeperStatus)
    const cuurIndex = statues.indexOf(currStatus)
    if(cuurIndex == -1 || cuurIndex == statues.length - 1) {
        console.log("no next status");  
        return currStatus;
    } 
    return statues[cuurIndex + 1];
}