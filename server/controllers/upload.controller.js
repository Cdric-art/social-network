const UserModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const {uploadErrors} = require("../utils/errors.utils");

module.exports.uploadProfil = async (req, res) => {
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

    let fileName = req.body.pseudo + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../../client/public/uploads/profil/${fileName}`
        )
    )

    await UserModel.findOneAndUpdate({_id: req.body.userId}, {
        $set: {
            picture: './uploads/profil/' + fileName
        }
    }, {new: true, upsert: true, setDefaultsOnInsert: true})

        .then((docs) => res.status(200).json({ docs }))
        .catch(err => res.status(400).json({err}))
}