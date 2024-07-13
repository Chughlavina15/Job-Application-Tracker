import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { useEffect, useState } from "react";

const CreateUserModal = ({ setUsers }) => {
    const {isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		role: "",
		description: "",
		status: "",
	});

    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const res = await fetch("http://127.0.0.1:5000/api/job_applications", {
                method : "POST",
                headers : {
					"Content-Type": "application/json",
				},
                body : JSON.stringify(inputs),
            });
            
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error);
            }

            toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Friend created successfully.",
				duration: 2000,
				position: "top-center",
			});

            onClose();
            setUsers((prevUsers) => [...prevUsers, data]);

            setInputs({
				name: "",
				role: "",
				description: "",
				gender: "",
			});
        } catch (error){
            toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
        } finally {
			setIsLoading(false);
		}
    };

    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <ModalOverlay />
            <form onSubmit={handleCreateUser}>
            <ModalContent>
                <ModalHeader>New Job Application</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input placeholder="Google"
										value={inputs.name}
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}></Input>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input placeholder="Software Engineer" value={inputs.role}
										onChange={(e) => setInputs({ ...inputs, role: e.target.value })}></Input>
                        </FormControl>

                        </Flex>

                        <FormControl mt={4}>
                            <FormLabel>Job Description</FormLabel>
                            <Textarea   resize={"none"} overflowY={"hidden"} placeholder="Daily tasks would include gathering user requirements, defining system functionality and writing code in various languages, like Java, Ruby on Rails or .NET programming languages (e.g. C++ or JScript.NET.)" 
                                        value={inputs.description}
                                        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}/>
                        </FormControl>

                        <RadioGroup mt={4}>
                            <FormLabel>Status</FormLabel>
                            <Flex gap={5}>
                                <Radio value="applied" onChange={(e) => setInputs({ ...inputs, status: e.target.value })}>Applied</Radio>
                                <Radio value="not applied" onChange={(e) => setInputs({ ...inputs, status: e.target.value })}>Not Applied</Radio>
                            </Flex>
                        </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={4} type='submit' isLoading={isLoading}>
                        Add
                    </Button>

                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
            </form>
        </Modal>
    </>
}

export default CreateUserModal;