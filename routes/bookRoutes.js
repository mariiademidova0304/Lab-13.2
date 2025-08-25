const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.post('/', async (req,res) => {
    try{
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch(error) {
        res.status(400).json({error: `Failed to create post`, details: error.message});
    }
})

router.get('/', async (req,res) => {
    try{
        const books = await Book.find({})
        if(books.length > 0){
        res.status(200).send(books);
        } else{
            res.status(404).json({error: 'Books not found'});
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
})

router.get('/:id', async (req,res) => {
    const bookID = req.params.id;
    try{
        const foundBook = await Book.findById(bookID);
        if(foundBook){
        res.status(200).json(foundBook);
        } else{
            res.status(404).json({error: 'Book not found'}); 
        }
    } catch(error) {
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
})

router.put('/:id', async (req,res) => {
    const bookID = req.params.id;
    const updatedData = req.body;
    const options = {new: true};
    try{
        const updatedBook = await Book.findByIdAndUpdate(bookID, updatedData, options);
        if(updatedBook){
        res.status(200).json(updatedBook);
        } else{
            res.status(404).json({error: 'Book not found'}); 
        }
    }catch(error){
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
})

router.delete('/:id', async (req,res) => {
    const bookID = req.params.id;
    try{
        const deletedBook = await Book.findByIdAndDelete(bookID);
        if(deletedBook){
        res.status(200).json({message: `Book ${bookID} deleted`});
        } else{
            res.status(404).json({error: 'Book not found'}); 
        }
    }catch(error){
        res.status(500).json({error: 'Internal server error', details: error.message});
    }
})

module.exports = router;