import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            stage: 'form',
            newPaletteName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteUnique', (value) =>
            this.props.palettes.every(
                ({ paletteName }) =>
                    paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    showEmojiPicker() {
        this.setState({ stage: 'emoji' });
    }
    savePalette(emoji) {
        console.log(emoji.native);
        const newPalette = {
            paletteName: this.state.newPaletteName,
            emoji: emoji.native,
        };
        this.props.handleSubmit(newPalette);
        this.setState({ stage: '' });
    }

    render() {
        const { newPaletteName } = this.state;
        const { hideForm } = this.props;
        return (
            <div>
                <Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
                    <DialogTitle id="form-dialog-title">
                        Pick a Palette Emoji
                    </DialogTitle>
                    <Picker onSelect={this.savePalette} title="" />
                </Dialog>
                <Dialog
                    open={this.state.stage === 'form'}
                    aria-labelledby="form-dialog-title"
                    onClose={hideForm}
                >
                    <DialogTitle id="form-dialog-title">
                        Choose Palette Name
                    </DialogTitle>
                    <ValidatorForm onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a name for your color palette. Make
                                it Unique!!
                            </DialogContentText>
                            <TextValidator
                                label="New Palette"
                                name="newPaletteName"
                                value={newPaletteName}
                                fullWidth
                                margin="normal"
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteUnique']}
                                errorMessages={[
                                    'Enter Palette Name',
                                    'Name Already taken',
                                ]}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="Submit"
                                color="primary"
                            >
                                Save Palette
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
