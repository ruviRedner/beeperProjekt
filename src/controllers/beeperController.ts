import express,{Request,Router,Response} from 'express';
import beeperService from '../services/beeperService';
import BeeperStatus from '../utils/enumStatus';

const beeperRouter: Router = express.Router();

beeperRouter.post('/',async (req: Request, res: Response):Promise<void> => {
    try {
        const beepers = await beeperService.createBeeper(req.body);
        if (!beepers) {
            throw new Error('Failed to save beeper');
        }
            res.status(200).json({
                err:false,
                message:"data saved sucsspuly",
                data:beepers
            })   
        } catch (err) {
        res.status(400).json({
            err:true,
            message: "sorry",
            data:null
        })
    }
})

beeperRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        
            const beepers = await beeperService.getBeepers();
            if (!beepers) {
                throw new Error('Failed to fetch beepers');
            }
            res.status(200).json({
                err: false,
                message: "data fetched successfully",
                data:beepers
            })
            } catch (err) {
              res.status(400).json({
              err: true,
              message: "sorry",
              data: null
        })
    }
})
beeperRouter.get('/status/:status', async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper = await beeperService.getBeepersByStatus(req.params.status as BeeperStatus);
        if (!beeper) {
            throw new Error('Failed to fetch beepers');
        }
        res.status(200).json({
            err: false,
            message: "data fetched successfully",
            data: beeper
        })
        } catch (err) {
            res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.put('/:id/status', async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper = await beeperService.updateStatusBeeper(req.params.id, req.body.status, req.body.Latitude,req.body.Longitude);
        if (!beeper) {
            throw new Error('Failed to update beeper');
        }
        res.status(200).json({
            err: false,
            message: "data updated successfully",
            data: beeper
        })
        } catch (err) {
            res.status(400).json({
            err: true,
            message: "sorry",
        })
    }
})

beeperRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper = await beeperService.deleteBeeper(req.params.id);
        if (!beeper) {
            throw new Error('Failed to delete beeper');
        }
        res.status(200).json({
            err: false,
            message: "data deleted successfully",
            data: beeper
        })
    } catch (err) {
        res.status(400).json({
            err: true,
            message: "sorry",
            data: null
        })
    }
})

beeperRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const beeper = await beeperService.getBeeperById(req.params.id);
        if (!beeper) {
            throw new Error('Failed to fetch beeper');
        }
        res.status(200).json({
            err: false,
            message: "data fetched successfully",
            data: beeper
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