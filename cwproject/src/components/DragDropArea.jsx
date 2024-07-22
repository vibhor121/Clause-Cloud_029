// components/DragDropArea.jsx
import React, { useContext } from 'react';
import { Box, VStack } from '@chakra-ui/react';
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
      <VStack spacing={4} align="stretch">
        {elements.map((element, index) => (
          <DraggableElement key={element.id} element={element} index={index} />
        ))}
      </VStack>
    </Box>
  );
};

export default DragDropArea;