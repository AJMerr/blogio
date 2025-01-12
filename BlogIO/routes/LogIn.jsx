import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import { AuthContext } from '../src/main';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const user = await signIn({
                username: formData.email,
                password: formData.password
            });
            console.log('Successfully logged in:', user);
            setIsAuthenticated(true);
            navigate('/generateBlog');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Invalid email or password');
        }
    };

    return (
        <main className="container">
            <nav>
                <ul><li><a href="/">BlogIO</a></li></ul>
            </nav>
            <article className="grid">
                <div>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="error">{error}</div>}
                        <label>
                            Email
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com" 
                                required 
                            />
                        </label>
                        <label>
                            Password
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="password" 
                                required 
                            />
                        </label>
                        <input type="submit" value="Login" />
                        <small>Email me at austinm9506@gmail.com if you would like your data purged if you test this application.</small>
                    </form>
                </div>
                <div>
                    <h1>Not Registered?</h1>
                    <p>Sign up <Link to="/signup">here!</Link></p>
                </div>
            </article>
        </main>
    );
}

export default LogIn;
