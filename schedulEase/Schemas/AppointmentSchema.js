const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        // required: true
    },
    businessOwner: { // Denormalized for easier querying, or fetched via service
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { // The specific date of the appointment
        type: Date,
        required: true,
        
    },
    startTime: { // e.g., "09:30"
        type: String,
        required: true,
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format for start time']
    },
    endTime: { // Calculated based on service duration and startTime, but stored for convenience
        type: String,
        required: true,
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format for end time']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending' // Or 'confirmed' if no manual approval is needed
    },
    clientNotes: {
        type: String,
        trim: true,
        default: ''
    },
    paymentStatus: { // For Stripe integration
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    // Optional: Add a field for a Stripe charge ID if using payments
    stripeChargeId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema)