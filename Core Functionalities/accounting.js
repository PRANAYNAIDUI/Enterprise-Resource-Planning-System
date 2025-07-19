// models/Accounting.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountingSchema = new Schema({
    transactionDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Accounting', accountingSchema);
