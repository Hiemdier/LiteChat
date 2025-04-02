import { UserRegister } from "../interfaces/UserRegister";  // Import the UserRegister interface for typing userInfo

// Function to send a POST request to the '/auth/register' endpoint with user registration information
const register = async (userInfo: UserRegister) => {
    try {
        // Send a POST request to '/auth/register' with user registration information in JSON format
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        });

        // Throw error if response status is not OK (200-299)
        if (!response.ok) {
            const errorData = await response.json(); // Parse error response as JSON
            throw new Error(`Error: ${errorData.message}`); // Throw a detailed error message    
        }

        // Parse the response body as JSON
        const data = await response.json();

        return data;  // Return the data received from the server
    } catch (err) {
        console.log('Error from user registration: ', err);  // Log any errors that occur during fetch
        return Promise.reject('Could not register user');  // Return a rejected promise with an error message
    }
}

export { register };  // Export the register function to be used elsewhere in the application