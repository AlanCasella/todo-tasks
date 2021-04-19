import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true, trim: true },
    description: {type: String, trim: true},
    completed: {type: Boolean, default: false}
})

const Todos = mongoose.models.Todos || mongoose.model("Todos", TodoSchema);

export default Todos;