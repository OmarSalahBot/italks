import express from 'express';
import { getAllNotes, getNote, deleteNote, createNote , updateNote } from '../Controllers/notesControllers.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNote);
router.delete('/:id', deleteNote);
router.put('/:id', updateNote);
router.post('/', createNote);

export default router;
