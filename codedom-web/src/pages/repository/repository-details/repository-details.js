import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosConfig';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Text } from '@chakra-ui/react';

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
  }, [repositoryDetails]);

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
  }, [repositoryCommits]);

  useEffect(() => {
    axiosInstance.get(`/files/newest/${param.repoId}`).then(response => {
      console.log('Files: ', response.data);
      setLastCommitedFiles(response.data.content);
    });
  }, [lastCommitedFiles]);

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
          </Tr>
        </Thead>
        <Tbody>
          {lastCommitedFiles &&
            lastCommitedFiles.map((file, index) => (
              <Tr key={index}>
                <Td>{file[0]}</Td>
                <Td>{file[1]}</Td>
                <Td>{file[2]}</Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Path</Th>
            <Th>Size</Th>
          </Tr>
        </Tfoot>
      </Table>
    </section>
  );
}
