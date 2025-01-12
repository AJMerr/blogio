import { useContext } from 'react';
import { AuthContext } from '../src/main';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <main className="container-fluid">
      <div>
        <nav className="container">
          <ul><li>BlogIO!</li></ul>
          <ul>
            {isAuthenticated ? (
              <>
                <li><a href="/generateBlog">Generate Blog</a></li>
                <li><a href="#" onClick={handleSignOut}>Sign Out</a></li>
              </>
            ) : (
              <>
                <li><a href="/login">Log In</a></li>
                <li><a href="/signup">Register</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <section className="hero">
        <div id="heroContent">
          <h1 id="heroTitle">BlogIO!</h1>
          <p id="heroTagline">Your AI tool to create amazing blogposts!</p>
          <div id="auth">
            <button id="login">
              <a href="/login">Login</a>
            </button>
            <button>
              <a href="/signup">Register</a>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
