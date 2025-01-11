const amplifyConfiguration = {
    Auth: {
        Cognito: {
            region: import.meta.env.VITE_REGION,
            userPoolId: import.meta.env.VITE_USER_POOL_ID,
            userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
            userPoolClientSecret: import.meta.env.VITE_USER_POOL_CLIENT_SECRET
        }
    }
};

export default amplifyConfiguration;