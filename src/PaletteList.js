import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDeleteDialog: false,
            deleteId: '',
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    openDialog(id) {
        this.setState({ openDeleteDialog: true, deleteId: id });
    }
    closeDialog() {
        this.setState({ openDeleteDialog: false, deleteId: '' });
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    handleDelete(id) {
        this.props.deletePalette(this.state.deleteId);
        this.closeDialog();
    }
    render() {
        const { palettes, classes } = this.props;
        const { openDeleteDialog } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>Palette List</h1>
                        <Link to="/palette/new">Create New</Link>
                    </nav>

                    <TransitionGroup className={classes.palette}>
                        {palettes.map((palette) => (
                            <CSSTransition
                                key={palette.id}
                                classNames="fade"
                                timeout={500}
                            >
                                <MiniPalette
                                    {...palette}
                                    goToPalette={this.goToPalette}
                                    //handleDelete={deletePalette}
                                    openDialog={this.openDialog}
                                    key={palette.id}
                                    id={palette.id}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby="delete-dialog-title"
                    onClose={this.closeDialog}
                >
                    <DialogTitle id="delete-dialog-title">
                        Delete this Palette?
                    </DialogTitle>
                    <List>
                        <ListItem autoFocus button onClick={this.handleDelete}>
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        backgroundColor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <CheckIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Delete" />
                        </ListItem>
                        <ListItem
                            autoFocus
                            button
                            onClick={this.closeDialog}
                            //onClick={() => handleListItemClick('addAccount')}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{
                                        backgroundColor: red[100],
                                        color: red[600],
                                    }}
                                >
                                    <CloseIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Cancel" />
                        </ListItem>
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);