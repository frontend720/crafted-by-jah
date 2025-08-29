/* eslint-disable no-undef */
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Auth", AuthSchema)