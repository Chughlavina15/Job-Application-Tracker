import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Icon, IconButton, useToast, Text } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({user, setUsers }) => {
    const toast = useToast();
    const handleDeleteUser = async () => {
        try{
            const res = await fetch(BASE_URL + "/job_applications/" + user.id,{
                method: "DELETE",
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }
            setUsers((prevUsers) => prevUsers.filter((u) => u.id != user.id));
            toast({
                status : "success",
                titlle : "Success",
                description : "Job Application Deleted Successfully.",
                duration : 2000,
                position : "top-center",
            });
        } catch(error) {
            toast({
                title: "An Error Occurred",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top-center",
            });
        }

    };

    return (
        <Card>
            <CardHeader>
                <Flex gap={"4"}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Avatar src={user.jobUrl} />
                        <Box>
                        <Heading size='md' marginBottom={'2'}>{user.name}</Heading>
                        <Heading size='xs' color={"gray.100"}>{user.role}</Heading>
                        </Box>
                    </Flex>
                    <Flex>
                    <EditModal user={user} setUsers={setUsers}/>
                    <IconButton
                            variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} 
                            onClick={handleDeleteUser}/>}
					/>
                    </Flex>
                </Flex>
            </CardHeader>

            <CardBody>
                <Heading size={'xs'} marginBottom={'4'}>Job description</Heading>
                <Heading size={'xs'}>{user.description}</Heading>
            </CardBody>
        </Card>
    );
}

export default UserCard;