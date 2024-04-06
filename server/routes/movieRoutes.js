const router = require('express').Router();
const movies = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");


//create
router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const movie = req.body;
        const newMovie = new Movie(movie);
        await newMovie.save();
        res.status(200).send({
            success: true,
            message: "Movie Added Successfully"
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
})

//Read
router.get('/get-all-movies', async (_, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send({
            success: true,
            message: "Movie fetched successfully",
            data: movies
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

//update
router.put("/update-movie", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie Updated successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

//delete
router.delete("/delete-movie", authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.query.movieId);
        response.send({
            success: true,
            message: "Movie Deleted Successfully"
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;