import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import DragColorBox from './DragColorBox';

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
    return (
        <div style={{ height: '100%' }}>
            {colors.map((color, i) => (
                <DragColorBox
                    index={i}
                    color={color.color}
                    key={color.name}
                    handleClick={() => removeColor(color.name)}
                    name={color.name}
                />
            ))}
        </div>
    );
});

export default DraggableColorList;
