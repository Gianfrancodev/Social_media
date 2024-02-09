const { User, Thought } = require('../models')
const mongoose = require('mongoose')

module.exports = {
    async getThought(req, res){
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) return res.status(404).json({ message: 'No thought found' })
            res.json(thought)
        } catch (err) {
            console.error({ message: err })
            return res.status(500).json(err)
        }
    },

    async getThoughts(req, res){
        try {
            const thoughts = await Thought.find()
            res.json(thoughts)
        } catch (err) {
            console.error({ message: err })
            return res.status(500).json(err)
        }
    },

    async createThought(req, res){
        try {
            const user = await User.findOne({ username: req.body.username }).select('__v')
            if(!user) return res.status(404).json({ message: 'No user found' })

            const thought = await Thought.create(req.body)
            if(!thought) return res.status(500).json({ message: 'Creation failure' })

            await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: {thoughts: thought._id.toString()}}
            )      
            res.json(thought)

        } catch (err) {
            console.error({ message: err })
            return res.status(500).json(err)
        }
    },
}
