import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useScrapping() {

    const [loading, setLoading] = useState(false);
    const [recentScrapping, setRecentScrapping] = useState({});
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const getFormattedDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const startScrapping = async () => {
        try {
            setLoading(true);
            const today = getFormattedDate();
            const scrapping = {
                date: today,
                state: 'loading'
            };
            setRecentScrapping(scrapping);

            const response = await axios.post(
                'http://localhost:8000/data_collection/recentScrap',
                {},  // Your post request body (currently empty)
                {
                  headers: { 'Authorization': `Token ${localStorage.getItem('access_token')}` }
                }
              );
            if (response.status === 201) {
                console.log(response.data);
                setResults(response.data);
                const updatedScrapping = { date: getFormattedDate(), state: 'success' };
                setRecentScrapping(updatedScrapping);
            } else {
                setErrorMessage(response.data[0].msg);
                console.error('Erreur lors de scrapping :', response.data[0].msg);
                const updatedScrapping = { date: getFormattedDate(), state: 'failed' };
                setRecentScrapping(updatedScrapping);
            }
            setLoading(false);
        } catch (error) {
            console.error('Erreur lors de scrapping :', error);
            const updatedScrapping = { date: getFormattedDate(), state: 'failed' };
            setRecentScrapping(updatedScrapping);
            setErrorMessage('حدث خطأ أثناء إجراء البحث'); // Set user-friendly error message
            setLoading(false);
        }
    };

    return {
        results,
        errorMessage,
        loading,
        startScrapping,
        recentScrapping
    };
}
