import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./Home.css";
import Nav from "./Nav";
import PostDisplay from "./PostDisplay";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [postData, setPostData] = useState([]); 

  useEffect(() => {
    axios.post("http://localhost:5000/Home", state, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => {
      setPostData(res.data);
    });
  }, [state]);
  console.log(postData);
  return (
    <ChakraProvider>
      <div>
        <Nav />
        <div className="postbox">
          {postData.map((post, index) => (
            <PostDisplay
              key={index} 
              name={post.name}
              location={post.location}
              date={post.date}
              description={post.description}
              profile={post.profile}
              post={post.post}
            />
          ))}
        </div>
      </div>
    </ChakraProvider>
  );
}

export default Home;
