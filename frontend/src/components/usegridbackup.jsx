import { Grid, useAccordion } from "@chakra-ui/react";
import UserCard from "./UserCard";
import {USERS} from "/src/test_data/test_data_jobs.js"
import { useEffect } from "react";

const UserGrid = ({users, setUsers}) =>{
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const res = await fetch("http://127.0.0.1:5000/api/job_applications");
                const data = await res.json();

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
    return (
        /* for small screens, 1 box should be visible (1fr), for medium screens 2 boxes and for large 3 should be visible */
        <Grid 
        templateColumns={{base:"1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
        gap={4} >
            {USERS.map((user) => (
                <UserCard key = {user.id} user={user}  setUsers={setUsers}/>
            ))}
        </Grid>
    );
};

export default UserGrid;