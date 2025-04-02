import { useState, useEffect, useLayoutEffect } from "react";
import ErrorPage from "./ErrorPage";
import auth from '../utils/auth';
import {useNavigate} from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [error] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);

    useEffect(() => {
        if (loginCheck) {
            navigate('/chat');
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                            Login to view chatrooms!
                        </h1>
                    </div>
                ) : (
                    <div className="home-container">
                        <h1>Welcome to LiteChat!</h1>
                    </div>
                )}
        </>
    );
};

export default Home;
