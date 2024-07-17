import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Box, VStack } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import DraggableElement from './DraggableElement';

const DragDropArea = () => {
  const { elements, addElement, customizations } = useContext(WebsiteContext);

  const [{ isOver }, drop] = useDrop({
    accept: 'CONTENT_BLOCK',
    drop: (item) => addElement({ ...item, id: Date.now().toString() }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      ref={drop}
      flex={1}
      p={5}
      bg={isOver ? 'gray.100' : 'white'}
      minHeight="100vh"
      overflowY="auto"
      {...customizations}
    >
      <VStack spacing={4} align="stretch">
        {elements.map((element) => (
          <DraggableElement key={element.id} {...element} />
        ))}
      </VStack>
    </Box>
  );
};

export default DragDropArea
