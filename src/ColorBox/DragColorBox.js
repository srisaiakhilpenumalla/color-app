import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';

import styles from '../styles/DragColorBoxStyles';

const DragColorBox = SortableElement((props) => {
    const { classes, handleClick, name, color } = props;
    return (
        <div className={props.classes.root} style={{ backgroundColor: color }}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
});

export default withStyles(styles)(DragColorBox);
