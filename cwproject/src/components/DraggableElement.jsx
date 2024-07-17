import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'

const Element = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: white;
  border: 1px solid #ddd;
  cursor: move;
`

const DraggableElement = ({ id, type, content }) => {
  const { updateElement, removeElement } = useContext(WebsiteContext)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'WEBSITE_ELEMENT',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const handleContentEdit = (e) => {
    updateElement(id, { content: e.target.innerHTML })
  }

  return (
    <Element ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={handleContentEdit}
      />
      <button onClick={() => removeElement(id)}>Remove</button>
    </Element>
  )
}

export default DraggableElement