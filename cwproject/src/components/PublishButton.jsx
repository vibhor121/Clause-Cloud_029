import { useContext, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { WebsiteContext } from '../contexts/WebsiteContext'
import { toPng } from 'html-to-image'

const PublishButton = () => {
  const { elements, customizations } = useContext(WebsiteContext)
  const [isPublishing, setIsPublishing] = useState(false)
  const toast = useToast()

  const handlePublish = async () => {
    if (elements.length === 0) {
      toast({
        title: "No content to publish",
        description: "Add some elements before publishing",
        status: "warning",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsPublishing(true)
    let node = null
    
    try {
      node = document.createElement('div')
      node.style.cssText = Object.entries(customizations)
        .map(([key, value]) => `${key}:${value}`)
        .join(';')
      
      elements.forEach(element => {
        const div = document.createElement('div')
        div.innerHTML = element.content
        node.appendChild(div)
      })
      
      document.body.appendChild(node)

      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: customizations.backgroundColor || '#ffffff'
      })
      
      const link = document.createElement('a')
      link.download = 'my-website.png'
      link.href = dataUrl
      link.click()
      
      toast({
        title: "Website published!",
        description: "Your website has been downloaded as an image",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Failed to generate image:', error)
      toast({
        title: "Publish failed",
        description: "Failed to generate website image. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } finally {
      if (node && document.body.contains(node)) {
        document.body.removeChild(node)
      }
      setIsPublishing(false)
    }
  }

  return (
    <Button 
      onClick={handlePublish}
      colorScheme="green"
      size="md"
      borderRadius="md"
      isLoading={isPublishing}
      loadingText="Publishing..."
    >
      Publish
    </Button>
  )
}

export default PublishButton