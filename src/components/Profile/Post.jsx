import React from "react";
import { useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading,
    Button,
    CardHeader,
    Flex,
    Avatar,
    Box,
    Text,
} from "@chakra-ui/react";
import {
    Editable,
    EditableInput,
    EditablePreview,
    useEditableControls,
} from "@chakra-ui/react";
import { IconButton, ButtonGroup } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import "./Profile.css";
import { color } from "framer-motion";



function Post(props) {
    const [like,setLike]=useState(false);
    const [likes,setLikes]=useState(0);
    function handleLike() {
        if (like==true) {
            setLike(false);
            setLikes(1);
        }
        else{
            setLike(true);
            setLikes(0);
        }
    }


    const navigate = useNavigate();
    return (
        <div className="post">
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Segun Adebayo' src={props.profile} />

                        <Box>
                            <Heading size='sm'>{props.name}</Heading>
                            <Heading size='xs'>@<u>{props.username}</u></Heading>
                            <Text>{props.location}</Text>
                            <Text>{props.date}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>
                    {props.description}
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src={props.post}
                alt='Post Image not found!'
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button flex='1' variant='ghost' leftIcon={<BiLike />} onClick={handleLike} style={like ? {color:"red"} : {color:"black"} }>
                    Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter>
        </Card>
    </div>);
}

export default Post;

