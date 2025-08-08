const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    duration: { // Duration of the service in minutes
        type: Number,
        required: true,
        min: 1 // Service must have a positive duration
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Price cannot be negative
    },
    // Reference to the User who is the business owner
    businessOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        // This ensures only business users can own services
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);