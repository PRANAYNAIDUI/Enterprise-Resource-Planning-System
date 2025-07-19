// models/Payroll.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payrollSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowances: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date
    }
});

module.exports = mongoose.model('Payroll', payrollSchema);