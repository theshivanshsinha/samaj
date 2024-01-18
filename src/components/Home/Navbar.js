import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Input,
  IconButton,
  Text,
  Button,
  Avatar
} from '@chakra-ui/react';
import { SearchIcon, AddIcon, BellIcon } from '@chakra-ui/icons';
import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { FaUserPlus } from "react-icons/fa";


function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useLocation();
  const [userdata, setUserData] = useState({ name: "", email: "", password: "", phoneNumber: "", username: "", profile: "" });
  useEffect(() => {
    setUserData(state);
  }, []);

  function handleProfile() {
    setSuccess(false);
    setTimeout(() => { navigate("/Profile", { state: userdata }) }, 4000);
  }

  function handleHover() {
    toast({
      title: userdata.name + "'s profile!",
      description: 'click to edit or view profile...',
      status: 'info',
      duration: 4000,
      isClosable: true,
    })
  }

  const [success, setSuccess] = useState(true);
  function handleLogout() {
    toast({
      title: 'Logging out!',
      description: userdata.email,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
    setSuccess(false);
    setTimeout(() => { navigate("/") }, 4000);
  }


  function handlePost() {
    toast({
      title: 'Loading....',
      description: userdata.email,
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
    setSuccess(false);
    setTimeout(() => { navigate("/CreatePost", { state: userdata }) }, 4000);
  }


  function handleNotif() {
    
  }

  return (
    <div>
      <Box
        className="glossy-navbar" // Add the CSS class here
        bg="teal.500"
        color="white"
        p={2}
        boxShadow="md"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          Samaaj
        </Text>
        <Flex alignItems="center">
          <Input
            borderRadius={"2xl"}
            marginLeft={"72"}
            type="text"
            placeholder="Search"
            variant="filled"
            size="sm"
            _hover={{
              borderColor: 'teal.600',
            }}
            _focus={{
              borderColor: 'teal.600',
            }}
          />
          <IconButton
            marginLeft={"1.5"}
            colorScheme="teal"
            aria-label="Search"
            size="sm"
            icon={<SearchIcon />}
          />
        </Flex>
        <Spacer />
        <IconButton
          colorScheme="teal"
          aria-label="Create Post"
          icon={<AddIcon />}
          mr={4}
          onClick={handlePost}
        />

        <IconButton
          colorScheme="teal"
          aria-label="Notifications"
          icon={<BellIcon />}
          onClick={handleNotif}
        />


        <Button variant="ghost" ml={4} onClick={handleLogout}>
          Logout
        </Button>
        <Avatar size="sm" name="User Name" src="url-to-profile-image.jpg" marginLeft={"1"} cursor={'pointer'} onMouseEnter={handleHover} onClick={handleProfile} />
      </Box>
      <Spinner color='orange' size={"xl"} marginLeft="64" marginTop="12" visibility={success ? "hidden" : "visible"} position={'relative'} left={'96'} />
    </div>
  );
}

export default Navbar;
