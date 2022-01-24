import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosConfig';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Stack,
  Link,
} from '@chakra-ui/react';

export default function RepositoryDetails() {
  let repository = {
    name: '',
    description: '',
    visibility: false,
    creationDate: '',
    lastUpdateDate: '',
    size: null,
    donwloadsNumber: null,
  };

  const [repositoryDetails, setRepositoryDetails] = useState([repository]);

  const [repositoryCommits, setRepositoryCommits] = useState([]);

  const [lastCommitedFiles, setLastCommitedFiles] = useState([]);

  let param = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/repo/${param.repoId}`)
      .then(response => {
        console.log('Repository Details: ', response.data);
        let repository = {
          name: response.data.name,
          description: response.data.description,
          visibility: response.data.is_visible,
          creationDate: response.data.createdAt,
          lastUpdateDate: response.data.updatedAt,
          size: response.data.repositorySize,
          donwloadsNumber: response.data.downloadsNumber,
        };
        setRepositoryDetails([repository]);
      })
      .then(console.log(repositoryDetails))
      .catch(error => {
        console.log(error);
      });
  }, [param.repoId]);

  useEffect(() => {
    axiosInstance
      .get(`/commits/${param.repoId}`)
      .then(response => {
        console.log('Commits: ', response.data);
        setRepositoryCommits(response.data.content);
      })
      .catch(error => {
        console.log(error);
      });
  }, [param.repoId]);

  useEffect(() => {
    axiosInstance.get(`/files/newest/${param.repoId}`).then(response => {
      console.log('Files: ', response.data);
      setLastCommitedFiles(response.data.content);
    });
  }, [param.repoId]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  let initialCommitData = {
    message: '',
  };

  const [commit, setCommit] = useState(initialCommitData);

  function onInputChange(event) {
    setCommit(prevState => {
      return {
        ...prevState,
        message: event.target.value,
      };
    });
    console.log('Commit Message Changed: ', commit);
  }

  const [commitId, setCommitId] = useState(null);

  function changeCommitId(newCommitId) {
    setCommitId(newCommitId);
  }

  useEffect(() => {
    if (commitId > 0) {
      console.log('New Commit Id: ', commitId);
      navigate(`/repos/commit/${param.repoId}/${commitId}`);
    }
  }, [commitId]);

  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (commit.message && commit.message.length !== 0) {
      axiosInstance
        .post(`/commit/${param.repoId}`, {
          message: commit.message,
        })
        .then(response => {
          console.log('Commit Id: ', response.data.id);
          let id = response.data.id;
          changeCommitId(id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  const [downloadableLinks, setDownloadableLinks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/files/load/getFiles')
      .then(response => {
        console.log('Downloaded Files: ', response.data);
        setDownloadableLinks(response.data);
        console.log(downloadableLinks);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (downloadableLinks !== undefined) {
      console.log('New Downloadable Links : ', downloadableLinks);
    }
  }, [downloadableLinks]);

  return (
    <section>
      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Visiblity</Th>
            <Th isNumeric>Creation Date</Th>
            <Th isNumeric>Last Update Date</Th>
            <Th isNumeric>Size</Th>
            <Th isNumeric>Downloads Number</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositoryDetails &&
            repositoryDetails.map((repository, index) => (
              <Tr key={index}>
                <Td>{repository.name}</Td>
                <Td>{repository.description}</Td>
                <Td>
                  {repository.visibility ? (
                    <Text as="i">Public</Text>
                  ) : (
                    <Text as="i">Private</Text>
                  )}
                </Td>
                <Td isNumeric>{repository.creationDate}</Td>
                <Td isNumeric>{repository.lastUpdateDate}</Td>
                <Td isNumeric>{repository.size == null && 0}</Td>
                <Td isNumeric>{repository.downloadsNumber == null && 0}</Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Visiblity</Th>
            <Th isNumeric>Creation Date</Th>
            <Th isNumeric>Last Update Date</Th>
            <Th isNumeric>Size</Th>
            <Th isNumeric>Downloads Number</Th>
          </Tr>
        </Tfoot>
      </Table>

      <Button onClick={onOpen} ml={5}>
        Commit New Code
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            A commit, is like a snapshot of your repository
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Commit Message</FormLabel>
                <Input
                  ref={initialRef}
                  defaultValue={commit.message}
                  onChange={onInputChange}
                  placeholder="Commit message"
                />
              </FormControl>

              <Stack spacing={6}>
                <Button
                  type="submit"
                  colorScheme={'purple'}
                  color={'white'}
                  bg={'purple.500'}
                  _hover={{ bg: 'purple.400' }}
                  marginTop={4}
                  loadingText="Loading"
                >
                  Next
                </Button>
              </Stack>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Hash</Th>
            <Th>Message</Th>
            <Th isNumeric>Creation Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositoryCommits &&
            repositoryCommits.map((commit, index) => (
              <Tr key={index}>
                <Td>{commit.footPrint}</Td>
                <Td>{commit.message}</Td>
                <Td>{commit.createdAt}</Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Hash</Th>
            <Th>Message</Th>
            <Th isNumeric>Creation Date</Th>
          </Tr>
        </Tfoot>
      </Table>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Path</Th>
            <Th>Size</Th>
            <Th>Download Link</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lastCommitedFiles &&
            lastCommitedFiles.map((file, index) => (
              <Tr key={index}>
                <Td>{file[0]}</Td>
                <Td>{file[1]}</Td>
                <Td>{file[2]}</Td>
                <Td>
                  <Button>
                    <Link href={downloadableLinks[index]} isExternal>
                      Download
                    </Link>
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Path</Th>
            <Th>Size</Th>
            <Th>Download Link</Th>
          </Tr>
        </Tfoot>
      </Table>
    </section>
  );
}
