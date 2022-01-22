import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Icon } from '@chakra-ui/react';
import { MdAttachFile } from 'react-icons/md';

export default function ChakraDropzone({ onFilesAccepted, onChange }) {
  const onDrop = useCallback((acceptedFiles) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: true,
  });

  const dropText = isDragActive ? 'Drop the binary files here ...' : 'Drag \'n\' drop your copy paste code binary files here, or click to select files';

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500',
  );

  return (
    <Center
      p={10}
      cursor="pointer"
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg }}
      transition="background-color 0.2s ease"
      borderRadius={4}
      border="3px dashed"
      borderColor={borderColor}
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} onChange={onChange} />
      <Icon as={MdAttachFile} h={6} w={6} mr={2} />
      <p>{dropText}</p>
    </Center>
  );
}