// components/DraggableElement.jsx
import React, { useContext } from 'react';
import { Box, Button, VStack, Image } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { useDrag } from 'react-dnd';
const DraggableElement = ({ id, type, content }) => {
  const { updateElement, removeElement, customizations } = useContext(WebsiteContext);

  const handleContentEdit = (e) => {
    updateElement(id, { content: e.target.innerHTML });
  };

  const renderContent = () => {
    if (type === 'image') {
      return (
        <Image 
          src={content} 
          alt="User uploaded image" 
          borderRadius={customizations.borderRadius}
        />
      );
    }
    return (
      <Box
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={handleContentEdit}
        minHeight="20px"
        p={2}
        border="1px"
        borderColor="gray.100"
        borderRadius={customizations.borderRadius}
      />
    );
  };

  return (
    <VStack 
      spacing={2}
      align="stretch"
      p={3}
      border="1px"
      borderColor="gray.200"
      borderRadius={customizations.borderRadius}
    >
      {renderContent()}
      <Button
        size="sm"
        colorScheme="red"
        onClick={() => removeElement(id)}
      >
        Remove
      </Button>
    </VStack>
  );
};

export default DraggableElement;