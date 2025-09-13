import { useContext } from 'react';
import { VStack, Button, Heading } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { templates } from '../Data/template';

const TemplateLibrary = () => {
  const { applyTemplate } = useContext(WebsiteContext);

  const handleTemplateSelect = (template) => {
    applyTemplate(template);
  };

  return (
    <VStack align="stretch" spacing={2}>
      <Heading size="md" color="Black">Templates</Heading>
      {templates.map((template) => (
        <Button
          key={template.id}
          onClick={() => handleTemplateSelect(template)}
          colorScheme="purple"
          size="sm"
          variant="solid"
        >
          {template.name}
        </Button>
      ))}
    </VStack>
  );
};

export default TemplateLibrary;
