import React, { useContext } from 'react'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'

const PreviewContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  overflow-y: auto;
`

const Preview = () => {
  const { elements, customizations } = useContext(WebsiteContext)

  return (
    <PreviewContainer style={customizations}>
      {elements.map((element) => (
        <div key={element.id} dangerouslySetInnerHTML={{ __html: element.content }} />
      ))}
    </PreviewContainer>
  )
}

export default Preview