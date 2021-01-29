const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const {uploadErrors} = require("../utils/errors.utils");
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = async (req, res) => {
    await PostModel.find().sort({ createdAt: -1 })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json({ err }));
}

module.exports.createPost = async (req, res) => {
    let time = Date.now();

    if (req.file !== null) {
        try {
            if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/jpeg" && req.file.detectedMimeType !== "image/png") {
                throw Error('Invalid file')
            }
            if (req.file > 500000) {
                throw Error('Max size');
            }
        } catch (err) {
            const errors = uploadErrors(err)
            return res.status(400).json({ errors })
        }

        let fileName = req.body.posterId + time + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../../client/public/uploads/posts/${fileName}`
            )
        )
    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + req.body.posterId + time + ".jpg" : '',
        video: req.body.video,
        likers: [],
        comments: []
    });
    await newPost.save()
        .then((post) => res.status(201).json({ post }))
        .catch(err => res.status(400).json({ err }))
}

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await PostModel.findOneAndUpdate({ _id: req.params.id }, {
        message: req.body.message
    })
        .then(() => res.status(200).json({message: 'Post mis à jour !'}))
        .catch(err => res.status(400).json({ err }));
}

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }
    await PostModel.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'Post supprimé !'}))
        .catch(err => res.status(400).json({ err }));
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }

    await PostModel.findOneAndUpdate({ _id: req.params.id}, {
        $addToSet: {
            likers: req.body.id
        }
    }, { new: true })

    await UserModel.findOneAndUpdate({ _id: req.body.id }, {
        $addToSet: {
            likes: req.params.id
        }
    }, { new: true })
        .then((doc) => res.status(200).json({ doc }))
        .catch(err => res.status(400).json({ err }));
}

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }

    await PostModel.findOneAndUpdate({ _id: req.params.id}, {
        $pull: {
            likers: req.body.id
        }
    }, { new: true })

    await UserModel.findOneAndUpdate({ _id: req.body.id }, {
        $pull: {
            likes: req.params.id
        }
    }, { new: true })
        .then((doc) => res.status(200).json({ doc }))
        .catch(err => res.status(400).json({ err }));
}

module.exports.commentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }

    await PostModel.findOneAndUpdate({ _id: req.params.id }, {
        $push: {
            comments: {
                commenterId: req.body.commenterId,
                commenterPseudo: req.body.commenterPseudo,
                text: req.body.text,
                timestamp: new Date().getTime()
            }
        }
    }, {new: true})
        .then((docs) => res.status(200).json({ docs }))
        .catch(err => res.status(400).json({ err }));
}

module.exports.editCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }

    await PostModel.findOne({ _id: req.params.id })
        .then(docs => {
            const theComment = docs.comments.find((comment) => {
                return comment._id.equals(req.body.commentId)
            })
            if (!theComment) return res.status(404).send('Comment not found')
            theComment.text = req.body.text;
            return docs.save(err => {
                if (!err) return res.status(200).send(docs)
                return res.status(500).send(err)
            })
        })
        .catch(err => res.status(400).json({ err }));
}

module.exports.deleteCommentPost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Id unknown : ' + req.params.id)
    }

    await PostModel.findOneAndUpdate({ _id: req.params.id }, {
        $pull: {
            comments: {
                _id: req.body.commentId
            }
        }
    }, {new: true})
        .then(docs => res.status(200).send(docs))
        .catch(err => res.status(400).json({ err }));
}