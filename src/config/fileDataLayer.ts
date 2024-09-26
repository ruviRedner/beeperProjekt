import fs from 'fs/promises';

export const getFileData = async <T> (resourse:string):Promise<T[] | void> => {
    try {
        const data:string = await fs.readFile(`${__dirname}/../../../data/${resourse}.json`, 'utf-8');
        const parsaData: T[] = JSON.parse(data);
        return parsaData;
        
    } catch (error) {
        console.log(error);
    }
}


export const saveFile = async <T> (resourse:string,data:T[]):Promise<boolean> => {
    try {
        const jsonData: string = JSON.stringify(data,null,2);
        await fs.writeFile(`${__dirname}/../../../data/${resourse}.json`, jsonData,{
            encoding: 'utf-8'
        });
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }

}