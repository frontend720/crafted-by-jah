const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'] // Basic email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // For password hashing, this will store the hashed password
    },
    role: {
        type: String,
        enum: ['client', 'business'], // Or 'admin' for future expansion
        required: true
    },
    // You could add fields specific to business owners later, like businessName, phone, address etc.
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);