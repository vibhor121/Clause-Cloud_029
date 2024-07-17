import React, { createContext, useState, useCallback } from 'react';

export const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
  const [elements, setElements] = useState([]);
  const [customizations, setCustomizations] = useState({});

  const addElement = useCallback((element) => {
    setElements((prevElements) => [...prevElements, element]);
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

  return (
    <WebsiteContext.Provider
      value={{
        elements,
        addElement,
        updateElement,
        removeElement,
        customizations,
        updateCustomization,
        applyTemplate,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};
