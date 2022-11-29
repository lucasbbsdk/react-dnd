import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import { COLUMN_NAMES } from '../../constants';


const styleComponent = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export const MovableItem = ({ id, name, index, currentColumnName, moveCardHandler, setItems, color }) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map(e => {
        return {
          ...e,
          column: e.id === currentItem.id ? columnName : e.column,
        }
      })
    });
  }

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: any, monitor) {

      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { id, index, name, currentColumnName, type: 'Our first type' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW:
            changeItemColumn(item, AWAITING_REVIEW);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          case DO_IT:
            changeItemColumn(item, DO_IT);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} key={id} className='movable-item' style={{
      ...styleComponent,
      opacity,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between'
    }} >

      {name}
      {!!color && <FiberManualRecordIcon style={{ color: color }} />}

    </div>

  )
}

