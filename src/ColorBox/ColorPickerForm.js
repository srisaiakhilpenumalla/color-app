import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import useStyles from '../styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: 'teal',
            newColorName: '',
            colors: this.props.palettes[0].colors,
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorName', (value) =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName,
        };
        this.props.addNewColor(newColor);
        this.setState({ newColorName: '' });
    }

    render() {
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} ref="form">
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChange}
                        variant="filled"
                        margin="normal"
                        placeholder="Color Name"
                        className={classes.colorNameInput}
                        validators={[
                            'required',
                            'isColorName',
                            'isColorUnique',
                        ]}
                        errorMessages={[
                            'Enter a Color',
                            'Name exists',
                            'Color used',
                        ]}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.addColor}
                        type="submit"
                        disabled={paletteIsFull}
                        style={{
                            backgroundColor: paletteIsFull
                                ? 'grey'
                                : currentColor,
                        }}
                    >
                        {paletteIsFull ? 'Full Palette' : 'Add Color'}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(ColorPickerForm);
