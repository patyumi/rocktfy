import React from 'react';

// necessários para funcionar o drag n drop do dnd
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from './components/Header';
import Board from './components/Board';

// Styled-components
import GlobalStyle from './styles/global';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>

      <Header />
      <Board />

      <GlobalStyle />
    </DndProvider>
  );
}

export default App;
