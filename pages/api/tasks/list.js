import dbConnect from "../../../utils/DBconnect"
import Todos from "../../../Components/Models/Todos"


dbConnect();

export default async (req, res) => {
    const {method} = req;

    switch(method) {
        case 'GET':
            try {
                const todos = await Todos.find({})
                res.status(200).json(todos)
            }catch(e){
                res.status(400).send("Error getting Todo's list");
            }
            break;
            case 'POST':
                try {
                    const todo = await Todos.create(req.body)
                    res.status(200).json(todo)
                } catch(e) {
                    
                    res.status(400).send("Error creating a new Todo");
                }
                break;
                default:
                res.status(400).send("Something went wrong");
                break;

    }
}