import Note from "../models/Note.js";

// get all notes
export const getAllNotes = async (req, res) => {
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    }catch(error){
        console.error('Error fetching notes:', error);
        res.status(500).json({message: 'Server Error'});
    }
}

// create note
export const createNote = async (req,res)=>{
    try{
        const {title, content} = req.body;
        //check if title and content are provided 
        if(!title || !content){
            return res.status(400).json({message: 'Title and Content are required'});
        }
        const newNote = await Note.create({title, content});
        res.status(200).json({message: 'Note created successfully', note: newNote});
    }catch(error){
        console.error('Error in creating', error);
        res.status(500).json({message: 'Server Error'});
    }
}

// show note by id
export const getNote = async (req, res) => {
    try{
        const id = req.params.id;
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(note);
    }catch(error){
        console.error('Error In Finding The Note', error);
        res.status(500).json({message: 'Server Error'});
    }
}   


// delete note by id
export const deleteNote = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(deletedNote);
    }catch(error){
        console.error('Error In Finding The Note', error);
        res.status(500).json({message: 'Server Error'});
    }
}

// Update Note by id
export const updateNote = async (req, res) => {
    try{
        const {title, content} = req.body;
        console.log(title, content);
        const id = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(id,{title, content}, {new: true});
        if(!updatedNote){
            return res.status(404).json({message: 'Note not found'});
        }
        res.status(200).json(updatedNote);
    }catch(error){
        console.error('Error In Finding The Note', error);
        res.status(500).json({message: 'Server Error'});
    }
}   