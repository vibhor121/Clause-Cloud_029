import React, { useContext } from 'react';
import styled from 'styled-components';
import { WebsiteContext } from '../contexts/WebsiteContext';
import html2canvas from 'html2canvas';

const PublishButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
`;

export const PublishWebsite = () => {
  const { websiteElements, customStyles } = useContext(WebsiteContext);

  const handlePublish = async () => {
    const content = document.createElement('div');
    content.style = Object.entries(customStyles).map(([key, value]) => `${key}:${value}`).join(';');
    websiteElements.forEach(element => {
      const el = document.createElement('div');
      el.innerHTML = element.content;
      el.style = Object.entries(element.style || {}).map(([key, value]) => `${key}:${value}`).join(';');
      content.appendChild(el);
    });

    document.body.appendChild(content);
    const canvas = await html2canvas(content);
    document.body.removeChild(content);

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'my-website.png';
    link.click();

    alert('Your website has been published! (Simulated by downloading as image)');
  };

  return <PublishButton onClick={handlePublish}>Publish Website</PublishButton>;
};

