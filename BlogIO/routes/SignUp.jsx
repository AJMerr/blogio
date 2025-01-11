import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: formData.email,
                password: formData.password,
                options: {
                    userAttributes: {
                        email: formData.email
                    }
                }
            });
            
            // Typically redirects to confirmation page
            if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                // You can add navigation here to confirmation page
                console.log('Please confirm your email');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <main className="container">
            <nav>
                <ul><li><a href="/">BlogIO</a></li></ul>
            </nav>
            <article className="grid">
                <div>
                    <form id="signUpForm" onSubmit={handleSubmit}>
                        {error && <div className="error">{error}</div>}
                        <label>
                            Email
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com" 
                                required 
                            />
                            <small>A real email is required as you will have a code sent for confirmation</small>
                        </label>
                        <label>
                            Password
                            <input 
                                type="password" 
                                id="password" 
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="password" 
                                pattern="." 
                                required 
                            />
                        </label>
                        <input type="submit" value="Sign Up" />
                        <small>Email me at austinm9506@gmail.com if you would like your data purged if you test this application.</small>
                    </form>
                </div>
                <div>
                </div>
            </article>
        </main>
    );
}

export default SignUp;