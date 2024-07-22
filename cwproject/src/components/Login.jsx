import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button } from '@chakra-ui/react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Box 
      className="login-container"
      width="100vw"
      height="100vh"
      position="relative"
    >
      <Button 
        className="login-button"
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        color="white"
        border="none"
        padding="10px 20px"
        cursor="pointer"
        fontSize="1rem"
        _hover={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={() => loginWithRedirect()}
      >
        Log In / Sign Up
      </Button>
    </Box>
  );
};

export default Login;