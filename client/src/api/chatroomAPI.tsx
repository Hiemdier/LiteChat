import Auth from '../utils/auth';

// Getting chatrooms requires us to be logged in, so make sure you have a JWT on your person!
const getChatrooms = async () => {
    try {
        const response = await fetch('/api/chatrooms', {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
            }
        });
        const data = await response.json();

        if(!response.ok) {
            throw new Error('Invalid API response, check network tab!');
        }

        return data;

    } catch (error:any) {
        console.log('Error from data retrieval:', error);
        return [];
    }
}

export { getChatrooms };