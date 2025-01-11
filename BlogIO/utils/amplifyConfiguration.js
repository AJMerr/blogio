const amplifyConfiguration = {
    Auth: {
        region: import.meta.env.REGION,
        userPoolId: import.meta.env.USER_POOL_ID,
        userPoolWebClientId: import.meta.env.USER_POOL_CLIENT_ID
    }
}

export default amplifyConfiguration;