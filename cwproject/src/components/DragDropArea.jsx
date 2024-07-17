import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'
import DraggableElement from './DraggableElement'

const DropArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f8f8;
  overflow-y: auto;
`

const DragDropArea = () => {
  const { elements, addElement } = useContext(WebsiteContext)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CONTENT_BLOCK',
    drop: (item) => addElement({ ...item, id: Date.now().toString() }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <DropArea ref={drop} style={{ backgroundColor: isOver ? '#e0e0e0' : '#f8f8f8' }}>
      {elements.map((element) => (
        <DraggableElement key={element.id} {...element} />
      ))}
    </DropArea>
  )
}

export default DragDropArea