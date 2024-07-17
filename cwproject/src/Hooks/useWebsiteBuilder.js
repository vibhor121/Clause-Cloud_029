import { useState, useEffect, useCallback } from 'react';

export const useWebsiteBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState({});

  useEffect(() => {
    const savedWebsite = localStorage.getItem('website');
    if (savedWebsite) {
      const { elements: savedElements, selectedTemplate: savedTemplate, customizations: savedCustomizations } = JSON.parse(savedWebsite);
      setElements(savedElements);
      setSelectedTemplate(savedTemplate);
      setCustomizations(savedCustomizations);
    }
  }, []);

  const saveWebsite = useCallback(() => {
    localStorage.setItem('website', JSON.stringify({ elements, selectedTemplate, customizations }));
  }, [elements, selectedTemplate, customizations]);

  const addElement = useCallback((element) => {
    setElements((prevElements) => [...prevElements, { ...element, id: Date.now().toString() }]);
  }, []);

  const updateElement = useCallback((id, updates) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  }, []);

  const removeElement = useCallback((id) => {
    setElements((prevElements) => prevElements.filter((el) => el.id !== id));
  }, []);

  const moveElement = useCallback((dragIndex, hoverIndex) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      const [removed] = newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, removed);
      return newElements;
    });
  }, []);

  const updateCustomization = useCallback((key, value) => {
    setCustomizations((prevCustomizations) => ({ ...prevCustomizations, [key]: value }));
  }, []);

  const applyTemplate = useCallback((template) => {
    setElements(template.elements);
    setCustomizations(template.customizations);
    setSelectedTemplate(template.id);
  }, []);

  return {
    elements,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    selectedTemplate,
    setSelectedTemplate,
    customizations,
    updateCustomization,
    saveWebsite,
    applyTemplate,
  };
};