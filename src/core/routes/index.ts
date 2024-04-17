import { Router, Request, Response } from "express";
import mediator from "../mediator";

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    console.log("Routing works", req.body, req.query.type);
    
    try {
        const type = req.query.type;
        if(!type){
            throw Error("Incompatible type");
        }
        const command: ICommand<IPayload> | undefined = mediator.getCommandByType(String(type));
        if(!command){
            throw new Error("Command not found!");
        }
        const response = await mediator.send(command, req.body);
        console.log(response);
        
        res.send(response);
    } catch (error) {
        res.send(error).sendStatus(500);
    }
})

export default router;