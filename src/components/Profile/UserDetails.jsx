import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
} from "@chakra-ui/react";
import { IconButton, ButtonGroup } from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

function UserDetails() {
  const toast = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(true);

  function handleEdit() {
    toast({
      title: "Loading...",
      description: state ? state.email : "",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    setSuccess(false);
    setTimeout(() => {
      navigate("/EditProfile", { state: state });
    }, 4000);
  }

  function handleBack() {
    toast({
      title: "Going Home!",
      description: state ? state.email : "",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    setSuccess(false);
    setTimeout(() => {
      navigate("/Home", { state: state });
    }, 4000);
  }

  // Function to navigate to the friend list
  function navigateToFriendList() {
    navigate("/FriendList", { state: state });
  }

  // Function to navigate to the post list
  function navigateToPostList() {
    navigate("/PostList", { state: state });
  }

  function CustomControlsExample() {
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls();

      return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Stack justifyContent="center">
          <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
        </Stack>
      );
    }

    return (
      <div>
        <div>
          {/* Display number of posts and friends with onClick handlers */}
          <Stack spacing={4} direction="row" justifyContent="space-between" marginBottom={4}>
            <Button onClick={navigateToPostList} colorScheme="blue">
              {state ? 29 : 0} Posts
            </Button>
            <Button onClick={navigateToFriendList} colorScheme="teal">
              {state ? 34 : 0} Friends
            </Button>
          </Stack>

          <Card
            flexDirection={{ base: "column", sm: "row" }}
            overflow="hidden"
            borderWidth={1}
            marginLeft={8}
            padding={4}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <Image
              objectFit="contain"
              borderRadius={"full"}
              borderColor={"gray.300"}
              border={"1px"}
              boxShadow={"dark-lg"}
              height={"60"}
              width={"60"}
              src={state.profile}
              cursor={"pointer"}
            />

            <Stack spacing={4} marginLeft={8}>
              <CardBody display={"flex"}>
                <Heading size="md">Name:</Heading>
                <Editable
                  defaultValue={state ? state.name : ""}
                  fontSize="xl"
                  isPreviewFocusable={false}
                  position={"relative"}
                  left={"10"}
                  bottom={"1.5"}
                  name="name"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </CardBody>
              <CardBody display={"flex"}>
                <Heading size="md">Email:</Heading>
                <Editable
                  defaultValue={state ? state.email : ""}
                  fontSize="xl"
                  isPreviewFocusable={false}
                  position={"relative"}
                  left={"10"}
                  bottom={"1.5"}
                  name="email"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </CardBody>
              <CardBody display={"flex"}>
                <Heading size="md">Phone:</Heading>
                <Editable
                  defaultValue={state.phoneNumber}
                  fontSize="xl"
                  isPreviewFocusable={false}
                  position={"relative"}
                  left={"10"}
                  bottom={"1.5"}
                  name="phone"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </CardBody>
              <CardBody display={"flex"}>
                <Heading size="md">Username:</Heading>
                <Editable
                  defaultValue={state.username}
                  fontSize="xl"
                  isPreviewFocusable={false}
                  position={"relative"}
                  left={"10"}
                  bottom={"1.5"}
                  name="phone"
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </CardBody>
              <CardFooter>
                <Button variant="solid" colorScheme="green" onClick={handleEdit}>
                  Edit Details
                </Button>
                <Button
                  variant="solid"
                  colorScheme="orange"
                  position={"relative"}
                  left={"1.5"}
                  onClick={handleBack}
                >
                  Back to Home
                </Button>
              </CardFooter>
            </Stack>
          </Card>
          <Spinner
            color="orange"
            size={"xl"}
            marginLeft="64"
            marginTop="12"
            visibility={success ? "hidden" : "visible"}
            position={"relative"}
            left={"96"}
          />
        </div>
      </div>
    );
  }

  return <CustomControlsExample />;
}

export default UserDetails;
