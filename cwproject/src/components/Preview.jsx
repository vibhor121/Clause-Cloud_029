import React, { useContext } from 'react'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'
import { Box, Image, Text } from '@chakra-ui/react'

const PreviewContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.backgroundColor || 'white'};
  background-image: ${props => props.backgroundImage || 'none'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  color: ${props => props.color || 'black'};
  font-family: ${props => props.fontFamily || 'Arial, sans-serif'};
`

const Preview = () => {
  const { elements, customizations } = useContext(WebsiteContext)

  const renderElement = (element) => {
    switch (element.type) {
      case 'image':
        return <Image src={element.content} alt="Preview image" borderRadius={customizations.borderRadius} />
      case 'header':
        return <Text as="h2" fontSize="2xl" fontWeight="bold" dangerouslySetInnerHTML={{ __html: element.content }} />
      case 'paragraph':
        return <Text dangerouslySetInnerHTML={{ __html: element.content }} />
      default:
        return <Box dangerouslySetInnerHTML={{ __html: element.content }} />
    }
  }

  return (
    <PreviewContainer {...customizations}>
      {elements.map((element) => (
        <Box key={element.id} mb={4}>
          {renderElement(element)}
        </Box>
      ))}
    </PreviewContainer>
  )
}

export default Preview