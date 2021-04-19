import dbConnect from "../../../Components/Models/Todos"
import Todos from "../../../Components/Models/Todos"

dbConnect();

export default async (req, res) => {
    const {
        query: {id},
        method
    } = req;
    switch(method) {
        case 'GET':
            try {
                const todos = await Todos.findById(id)
                res.status(200).json(todos)
            }catch(e){
                res.status(400).send("Error Getting Todo by id");
            }
            break;
            case 'PUT':
                try {
                    const todo = await Todos.findByIdAndUpdate(id, req.body, {
                        new: true,
                        runValidators: true
                    })
                    res.status(200).json(todo)
                } catch(e) {
                    res.status(400).send("Error updating Todo");
                }
                break;
                case "DELETE":
                try {
                    const deleted = await Todos.deleteOne({_id: id});
                    if(!!deleted) {
                        const todos = await Todos.find({})
                        return res.status(200).json(todos)
                    } else {
                        res.status(400).send("Error deleting Todo")
                    }
                } catch (error) {
                    res.status(400).send("Error deleting Todo")
                }
                break;
                default:                    
                res.status(400).send("Something went wrong");
                break;

    } 
}