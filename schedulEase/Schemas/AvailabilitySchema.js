const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    businessOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dayOfWeek: { // e.g., 'Monday', 'Tuesday', etc. or 0-6 for Sunday-Saturday
        type: String,
        required: true,
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    startTime: { // e.g., "09:00"
        type: String,
        required: true,
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format for start time']
    },
    endTime: { // e.g., "17:00"
        type: String,
        required: true,
        match: [/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Please use HH:MM format for end time']
    },
    // You might add a 'breakTimes' array later for non-bookable slots within the day
}, {
    timestamps: true
});

// Optional: Add a compound unique index to prevent duplicate availability entries for the same businessOwner and dayOfWeek
availabilitySchema.index({ businessOwner: 1, dayOfWeek: 1 }, { unique: true });

module.exports = mongoose.model('Availability', availabilitySchema);