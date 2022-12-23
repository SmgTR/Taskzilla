import { Dispatch, SetStateAction } from 'react';
import { ColumnProps } from '@/components/dashboard/columns/Columns';

interface ColumnUpdate {
  draggedDOM: Element;
  droppedDOM: Element | null;
  event: any;
  setColumnPlaceholderProps: Dispatch<SetStateAction<ColumnProps>>;
}

export default function columnUpdateHelper({
  draggedDOM,
  droppedDOM,
  event,
  setColumnPlaceholderProps
}: ColumnUpdate) {
  const { clientHeight, clientWidth } = draggedDOM.parentElement!;

  const sourceIndex = event.source.index;

  if (draggedDOM.parentNode && droppedDOM) {
    const destinationIndex = event.destination.index;

    const childrenArray = Array.from(draggedDOM.closest('ul')!.children);

    const movedItem = childrenArray[sourceIndex];

    childrenArray.splice(sourceIndex, 1);
    const destinationChildrenArray = Array.from(droppedDOM.children[0].children);
    let updatedArray;

    if (draggedDOM.closest('ul') === droppedDOM) {
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

    const clientX =
      parseFloat(window.getComputedStyle(draggedDOM.closest('ul') as HTMLElement).paddingRight) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const marginLeft = parseFloat(window.getComputedStyle(curr).marginLeft);
        return total + curr.clientWidth + marginLeft;
      }, 0);

    setColumnPlaceholderProps({
      destination: event.destination.droppableId,
      clientHeight,
      clientWidth,
      clientY: parseFloat(window.getComputedStyle(draggedDOM.closest('ul') as Element).paddingTop),
      clientX
    });
  }
}
