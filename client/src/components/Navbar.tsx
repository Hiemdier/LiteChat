import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  // State to track the login status
  const [loginCheck, setLoginCheck] = useState(false);

  // Function to check if the user is logged in using auth.loggedIn() method
  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);  // Set loginCheck to true if user is logged in
    }
  };

  // useEffect hook to run checkLogin() on component mount and when loginCheck state changes
  useEffect(() => {
    checkLogin();  // Call checkLogin() function to update loginCheck state
  }, [loginCheck]);  // Dependency array ensures useEffect runs when loginCheck changes

  return (
    <div className="display-flex justify-space-between align-center py-2 px-5 mint-green" id="lc-navbar">
      <h1 className='lc-navbar-text !m-0' style={{color: 'white'}}>
        LiteChat
      </h1>
      <div>
        {
          // Conditional rendering based on loginCheck state
          !loginCheck ? (
            <>
              {/* Render register and login buttons if user is not logged in */}
              <div className='grid grid-cols-2 gap-3'>
                <button className="btn" type='button'>
                  <Link to='/register'>Register</Link>
                </button>
                <button className="btn" type='button'>
                  <Link to='/login'>Login</Link>
                </button>
              </div>
            </>
          ) : (
            // Render logout button if user is logged in
            <button className="btn" type='button' onClick={() => {
              auth.logout(); // Call logout() method from auth utility on button click
              setLoginCheck(false); // Update loginCheck state after logout
            }}>Logout</button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
