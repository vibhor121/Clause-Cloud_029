import React, { useContext } from 'react'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'
import { toPng } from 'html-to-image'

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius:15px;
`

const PublishButton = () => {
  const { elements, customizations } = useContext(WebsiteContext)

  const handlePublish = async () => {
    const node = document.createElement('div')
    node.style = Object.entries(customizations).map(([key, value]) => `${key}:${value}`).join(';')
    elements.forEach(element => {
      const div = document.createElement('div')
      div.innerHTML = element.content
      node.appendChild(div)
    })
    document.body.appendChild(node)

    try {
      const dataUrl = await toPng(node)
      const link = document.createElement('a')
      link.download = 'my-website.png'
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to generate image:', error)
    }

    document.body.removeChild(node)
  }

  return (
    <Button onClick={handlePublish}>
    Publish
  </Button>
  )
}

export default PublishButton