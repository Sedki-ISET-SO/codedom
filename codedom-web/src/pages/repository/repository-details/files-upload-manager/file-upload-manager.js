import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Stack } from '@chakra-ui/react';
import ChakraDropzone from '../../../../components/ChakraDropzone';

export default function FilesUploadManager() {
  let param = useParams();

  let navigate = useNavigate();

  const [files, setFiles] = useState([]);

  function onUploadfiles(e) {
    let file = e.target.files;
    console.log(file);
    setFiles(e.target.files);
    console.log(files);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData();

    for (var i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    var requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    fetch(`http://localhost:8080/file/${param.commitId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .then(setTimeout(navigate(`/repos/${param.repoId}`), 3000))
      .catch(error => console.log('error', error));
  }

  return (
    <Container maxW="xl" centerContent mt={5}>
      <div>
        <form onSubmit={handleSubmit}>
          {/* <Input type="file" multiple="multiple" onChange={onUploadfiles} /> */}
          <ChakraDropzone onChange={onUploadfiles} />
          <Stack spacing={6}>
            <Button
              type="submit"
              colorScheme={'purple'}
              color={'white'}
              bg={'purple.500'}
              _hover={{ bg: 'purple.400' }}
              marginTop={4}
              loadingText="Comitting"
            >
              Commit
            </Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
}
