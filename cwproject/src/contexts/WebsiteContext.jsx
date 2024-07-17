import React, { createContext, useState, useEffect } from 'react'

export const WebsiteContext = createContext()

export const WebsiteProvider = ({ children }) => {
  const [elements, setElements] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [customizations, setCustomizations] = useState({})

  useEffect(() => {
    const savedWebsite = localStorage.getItem('website')
    if (savedWebsite) {
      const { elements, selectedTemplate, customizations } = JSON.parse(savedWebsite)
      setElements(elements)
      setSelectedTemplate(selectedTemplate)
      setCustomizations(customizations)
    }
  }, [])

  const saveWebsite = () => {
    localStorage.setItem('website', JSON.stringify({ elements, selectedTemplate, customizations }))
  }

  const addElement = (element) => {
    setElements([...elements, element])
  }

  const updateElement = (id, updates) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el))
  }

  const removeElement = (id) => {
    setElements(elements.filter(el => el.id !== id))
  }

  const updateCustomization = (key, value) => {
    setCustomizations({ ...customizations, [key]: value })
  }

  return (
    <WebsiteContext.Provider value={{
      elements,
      addElement,
      updateElement,
      removeElement,
      selectedTemplate,
      setSelectedTemplate,
      customizations,
      updateCustomization,
      saveWebsite
    }}>
      {children}
    </WebsiteContext.Provider>
  )
}