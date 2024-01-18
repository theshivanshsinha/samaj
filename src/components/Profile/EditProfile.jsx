import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  ChakraProvider,
} from "@chakra-ui/react";
import './Edit.css';
import { useNavigate, useLocation } from "react-router-dom";
import Nav from "../Home/Nav";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function EditProfile() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Initialize state variables
  const [username, setUsername] = useState(state.username);
  const [password, setPassword] = useState(state.password);
  const [phone, setPhone] = useState(state.phoneNumber);
  const [image, setImage] = useState(state.profile);
  
  const [success, setSuccess] = useState(true);
  function convertToBase64(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      setImage(event.target.result); // Set the image state to the base64 string
    };
  
    reader.readAsDataURL(file);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/Edit", {
        email: state.email,
        username: username,
        password: password,
        phoneNumber: phone,
        profile: image,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      toast({
        title: "Saving Changes...",
        description: state.email,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSuccess(false);

      // Update the user state
      const updatedUser = response.data;

      // Navigate to the profile page with the updated user state
      setTimeout(() => {
        navigate("/Profile", { state: updatedUser });
      }, 3000);
    } catch (error) {
      console.error("Error during edit:", error);
    }
  }


  return (
    <ChakraProvider >
      <Nav />
      <div className="bg">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={'4'}
          maxW="sm"
          boxShadow="md"
          bgColor='facebook.50'
          position={'relative'}
          left={'96'}
          top={'32'}
          shadow={'2xl'}
          border={'1px'}
          borderColor={'gray.100'}
        >
          <Image
            src={image}
            alt="Profile Picture"
            borderRadius="full"
            height={100}
            width={100}
          />
          <br></br>
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="profile-pic"
            onChange={convertToBase64}
          />
          <Heading size="md">Name: {state.name}</Heading>
          <Text>Email: {state.email}</Text>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="filled"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                _hover={{ bgColor: "blue.600" }}
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Stack>
          </form>
        </Box>
        <Spinner
          color="orange"
          size={"xl"}
          marginLeft="64"
          marginTop="36"
          visibility={success ? "hidden" : "visible"}
          position={"relative"}
          left={"96"}
        />
      </div>
    </ChakraProvider>
  );
};

export default EditProfile;
