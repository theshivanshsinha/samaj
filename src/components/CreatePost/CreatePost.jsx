import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChakraProvider, Box, Input } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';
import "./create.css";
import { Textarea } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";

function CreatePost() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const postDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const toast = useToast();

    function handleCancel() {
        toast({
            title: 'Cancelling Post!',
            status: 'error',
            duration: 5000,
            position: 'bottom-left',
            isClosable: true,
        });
        setTimeout(() => {
            navigate("/Home", { state: state })
        }, 2000);
    }
    const [image, setImage] = useState("");

    function convertToBase64(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result); // Set the image state to the base64 string
            setpostData({
                ...postData,
                post: event.target.result, // Set the post image in postData
            });
        };

        reader.readAsDataURL(file);
    }

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setpostData({ ...postData, [name]: value });
    }
    const [postData, setpostData] = useState({ date: postDate, location: "", index: 0, description: "", likes: 0, comment: [], username: state.username, email: state.email, name: state.name, phoneNumber: state.phoneNumber, password: state.password, profile: state.profile, post: image });


    function handlePost() {
        const res = axios.post("http://localhost:5000/createPost", postData, { headers: { 'Content-Type': 'application/json' }, })
            .then((response) => {
                console.log(response.data);
                if (response.status === 201) {
                    toast({
                        title: 'Successfully Created Post!',
                        status: 'success',
                        duration: 5000,
                        position: 'bottom-left',
                        isClosable: true,
                    })
                    setTimeout(() => { navigate('/Home', { state: response.data }) }, 3000)
                } else {
                    toast({
                        title: 'Failed To Create Post!',
                        status: 'error',
                        duration: 5000,
                        position: 'bottom',
                        isClosable: true,
                    })
                    setTimeout(() => { navigate('/Home') }, 3000)
                }
            })
    }

    return (
        <ChakraProvider>
            <Box
                w='container.lgs'
                h='120vh'
                bgGradient='linear(to-r, gray.300, yellow.400, pink.200)'
            >
                <Heading size={'lg'} position={'relative'} left={"850px"} top={"20"}>Create Post</Heading>
                <Heading size={'md'} position={'relative'} left={"850px"} top={"32"}>Posting as @<u>{state.username}</u></Heading>
                <Card maxW={'lg'} height={"820px"} width={"2500px"} boxShadow="lg" rounded="lg" backgroundColor={'transparent'} position={'relative'} top={'32'} left={'80'} marginLeft={'96'}>
                    <CardBody>
                        <Image
                            src={image}
                            alt="Post pic"
                            height={400}
                            width={500}
                        />
                        <br></br>
                        <input
                            type="file"
                            accept="image/jpeg, image/png, image/jpg"
                            id="profile-pic"
                            onChange={convertToBase64}
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'><Input
                                borderColor={'transparent'}
                                focusBorderColor='blue.600'
                                placeholder='Location...'
                                onChange={handleChange}
                                name="location"
                                value={postData.location}
                            /></Heading>
                            <Text>
                                <Textarea borderColor={'transparent'} focusBorderColor="blue.600" placeholder='Caption the post...' onChange={handleChange} name="description" value={postData.description} />
                            </Text>
                            <Text color='blue.600' fontSize='xl'>
                                {postDate}
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <ButtonGroup spacing='2'>
                            <Button variant='solid' colorScheme='blue' onClick={handlePost}>
                                Post
                            </Button>
                            <Button variant='ghost' colorScheme='blue' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </Box>
        </ChakraProvider>
    );
}

export default CreatePost;
