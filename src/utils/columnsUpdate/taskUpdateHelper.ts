import { Dispatch, SetStateAction } from 'react';

interface taskUpdate {
  draggedDOM: Element;
  droppedDOM: Element | null;
  event: any;
  setTaskPlaceholderProps: Dispatch<SetStateAction<{}>>;
}

export default function taskUpdateHelper({
  draggedDOM,
  droppedDOM,
  event,
  setTaskPlaceholderProps
}: taskUpdate) {
  const { clientHeight, clientWidth } = draggedDOM;
  const sourceIndex = event.source.index;

  if (draggedDOM.parentNode && droppedDOM) {
    const destinationIndex = event.destination.index;

    const childrenArray = Array.from(draggedDOM.parentNode.children);

    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);
    const destinationChildrenArray = Array.from(droppedDOM.children[0].children);
    let updatedArray;
    if (draggedDOM.parentNode === droppedDOM) {
      updatedArray = [
        ...childrenArray.slice(0, destinationIndex),
        movedItem,
        ...childrenArray.slice(destinationIndex + 1)
      ];
    } else {
      updatedArray = [
        ...destinationChildrenArray.slice(0, destinationIndex),
        movedItem,
        ...destinationChildrenArray.slice(destinationIndex + 1)
      ];
    }

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode as HTMLElement).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginTop = parseFloat(style.marginTop);
        return total + curr.clientHeight + marginTop;
      }, 0);

    setTaskPlaceholderProps({
      destination: event.destination.droppableId,
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode as Element).paddingLeft)
    });
  }
}
