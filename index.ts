
import express,{Express} from 'express';
import beeperController from './src/controllers/beeperController';

const app: Express = express();

app.use(express.json());

app.use('/beeper', beeperController);

app.listen(process.env.PORT,():void => {
    console.log(`Server is running on port, ${process.env.PORT}`); 
})