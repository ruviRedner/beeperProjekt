import express,{Request,Router,Response} from 'express';
import beeperService from '../services/beeperService';

const beeperRouter: Router = express.Router();

beeperRouter.post('/api/beepers',async (req: Request, res: Response):Promise<void> => {
    try {
        
            res.status(200).json({
                err:false,
                message:"data saved sucsspuly",
                data:undefined
            })
      
       
        
    } catch (err) {
        res.status(400).json({
            err:true,
            message: "sorry",
            data:null
        })
    }
})

beeperRouter.get('/api/beepers', async (req: Request, res: Response): Promise<void> => {
    try {
       
        res.status(200).json({
            err: false,
            message: "data fetched successfully",
            data: undefined
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.get('/api/beepers/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200).json({
            err: false,
            message: "data fetched successfully",
            data: undefined
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.get('/api/beepers/status/:status', async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200).json({
            err: false,
            message: "data fetched successfully",
            data: undefined
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.put('/api/beepers/:id/status', async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200).json({
            err: false,
            message: "data updated successfully",
            data: undefined
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.delete('/api/beepers/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        
        res.status(200).json({
            err: false,
            message: "data deleted successfully",
            data: undefined
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})





export default beeperRouter