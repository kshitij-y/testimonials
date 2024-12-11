"use client"
import { useState } from 'react';

export default function Page() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOTP = async () => {
        // Logic to send OTP to the user's email
        try {
            // Assume sendOTP is a function that sends the OTP
            await sendOTP(email);
            setMessage('OTP sent to your email');
        } catch (error) {
            setMessage('Failed to send OTP');
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleSendOTP}>Send OTP</button>
            {message && <p>{message}</p>}
        </div>
    );
}

// Mock function to simulate sending OTP
async function sendOTP(email: any) {
    return new Promise((resolve) => setTimeout(resolve, 1000));
}