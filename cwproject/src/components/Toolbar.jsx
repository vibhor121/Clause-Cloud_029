import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { contentBlocks } from '../Data/contentBlocks';

const ToolbarContainer = styled.div`
  margin-top: 20px;
`;

const ToolbarItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #e0e0e0;
  cursor: move;
`;

const DraggableItem = ({ id, type, name, content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CONTENT_BLOCK',
    item: { id, type, content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <ToolbarItem ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </ToolbarItem>
  );
};

const Toolbar = () => {
  return (
    <ToolbarContainer>
      <h3>Content Blocks</h3>
      {contentBlocks.map((block) => (
        <DraggableItem key={block.id} {...block} />
      ))}
    </ToolbarContainer>
  );
};

export default Toolbar;