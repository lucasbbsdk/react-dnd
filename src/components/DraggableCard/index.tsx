import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import React, { FC } from 'react'
const styleComponent = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: any
  text: string
  className: string
  color: string | undefined
  style: Object
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const DraggableCard: FC<CardProps> = ({ style, id, text, className, color }) => {

  return (
    <div key={id} className={className} style={{
      ...style,
      ...styleComponent,
      display: 'flex', justifyContent: 'space-between'
    }} >
      {text}
      {!!color && <span style={{ color: color }}><FiberManualRecordIcon /></span>}

    </div>
  )
}
