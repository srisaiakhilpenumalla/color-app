/* eslint-disable no-loop-func */
import React, { Component } from 'react';
import classNames from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { colors } from '@material-ui/core';
import { arrayMove } from 'react-sortable-hoc';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from '../ColorBox/ColorPickerForm';
import useStyles from '../styles/NewPaletteFormStyles';
import DraggableColorList from '../ColorBox/DraggableColorList';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20,
    };
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: this.props.palettes[0].colors,
        };

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandom = this.addRandom.bind(this);
    }

    handleDrawerOpen() {
        this.setState({ open: true });
    }
    handleDrawerClose() {
        this.setState({ open: false });
    }

    addNewColor(newColor) {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: '',
        });
        console.log(colors);
    }

    handleSubmit(newPalette) {
        //let newColorName = this.state.newPaletteName;
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }
    removeColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(
                (color) => color.name !== colorName
            ),
        });
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };
    clearColors() {
        this.setState({ colors: [] });
    }
    addRandom() {
        const allColors = this.props.palettes.map((p) => p.colors).flat();
        let rand;
        let randColor;
        let isDuplicate = true;
        while (isDuplicate) {
            rand = Math.floor(Math.random() * allColors.length);
            randColor = allColors[rand];
            isDuplicate = this.state.colors.some(
                (color) => color.name === randColor.name
            );
        }
        this.setState({ colors: [...this.state.colors, randColor] });
        //console.log(allColors);
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxColors;
        // const { drawerOpen, colors, dialogOpen } = this.state;

        return (
            <div className={classes.root}>
                <PaletteFormNav
                    //classes={classes}
                    open={open}
                    palettes={palettes}
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant="h4" gutterBottom>
                            Design Palette
                        </Typography>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.clearColors}
                                className={classes.button}
                            >
                                Clear Palette
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addRandom}
                                disabled={paletteIsFull}
                                className={classes.button}
                            >
                                Random Palette
                            </Button>
                        </div>
                        <ColorPickerForm
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            palettes={palettes}
                            colors={colors}
                        />
                    </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList
                        colors={this.state.colors}
                        removeColor={this.removeColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                        distance={20}
                    />
                </main>
            </div>
        );
    }
}
export default withStyles(useStyles, { withTheme: true })(NewPaletteForm);
