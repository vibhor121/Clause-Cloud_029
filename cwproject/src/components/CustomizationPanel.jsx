import React, { useContext } from 'react'
import styled from 'styled-components'
import { WebsiteContext } from '../contexts/WebsiteContext'

const CustomizationContainer = styled.div`
  margin-top: 20px;
`

const CustomizationOption = styled.div`
  margin: 10px 0;
`

const CustomizationPanel = () => {
  const { updateCustomization } = useContext(WebsiteContext)

  const handleColorChange = (e) => {
    updateCustomization('color', e.target.value)
  }

  const handleFontChange = (e) => {
    updateCustomization('fontFamily', e.target.value)
  }

  return (
    <CustomizationContainer>
      <h3>Customize</h3>
      <CustomizationOption>
        <label>Color: </label>
        <input type="color" onChange={handleColorChange} />
      </CustomizationOption>
      <CustomizationOption>
        <label>Font: </label>
        <select onChange={handleFontChange}>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </CustomizationOption>
    </CustomizationContainer>
  )
}

export default CustomizationPanel