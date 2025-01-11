function SignUp() {
    return (
        <main className="container">
            <nav>
                <ul><li><a href="/">BlogIO</a></li></ul>
            </nav>
            <article className="grid">
                <div>
                    <form id="signUpForm">
                        <label>
                            Email
                            <input type="email" id="email" placeholder="example@email.com" required />
                            <small>A real email is required as you will have a code sent for confirmation</small>
                        </label>
                        <label>
                            Password
                            <input type="password" id="password" placeholder="password" pattern="." required />
                        </label>
                        <input type="submit" value="Sign Up" />
                        <small>Email me at austinm9506@gmail.com if you would like your data purged if you test this application.</small>
                    </form>
                </div>
                <div>
                </div>
            </article>
        </main>
    )
}

export default SignUp;