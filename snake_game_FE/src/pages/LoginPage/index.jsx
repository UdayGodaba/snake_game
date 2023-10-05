import React from 'react'
import { Box } from '@mui/material';

import Form from '../../components/Form';

const LoginPage = () => {
    return (
        <Box
            width={"50%"}
            p="2rem"
            m="2rem auto"
            borderRadius="1.5rem"
            sx={{ backgroundColor: "#f7f7f7", maxWidth: "600px" }}
        >
            <Form />
        </Box>
    )
};

export default LoginPage;