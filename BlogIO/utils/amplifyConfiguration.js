const amplifyConfiguration = {
    Auth: {
        region: import.meta.env.VITE_REGION,
        userPoolId: import.meta.env.VITE_USER_POOL_ID,
        userPoolWebClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID
    }
}

export default amplifyConfiguration;