import React from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WebsiteContext } from './contexts/WebsiteContext';
import { useWebsiteBuilder } from './Hooks/useWebsiteBuilder';
import Toolbar from './components/Toolbar';
import DragDropArea from './components/DragDropArea';
import Preview from './components/Preview';
import TemplateLibrary from './components/TemplateLibrary';
import CustomizationPanel from './components/CustomizationPanel';
import UserAuth from './components/UserAuth';
import PublishButton from './components/PublishButton';
import GlobalStyles from './styles/GlobalStyles';
const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  width: 300px;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #e0e0e0;
`;

function App() {
  const websiteBuilder = useWebsiteBuilder();
  const [showPreview, setShowPreview] = React.useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <WebsiteContext.Provider value={websiteBuilder}>
        <GlobalStyles />
        <AppContainer>
          <LeftPanel>
            <UserAuth />
            <TemplateLibrary />
            <Toolbar />
            <CustomizationPanel />
          </LeftPanel>
          <RightPanel>
            <TopBar>
              <button onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <PublishButton />
            </TopBar>
            {showPreview ? <Preview /> : <DragDropArea />}
          </RightPanel>
        </AppContainer>
      </WebsiteContext.Provider>
    </DndProvider>
  );
}

export default App;