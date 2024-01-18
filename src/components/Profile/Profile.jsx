import React, { useState, useEffect } from "react";
import Nav from "../Home/Nav";
import UserDetails from "./UserDetails";
import Post from "./Post";
import { ChakraProvider } from "@chakra-ui/react";
import "./Profile.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Profile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userPostData, setUserPostData] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/Profile", state, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      setUserPostData(res.data);
    });
  }, [state]);

  return (
    <ChakraProvider>
      <Nav />
      <UserDetails />

      <div className="postdiv">
        {userPostData.map((post, index) => (
          <Post
            key={index} 
            name={post.name}
            location={post.location}
            date={post.date}
            description={post.description}
            username={post.username}
            profile={post.profile}
            post={post.post}
          />
        ))}
      </div>
    </ChakraProvider>
  );
}

export default Profile;
