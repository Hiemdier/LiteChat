import { jwtDecode } from 'jwt-decode';

class AuthService {
  
  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn() {
    const token = this.getToken();
    return token;
  }

  // Retrieve the JWT token from localStorage
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/chat');
  }

  isTokenExpired(token: string) {
    // Return a value that indicates if the token is expired
    const decoded = jwtDecode(token);
    const expTime = decoded.exp as number;
    const currentTime = Math.floor(Date.now()/1000);

    return expTime < currentTime;

  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
