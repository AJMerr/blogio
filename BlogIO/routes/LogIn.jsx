function LogIn() {
    return (
        <main className="container">
            <nav>
                <ul><li><a href="/">BlogIO</a></li></ul>
            </nav>
            <article className="grid">
                <div>
                    <form>
                        <label>
                            Email
                            <input type="email" placeholder="example@email.com" required />
                        </label>
                        <label>
                            Password
                            <input type="password" placeholder="password" pattern="." required />
                        </label>
                        <input type="submit" value="Login" />
                        <small>Email me at austinm9506@gmail.com if you would like your data purged if you test this application.</small>
                    </form>
                </div>
                <div>
                    <h1>Not Registered?</h1>
                    <p1>Sign up </p1><a href="signup.html">here!</a>
                </div>
            </article>
        </main>
    )
}

export default LogIn;
