// components/DragDropArea.jsx
import { useContext } from 'react';
import { Box, VStack, Text, Center } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import DraggableElement from './DraggableElement';

const DragDropArea = () => {
  const { elements, customizations } = useContext(WebsiteContext);

  return (
    <Box
      flex={1}
      p={5}
      bg="white"
      minHeight="100vh"
      overflowY="auto"
      {...customizations}
    >
      {elements.length === 0 ? (
        <Center h="100%" minH="400px">
          <VStack spacing={4}>
            <Text fontSize="xl" color="gray.500" textAlign="center">
              🎨 Your website is empty
            </Text>
            <Text color="gray.400" textAlign="center">
              Add content blocks from the toolbar on the left to get started
            </Text>
          </VStack>
        </Center>
      ) : (
        <VStack spacing={4} align="stretch">
          {elements.map((element, index) => (
            <DraggableElement key={element.id} element={element} index={index} />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default DragDropArea;