import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import { withStyles } from '@material-ui/styles';

import ColorBox from './ColorBox/ColorBox';
import PaletteFooter from './Palette/PaletteFooter';
import styles from './styles/SingleColorStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(
            this.props.palette,
            this.props.colorId
        );
        //console.log(this._shades);
        this.gatherShades = this.gatherShades.bind(this);
        this.state = { format: 'hex' };
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter((color) => color.id === colorToFilterBy)
            );
        }
        console.log(shades);
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const { classes } = this.props;
        const colorBoxes = this._shades.map((color) => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showFullPalette={false}
            />
        ));
        return (
            <div className={classes.Palette}>
                <NavBar
                    handleChange={this.changeFormat}
                    showAllColors={false}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className="back-button">
                            Go Back
                        </Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);
