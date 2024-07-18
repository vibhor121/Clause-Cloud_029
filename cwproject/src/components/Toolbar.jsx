// components/Toolbar.jsx
import React, { useContext } from 'react';
import { VStack, Button, Heading } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { contentBlocks } from '../Data/contentBlocks';

const Toolbar = () => {
  const { addElement } = useContext(WebsiteContext);

  const handleAddElement = (block) => {
    addElement(block);
  };

  const handleAddImage = () => {
    addElement({
      id: Date.now().toString(),
      type: 'image',
      content: 'https://via.placeholder.com/300x200',
    });
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Heading size="md" color="black">Content Blocks</Heading>
      {contentBlocks.map((block) => (
        <Button
          key={block.id}
          onClick={() => handleAddElement(block)}
          bg="blue"
          color="white"
          border='none'
          variant="outline"
        >
          {block.name}
        </Button>
      ))}
      <Button
        onClick={handleAddImage}
        bg="green"
        color="white"
        border='none'
        variant="outline"
      >
        Add Image
      </Button>
    </VStack>
  );
};

export default Toolbar;