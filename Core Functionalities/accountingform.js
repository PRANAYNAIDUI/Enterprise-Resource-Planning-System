// components/finance/AccountingForm.js
import React, { useState } from 'react';
import axios from 'axios';

function AccountingForm() {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/finance/accounting', {
                amount,
                type,
                description
            });
            console.log(response.data);
            // Reset form
            setAmount('');
            setType('income');
            setDescription('');
        } catch (err) {
            console.error('Error creating accounting entry:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default AccountingForm;
