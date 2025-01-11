function Homepage() {
  return (
    <main className="container-fluid">
      <div>
        <nav className="container">
          <ul><li>BlogIO!</li></ul>
          <ul>
            <li><a href="/login">Log In</a></li>
            <li><a href="/signup">Register</a></li>
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
