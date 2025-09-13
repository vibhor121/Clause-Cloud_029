import { useContext, useRef, useState, useEffect } from 'react';
import { Box, Button, VStack, Image, Input, Text, HStack, Icon } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const DraggableElement = ({ element, index }) => {
  const { updateElement, removeElement, moveElement, customizations } = useContext(WebsiteContext);
  const ref = useRef(null);

  const getImageUrl = (content) => {
    // If content is HTML, extract the src attribute
    if (content.includes('<img')) {
      const match = content.match(/src="([^"]*)"/);
      return match ? match[1] : content;
    }
    // If content is already a URL, return it
    return content;
  };

  const [imageUrl, setImageUrl] = useState(getImageUrl(element.content));
  const [isEditing, setIsEditing] = useState(false);

  // Update imageUrl when element content changes (only if not currently editing)
  useEffect(() => {
    if (!isEditing) {
      setImageUrl(getImageUrl(element.content));
    }
  }, [element.content, isEditing]);

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
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      
      // Time to actually perform the action
      moveElement(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setIsEditing(true);
  };

  const handleImageUrlSubmit = () => {
    updateElement(element.id, { content: imageUrl });
    setIsEditing(false);
  };

  const handleImageUrlKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleImageUrlSubmit();
    }
  };

  const renderContent = () => {
    switch (element.type) {
      case 'image': {
        const imageSrc = getImageUrl(element.content);
        return (
          <>
            <Image 
              src={imageSrc} 
              alt="User provided image" 
              borderRadius={customizations.borderRadius}
              maxW="100%"
              h="auto"
              loading="lazy"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
              }}
              onLoad={() => {
                // Image loaded successfully
              }}
            />
            <Input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              onKeyPress={handleImageUrlKeyPress}
              placeholder="Enter image URL"
              size="sm"
            />
            <Button onClick={handleImageUrlSubmit} size="sm" colorScheme="blue">
              Change Image
            </Button>
          </>
        );
      }
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
      border="2px"
      borderColor={isDragging ? "blue.400" : "gray.200"}
      borderRadius={customizations.borderRadius || "md"}
      opacity={isDragging ? 0.6 : 1}
      bg={isDragging ? "blue.100" : "white"}
      cursor={isDragging ? "grabbing" : "grab"}
      data-handler-id={handlerId}
      transform={isDragging ? "rotate(2deg)" : "rotate(0deg)"}
      transition="all 0.2s ease"
      _hover={{
        borderColor: "blue.300",
        bg: "blue.50",
        transform: "translateY(-2px)",
        boxShadow: "lg"
      }}
      boxShadow={isDragging ? "xl" : "sm"}
    >
      <HStack justify="space-between" align="center" w="100%">
        <Text fontSize="xs" color="gray.500" flex="1" textAlign="center">
          ⋮⋮ Drag to reorder
        </Text>
        <Button
          size="xs"
          colorScheme="red"
          onClick={() => removeElement(element.id)}
        >
          Remove
        </Button>
      </HStack>
      {renderContent()}
    </VStack>
  );
};

DraggableElement.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DraggableElement;