import { useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmationCode: ''
    });
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

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
            
            if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
                setShowConfirmation(true);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleConfirmation = async (e) => {
        e.preventDefault();
        try {
            await confirmSignUp({
                username: formData.email,
                confirmationCode: formData.confirmationCode
            });
            // Redirect to login or show success message
            setError('Successfully confirmed! You can now login.');
            setShowConfirmation(false);
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

    if (showConfirmation) {
        return (
            <main className="container">
                <nav>
                    <ul><li><a href="/">BlogIO</a></li></ul>
                </nav>
                <article className="grid">
                    <div>
                        <form id="confirmationForm" onSubmit={handleConfirmation}>
                            {error && <div className="error">{error}</div>}
                            <label>
                                Confirmation Code
                                <input 
                                    type="text" 
                                    id="confirmationCode" 
                                    value={formData.confirmationCode}
                                    onChange={handleChange}
                                    placeholder="Enter code from email" 
                                    required 
                                />
                                <small>Please check your email for the confirmation code</small>
                            </label>
                            <input type="submit" value="Confirm Email" />
                        </form>
                    </div>
                </article>
            </main>
        );
    }

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
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                required 
                            />
                            <small>Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)</small>
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