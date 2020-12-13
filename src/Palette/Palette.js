import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import 'rc-slider/assets/index.css';

import ColorBox from '../ColorBox/ColorBox';
import NavBar from '../NavBar/NavBar';
import styles from '../styles/PaletteStyles';
import PaletteFooter from './PaletteFooter';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map((color) => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.id}
                // id={color.id}
                // paletteId={id}
                moreUrl={`/palette/${id}/${color.id}`}
                showFullPalette
            />
        ));
        return (
            <div className={classes.Palette}>
                <NavBar
                    level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat}
                    showAllColors
                />
                <div className={classes.colors}>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
