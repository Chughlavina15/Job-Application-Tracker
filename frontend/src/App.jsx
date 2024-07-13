import { Button, Container, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import CreateUserModal from "./components/CreateUserModal"
import UserGrid from "./components/UserGrid";
import { useState } from "react";

export const BASE_URL = "http://127.0.0.1:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <>
    <Navbar setUsers={setUsers}/>

    <Container maxW={"1200px"} my={4}>
      <Text fontSize={{base: "3xl", md: "50" }} 
            fontWeight={"bold"}
            letterSpacing={"2px"}
            textTransform={"uppercase"}
            textAlign={"center"}
            mb={8}>
        <Text as={"span"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgClip={"text"}>
          My Job Application Tracker 
        </Text>
        🚀
      </Text>
      <UserGrid users={users} setUsers={setUsers}/>
    </Container>
    </>
  );
}

export default App
