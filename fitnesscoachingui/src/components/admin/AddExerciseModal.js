import React, { useState } from 'react';
import { Dialog, TextField, Button, DialogContent, DialogTitle, DialogActions } from '@mui/material';

const AddExerciseModal = ({ open, handleClose, refresh }) => {
    const [exerciseData, setExerciseData] = useState({
        Title: '',
        Desc: '',
        Type: '',
        BodyPart: '',
        Equipment: '',
        Level: ''
    });

    const handleChange = (e) => {
        setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/admin/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(exerciseData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Exercise added successfully');
            refresh(true)

        } catch (error) {
            console.error("Error adding exercise:", error);
        }
        handleClose();
    };


    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Exercise</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="Title"
                        label="Title"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="Desc"
                        label="Desc"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="Type"
                        label="Type"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="BodyPart"
                        label="BodyPart"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="Equipment"
                        label="Equipment"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <TextField
                        name="Level"
                        label="Level"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                    />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddExerciseModal