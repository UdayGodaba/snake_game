const registerOptions = {
    username: {
        required: {
            value: true,
            message: 'Username is required',
        }
    },
    email: {
        required: {
            value: true,
            message: 'Email is required',
        },
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Enter a valid email'
        }
    },
    password: {
        required: {
            value: true,
            message: 'Password is required',
        },
        minLength: {
            value: 3,
            message: 'min. password length 3 is required'
        }
    },
    logEmail: {
        required: {
            value: true,
            message: 'Email is required',
        },
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: 'Enter a valid email'
        }
    },
    logPassword: {
        required: {
            value: true,
            message: 'Password is required',
        },
        minLength: {
            value: 3,
            message: 'min. password length 3 is required'
        }
    }
};

export default registerOptions;