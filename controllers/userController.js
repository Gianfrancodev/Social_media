const { User, Thought } = require('../models')
const mongoose = require('mongoose')

module.exports = {
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts')

            if(!user) return res.status(404).json({ message: 'No user found' })

            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts')
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body)
            return res.json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
}