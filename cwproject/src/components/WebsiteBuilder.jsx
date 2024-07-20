import React, { useState } from 'react';
import { Box, Flex, Button, VStack, Spacer } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import Toolbar from './Toolbar';
import DragDropArea from './DragDropArea';
import Preview from './Preview';
import CustomizationPanel from './CustomizationPanel';
import PublishButton from './PublishButton';
import TemplateLibrary from './TemplateLibrary';

function WebsiteBuilder() {
  const [showPreview, setShowPreview] = useState(false);
  const { logout } = useAuth0();

  return (
    <Flex height="100vh" direction="column">
      <Flex flex={1}>
        <Box width="300px" bg="white" p={5} overflowY="auto">
          <VStack spacing={4} align="stretch">
            <TemplateLibrary />
            <Toolbar />
            <CustomizationPanel />
          </VStack>
        </Box>
        <Flex flex={1} flexDirection="column">
          <Flex justifyContent="space-between" alignItems="center" p={3} bg="gray.200">
            <Button onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? 'Edit Mode' : 'Preview Mode'}
            </Button>
            <Spacer />
            <PublishButton />
            <Button 
              onClick={() => logout({ returnTo: window.location.origin })}
              ml={2}  // Add some margin to separate from PublishButton
            >
              Log Out
            </Button>
          </Flex>
          {showPreview ? (
            <Preview />
          ) : (
            <DragDropArea />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default WebsiteBuilder;