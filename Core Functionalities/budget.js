// models/Budget.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    department: { type: String, required: true },
    budgetLimit: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Budget', budgetSchema);
