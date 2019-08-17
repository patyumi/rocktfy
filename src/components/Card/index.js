import React, { useRef, useContext } from 'react';

// biblioteca que faz o drag n' drop dos itens
import { useDrag, useDrop } from 'react-dnd';

// componente
import BoardContext from '../Board/context';

// styled-component
import { Container, Label } from './styles';

// componente principal
export default function Card({ data, index, listIndex }) {
  const ref = useRef();

  // HOOK: useContext
  const { move } = useContext(BoardContext);

  // função: permite o "drag" de elementos
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // função: permite o "drop" de elementos
  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      // caso tente arrastar um item para o seu mesmo local
      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex){
        return;
      }

      // recupera tamanho do elemento em que o card está passando
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      // recupera a posição do card arrastado
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      // caso tente arrastar o primeiro item para o mesmo local
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

       // caso tente arrastar o último item para o mesmo local
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      // chama função que move o card
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      // troca a posição dos cards ao movê-los
      item.index = targetIndex;
      item.listIndex = targetListIndex;

    }
  })

  // "encapsula" dois
  dragRef(dropRef(ref));

  // elementos
    return (
        <Container ref={ref} isDragging={isDragging}>
            <header>
              {data.labels.map(label => <Label key={label} color={label} />)}

            </header>
            <p>{data.content}</p>

            {data.user && <img src={data.user} alt="avatar"/>}
        </Container>
    );
}
