// components/LeaveRequest.js
import React, { useState } from 'react';
import axios from 'axios';

function LeaveRequest() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('Casual');
    const [reason, setReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const leave = {
                type,
                startDate,
                endDate,
                reason
            };
            const response = await axios.post('/api/leaves', leave);
            console.log(response);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Leave Request</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Type:</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Casual">Casual</option>
                        <option value="Sick">Sick</option>
                        <option value="Annual">Annual</option>
                    </select>
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>Reason:</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LeaveRequest;