const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    await UserModel.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({err}));
};

module.exports.getUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await UserModel.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ err }));
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await UserModel.findOneAndUpdate({ _id: req.params.id },
        {
            ...req.body
        })
        .then(() => res.status(200).json({ message: 'Utilisateur mis à jour' }))
        .catch(err => res.status(400).json({ err }));
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await UserModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Utilisateur supprimé ' }))
        .catch(err => err.status(400).json({ err }));
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await UserModel.findOneAndUpdate({ _id: req.params.id },
        {
            $push: { following : req.body.idToFollow }
        })
    await UserModel.findOneAndUpdate({ _id: req.body.idToFollow },
        {
            $push: { followers: req.params.id }
        })
        .then(() => res.status(200).json({ message: "User follow" }))
        .catch(err => res.status(400).json({ err }))
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await UserModel.findOneAndUpdate({ _id: req.params.id },
        {
            $pull: { following : req.body.idToUnfollow }
        })
    await UserModel.findOneAndUpdate({ _id: req.body.idToUnfollow },
        {
            $pull: { followers: req.params.id }
        })
        .then((doc) => res.status(200).json({ doc }))
        .catch(err => res.status(400).json({ err }))
}