// components/Toolbar.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { VStack, Box, Heading } from '@chakra-ui/react';
import { contentBlocks } from '../Data/contentBlocks';

const DraggableItem = ({ id, type, name, content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CONTENT_BLOCK',
    item: { id, type, content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box
      ref={drag}
      p={2}
      my={1}
      bg="white"
      color="purple.700"
      borderRadius="md"
      boxShadow="sm"
      cursor="move"
      opacity={isDragging ? 0.5 : 1}
    >
      {name}
    </Box>
  );
};

const Toolbar = () => {
  return (
    <VStack align="stretch" spacing={2}>
      <Heading size="md" color="white">Content Blocks</Heading>
      {contentBlocks.map((block) => (
        <DraggableItem key={block.id} {...block} />
      ))}
    </VStack>
  );
};

export default Toolbar;