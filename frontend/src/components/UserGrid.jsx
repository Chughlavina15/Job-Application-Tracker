import { Flex, Grid, Heading, Spinner, useAccordion } from "@chakra-ui/react";
import UserCard from "./UserCard";
import {USERS} from "/src/test_data/test_data_jobs.js"
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const UserGrid = ({users, setUsers}) =>{
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await fetch(BASE_URL + "/job_applications");
                const data = await res.json();

                console.log(data);

                if(!res.ok){
                    throw new Error(data.error);
                }

                setUsers(data);
            }
            catch (error){
                console.error(error);
            }
            finally{
                setIsLoading(false);
            }
        }
        getUsers();
    }, [setUsers]);
    console.log(users);
    return (
        <>
            <Grid templateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                }} gap={4}>

            {users.map((user) => (
                <UserCard user={user} setUsers={setUsers}/>
            ))}
                
            </Grid>

            {isLoading && (
                <Flex justifyContent={'center'}>
                    <Spinner size={'xl'} />
                </Flex>
            )}

            {!isLoading && users.length === 0 && (
                <Flex justifyContent={"center"}>
                    <Heading fontSize={"xl"}>
                    <Heading as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
                        Empty Database! 🥺
                    </Heading>
                    No Job Applications found.
                </Heading>
            </Flex>
            )}
        </>
    );
};

export default UserGrid;