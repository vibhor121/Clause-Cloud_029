// components/CustomizationPanel.jsx
import React, { useContext } from 'react';
import { VStack, HStack, Text, Input, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Divider } from '@chakra-ui/react';
import { WebsiteContext } from '../contexts/WebsiteContext';

const CustomizationPanel = () => {
  const { customizations, updateCustomization } = useContext(WebsiteContext);

  const handleColorChange = (e) => {
    updateCustomization('color', e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    updateCustomization('backgroundColor', e.target.value);
  };

  const handleBackgroundImageChange = (e) => {
    updateCustomization('backgroundImage', e.target.value);
  };

  const handleFontChange = (e) => {
    updateCustomization('fontFamily', e.target.value);
  };

  const handleBorderRadiusChange = (value) => {
    updateCustomization('borderRadius', value);
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Text fontWeight="bold">Customize</Text>
      <HStack display={'flex'} flexDir={'column'} >
        <Text>Text Color</Text>
        <Input 
          type="color" 
          value={customizations.color || '#000000'} 
          onChange={handleColorChange} 
        />
      </HStack>
      <Divider  />
      <HStack display={'flex'} flexDir={'column'}>
        <Text>Background Color</Text>
        <Input 
          type="color" 
          value={customizations.backgroundColor || '#ffffff'} 
          onChange={handleBackgroundColorChange} 
        />
      </HStack>
      <Divider />
      <HStack display={'flex'} flexDir={'column'}>
        <Text>Background Image URL</Text>
        <Input 
          type="text" 
          value={customizations.backgroundImage || ''} 
          onChange={handleBackgroundImageChange} 
          placeholder="Enter image URL"
        />
      </HStack>
      <HStack display={'flex'} flexDir={'column'}>
        <Text>Font</Text>
        <Select onChange={handleFontChange} value={customizations.fontFamily}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Roboto">Roboto</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Playfair Display">Playfair Display</option>
        </Select>
      </HStack>
      <HStack display={'flex'} flexDir={'column'}>
        <Text>Border Radius</Text>
        <NumberInput 
          min={0} 
          max={50} 
          w={'100%'}
          value={customizations.borderRadius || 0} 
          onChange={handleBorderRadiusChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </VStack>
  );
};

export default CustomizationPanel;