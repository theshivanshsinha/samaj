import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import "./Register.css";
import TextTransition, { presets } from 'react-text-transition';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { InputRightAddon, Stack, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


function Register() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        username: "",
        profile:"",
    });

    const [success, setSuccess] = useState(true);

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", user, {
                headers: { 'Content-Type': 'application/json' },
            });

            toast({
                title: 'Welcome User!',
                description: response.data.email,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            setSuccess(false);
            setTimeout(() => { navigate("/Home", { state: response.data }) }, 4000);
        }
        catch (error) {
            console.error('Error during user login:', error);
            toast({
                title: 'User login failed!',
                description: 'User not found or incorrect credentials',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }




    const toast = useToast();
    async function handleReg(e) {
        e.preventDefault();
        if (user.name && user.email && user.password) {
            try {
                const response = await axios.post("http://localhost:5000/Signup", user, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.data && response.data.error) {
                    toast({
                        title: 'User already exists!',
                        description: response.data.error,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: 'User Created Successfully',
                        description: 'Your user has been created successfully.',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error('Error during user registration:', error);
                toast({
                    title: 'User registration failed!',
                    description: 'User already exists',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } else {
            toast({
                title: 'Please fill all fields',
                description: 'All fields are required for registration.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    }


    const TEXTS = ['By Kss', 'with ♡', 'for every society around the 🌐', 'to spread haapiness and joy!'];
    const [index, setIndex] = React.useState(0);


    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)


    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            3000,
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <div className="gif">
            <ChakraProvider>
                <h1 className="title">𝓢𝓪𝓶𝓪𝓪𝓳</h1>
                <h2 className="heading">
                    <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
                </h2>
                <Tabs variant='unstyled' className="tab">
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Login</Tab>
                        <Tab _selected={{ color: 'white', bg: 'green.400' }}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>

                        <TabPanel>
                            <Stack spacing={4}>
                                <InputGroup size='sm'>
                                    <Input
                                        focusBorderColor='lime'
                                        placeholder='Email'
                                        className="input"
                                        onChange={handleChange}
                                        value={user.email}
                                        name="email"
                                    />
                                    <InputRightAddon children='@gmail.com' />
                                </InputGroup>

                                <InputGroup size='md'>
                                    <Input
                                        focusBorderColor="pink.400"
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        onChange={handleChange}
                                        value={user.password}
                                        name="password"
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <WrapItem>
                                    <Button colorScheme='whatsapp' onClick={handleLogin}>Login</Button>
                                    <Button
                                        size="md"
                                        bgColor="red.600"
                                        color="white"
                                        _hover={{ bgColor: "red.800" }}

                                        marginLeft={20}
                                    >
                                        Sign in with Google
                                    </Button>
                                    <Button colorScheme='whiteAlpha' marginLeft={20} >Forgot Password?</Button>
                                </WrapItem>
                                <Spinner color='red.500' size={"xl"} marginLeft="64" marginTop="12" visibility={success ? "hidden" : "visible"} />
                            </Stack>
                        </TabPanel>

                        <TabPanel>
                            <Stack spacing={4}>
                                <Input
                                    focusBorderColor='lime'
                                    placeholder='Name'
                                    className="input"
                                    onChange={handleChange}
                                    value={user.name}
                                    name="name"
                                />
                                <InputGroup size='sm'>
                                    <Input
                                        focusBorderColor='lime'
                                        placeholder='Email'
                                        className="input"
                                        onChange={handleChange}
                                        value={user.email}
                                        name="email"
                                    />
                                    <InputRightAddon children='@gmail.com' />
                                </InputGroup>

                                <InputGroup size='md'>
                                    <Input
                                        focusBorderColor="pink.400"
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Enter password'
                                        value={user.password}
                                        onChange={handleChange}
                                        name="password"
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <InputGroup size='md'>
                                    <Input
                                        focusBorderColor="pink.400"
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Re-Enter password'
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Hide' : 'Show'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <WrapItem>
                                    <Button colorScheme='whatsapp' onClick={handleReg}>SignUp</Button>
                                    <Button
                                        size="md"
                                        bgColor="red.600"
                                        color="white"
                                        _hover={{ bgColor: "red.800" }}

                                        marginLeft={20}
                                    >
                                        Sign up using Google
                                    </Button>

                                </WrapItem>
                            </Stack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </ChakraProvider>
        </div>
    );
};
export default Register;