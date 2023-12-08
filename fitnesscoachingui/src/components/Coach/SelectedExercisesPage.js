import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
  IconButton,

} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const SelectedExercisesPage = ({ selectedExercises }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Simulated data for the number of sets and reps (replace with your actual data)
  const setsRepsData = [
    { day: 1, sets: 3, reps: 10 },
    { day: 2, sets: 4, reps: 12 },
    // Add more data for additional days
  ];

  const handleSetsRepsChange = (day, exerciseId, field, value) => {
    // Update the setsRepsData based on the changes
    // This is a basic example, you may need to manage state or make API calls in a real app
    const updatedData = setsRepsData.map((data) =>
      data.day === day
        ? {
            ...data,
            [exerciseId]: {
              ...data[exerciseId],
              [field]: value,
            },
          }
        : data
    );

    // Log the updated data (replace with your actual logic)
    console.log('Updated Sets and Reps Data:', updatedData);
  };

  const handleDeleteExercise = (exerciseId) => {
    // Handle the deletion of the exercise based on the exerciseId
    // This is a basic example, you may need to manage state or make API calls in a real app
    console.log(`Deleting exercise with ID ${exerciseId}`);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell>Exercise</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? selectedExercises.slice((page - 1) * rowsPerPage, page * rowsPerPage)
              : selectedExercises
            ).map((exercise) => {
              const { id, Title, day } = exercise;

              return (
                <TableRow key={id}>
                  <TableCell>{day}</TableCell>
                  <TableCell>{Title}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      defaultValue={3} // Set the default value based on your actual data
                      onChange={(e) =>
                        handleSetsRepsChange(1, id, 'sets', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      defaultValue={10} // Set the default value based on your actual data
                      onChange={(e) =>
                        handleSetsRepsChange(1, id, 'reps', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteExercise(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(selectedExercises.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
      <Button variant="contained" color="primary">
        Publish to User
      </Button>
    </Paper>
  );
};

export default SelectedExercisesPage;
