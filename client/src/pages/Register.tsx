import { useState, FormEvent, ChangeEvent } from "react";
import { register } from "../api/registerAPI";
import { UserRegister } from "../interfaces/UserRegister";


const Register = () => {
    const [registerData, setRegisterData] = useState<UserRegister>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    } as UserRegister);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!registerData.username || !registerData.email || !registerData.password || !registerData.confirmPassword) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await register(registerData);

            if (response.error) {
                if (response.error === 'Username already in use') {
                    alert('Username is already in use. Please choose another one.');
                } else if (response.error === 'Email already in use') {
                    alert('Email is already in use. Please use another email.');
                } else {
                    alert('Registration failed. Please try again.');
                }
                return;
            }

            alert('Registration successful! You can now log in.');
            console.log('Form submitted:', response);

            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className='form-container'>
            <form className='form login-form' onSubmit={handleSubmit}>
                <h1 className='text-white'>Register</h1>
                <div className="form-group">
                    <label className='text-white'>Username</label>
                    <input
                        className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        value={registerData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='text-white'>Email</label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='text-white'>Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className='text-white'>Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <div className="form-group">
                <button className="btn btn-primary" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;