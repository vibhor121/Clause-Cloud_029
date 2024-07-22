import React, { createContext, useState, useCallback } from 'react';

export const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [customizations, setCustomizations] = useState({});

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

  const updateCustomization = useCallback((key, value) => {
    setCustomizations((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyTemplate = useCallback((template) => {
    setElements(template.elements);
    setCustomizations(template.customizations || {});
  }, []);
  const moveElement = useCallback((dragIndex, hoverIndex) => {
    setElements((prevElements) => {
      const newElements = [...prevElements];
      const [removed] = newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, removed);
      return newElements;
    });
  }, []);
  return (
    <WebsiteContext.Provider
      value={{
        elements,
        addElement,
        updateElement,
        removeElement,
        moveElement,
        customizations,
        updateCustomization,
        applyTemplate,

      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};
