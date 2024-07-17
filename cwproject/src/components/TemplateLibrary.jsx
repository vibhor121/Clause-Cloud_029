import React, { useContext } from 'react';
import styled from 'styled-components';
import { WebsiteContext } from '../contexts/WebsiteContext';
import { templates } from '../Data/template';

const TemplateContainer = styled.div`
  margin-bottom: 20px;
`;

const TemplateItem = styled.div`
  padding: 10px;
  margin: 5px 0;
  background-color: #e0e0e0;
  cursor: pointer;
`;

const TemplateLibrary = () => {
  const { applyTemplate } = useContext(WebsiteContext);

  const handleTemplateSelect = (template) => {
    applyTemplate(template);
  };

  return (
    <TemplateContainer>
      <h3>Templates</h3>
      {templates.map((template) => (
        <TemplateItem key={template.id} onClick={() => handleTemplateSelect(template)}>
          {template.name}
        </TemplateItem>
      ))}
    </TemplateContainer>
  );
};

export default TemplateLibrary;