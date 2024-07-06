const { default: mongoose } = require("mongoose");

const settingsSchema = new mongoose.Schema({
    country: {
        name: {
            type: String,
            trim: true
        },
        isoCode: {
            type: String,
            trim: true
        },
        phoneCode: {
            type: String,
            trim: true
        },
        flag: {
            type: String,
            trim: true
        }
    },
    currency: {
        name: {
            type: String,
            trim: true
        },
        isoCode: {
            type: String,
            trim: true
        },
        flag: {
            type: String,
            trim: true
        }
    },
    settingOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
