
import express,{Express} from 'express';
import beeperController from './src/controllers/beeperController';

const app: Express = express();

const port: number = 5050;

app.use(express.json());

app.use('/api/beepers', beeperController);

app.listen(port,():void => {
    console.log(`Server is running on port, ${port}`); 
})
