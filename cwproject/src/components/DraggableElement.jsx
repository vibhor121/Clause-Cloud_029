import React, { useContext, useRef } from 'react';
import { Box, Button, VStack, Image, Input, Text } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { useDrag, useDrop } from 'react-dnd';

const DraggableElement = ({ element, index }) => {
  const { updateElement, removeElement, moveElement, customizations } = useContext(WebsiteContext);
  const ref = useRef(null);
  const fileInputRef = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'element',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveElement(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'element',
    item: () => {
      return { id: element.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleContentEdit = (e) => {
    updateElement(element.id, { content: e.target.innerHTML });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateElement(element.id, { content: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (element.type) {
      case 'image':
        return (
          <>
            <Image 
              src={element.content} 
              alt="User uploaded image" 
              borderRadius={customizations.borderRadius}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              display="none"
              ref={fileInputRef}
            />
            <Button onClick={() => fileInputRef.current.click()}>
              Change Image
            </Button>
          </>
        );
      case 'header':
        return (
          <Text
            as="h2"
            fontSize="2xl"
            fontWeight="bold"
            contentEditable
            dangerouslySetInnerHTML={{ __html: element.content }}
            onBlur={handleContentEdit}
          />
        );
      case 'paragraph':
        return (
          <Text
            contentEditable
            dangerouslySetInnerHTML={{ __html: element.content }}
            onBlur={handleContentEdit}
          />
        );
      default:
        return (
          <Box
            contentEditable
            dangerouslySetInnerHTML={{ __html: element.content }}
            onBlur={handleContentEdit}
            minHeight="20px"
            p={2}
            border="1px"
            borderColor="gray.100"
            borderRadius={customizations.borderRadius}
          />
        );
    }
  };

  return (
    <VStack 
      ref={ref}
      spacing={2}
      align="stretch"
      p={3}
      border="1px"
      borderColor="gray.200"
      borderRadius={customizations.borderRadius}
      opacity={isDragging ? 0.5 : 1}
      data-handler-id={handlerId}
    >
      {renderContent()}
      <Button
        size="sm"
        colorScheme="red"
        onClick={() => removeElement(element.id)}
      >
        Remove
      </Button>
    </VStack>
  );
};

export default DraggableElement;