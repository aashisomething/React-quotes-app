import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Quotes = () => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [savedQuotes, setSavedQuotes] = useState([]);

    const fetchQuote = async () => {
        setLoading(true);
        const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
        setQuote(response.data[0]);
        setLoading(false);
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const saveQuote = () => {
        setSavedQuotes([...savedQuotes, quote]);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
                <CardContent>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Ron Swanson Quotes</h1>
                    {loading ? (
                        <p className="text-center text-gray-600">Loading...</p>
                    ) : (
                        <div>
                            <p className="text-lg text-gray-700 mb-4 text-center">{quote}</p>
                            <div className="flex justify-center mb-4">
                                <Button variant="contained" color="primary" onClick={fetchQuote} className="mr-2">
                                    Get New Quote
                                </Button>
                                <Button variant="outlined" color="primary" onClick={saveQuote}>
                                    Save Quote
                                </Button>
                            </div>
                        </div>
                    )}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Saved Quotes</h2>
                        <ul className="divide-y divide-gray-300">
                            {savedQuotes.map((quote, index) => (
                                <li key={index} className="py-2 text-gray-700">{quote}</li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Quotes;
