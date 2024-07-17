import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex, Button, VStack } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WebsiteProvider, WebsiteContext } from './contexts/WebsiteContext';
import Toolbar from './components/Toolbar';
import DragDropArea from './components/DragDropArea';
import Preview from './components/Preview';
import CustomizationPanel from './components/CustomizationPanel';
import PublishButton from './components/PublishButton';
import TemplateLibrary from './components/TemplateLibrary';

function App() {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <WebsiteProvider>
        <Flex height="100vh">
          <Box width="300px" bg="purple.600" p={5} overflowY="auto">
            <VStack spacing={4} align="stretch">
              <TemplateLibrary />
              <Toolbar />
              <CustomizationPanel />
            </VStack>
          </Box>
          <Flex flex={1} flexDirection="column">
            <Flex justifyContent="space-between" p={3} bg="gray.200">
              <Button onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? 'Edit Mode' : 'Preview Mode'}
              </Button>
              <PublishButton />
            </Flex>
            {showPreview ? (
              <Preview />
            ) : (
              <DragDropArea />
            )}
          </Flex>
        </Flex>
      </WebsiteProvider>
    </DndProvider>
  );
}

export default App;
