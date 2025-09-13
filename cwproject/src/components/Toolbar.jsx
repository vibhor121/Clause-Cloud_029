// components/Toolbar.jsx
import { useContext } from 'react';
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
      content: 'https://picsum.photos/300/200',
    });
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Heading size="md" color="black">Content Blocks</Heading>
      {contentBlocks.map((block) => (
        <Button
          key={block.id}
          onClick={() => handleAddElement(block)}
          colorScheme="blue"
          size="sm"
          variant="solid"
        >
          {block.name}
        </Button>
      ))}
      <Button
        onClick={handleAddImage}
        colorScheme="green"
        size="sm"
        variant="solid"
      >
        Add Image
      </Button>
    </VStack>
  );
};

export default Toolbar;