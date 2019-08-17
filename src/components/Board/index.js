import React, { useState } from 'react';

// biblioteca que torna o estado do { useState } mutável
import produce from 'immer';

// listas cadastradas na api
import { loadLists } from '../../services/api';

// componentes
import BoardContext from './context';
import List from '../List';

// styled-component
import { Container } from './styles';

// componente principal
const data = loadLists();

export default function Board() {
  // HOOK: useState
  const [lists, setLists] = useState(data);

  // função: recebe os dados dos cards e os move
  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  // elementos
    return (
      <BoardContext.Provider value={{ lists, move }}>
        <Container>
          { lists.map((list, index) => <List key={list.title} index={index} data={list} /> )}
        </Container>
      </BoardContext.Provider>
    );
}
