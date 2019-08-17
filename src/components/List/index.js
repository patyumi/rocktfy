import React from 'react';

// componente
import Card from '../Card';

// ícone
import { MdAdd } from 'react-icons/md';

// styled-component
import { Container } from './styles';

// componente principal
export default function List({ data, index: listIndex }) {

  // elementos
    return (
        <Container done={data.done}>
            <header>
              <h2>{data.title}</h2>
              { data.creatable && (
              <button type="button">
                <MdAdd size={24} color="#FFF" />
              </button>
              )}
            </header>

            <ul>
              {data.cards.map((card, index) => <Card key={card.id} listIndex={listIndex} index={index} data={card} />)}
            </ul>
        </Container>
    );
}
