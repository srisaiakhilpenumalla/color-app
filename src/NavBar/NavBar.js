import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';

import styles from '../styles/NavBarStyles';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
        this.handleChange = this.handleChange.bind(this);
        this.closeSnackBar = this.closeSnackBar.bind(this);
    }
    handleChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }
    closeSnackBar() {
        this.setState({ open: false });
    }
    render() {
        const { level, changeLevel, classes } = this.props;
        const { format } = this.state;
        return (
            <header className={classes.NavBar}>
                <div className={classes.logo}>
                    <Link to="/">React Color Picker</Link>
                </div>
                {this.props.showAllColors && (
                    <div>
                        <span>Level: {level} </span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">
                            RGBA - rgb(255,255,255,1.0)
                        </MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={
                        <span id="message-id">
                            Format Changed! New Format: {format.toUpperCase()}
                        </span>
                    }
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    onClose={this.closeSnackBar}
                    action={[
                        <IconButton
                            onClick={this.closeSnackBar}
                            color="inherit"
                            key="close"
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </header>
        );
    }
}

export default withStyles(styles)(NavBar);
