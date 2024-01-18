import React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from "./Navbar";
function Nav() {
    return (
        <ChakraProvider>
            <Navbar />
        </ChakraProvider>
    );
}

export default Nav;