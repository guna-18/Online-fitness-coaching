import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
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

const SelectedExercisesPage = ({ selectedExercises,deleteExerciseList,deleteWholeList }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const {user_id}=useParams();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteExercise = (exerciseId) => {
    // Handle the deletion of the exercise based on the exerciseId
    // This is a basic example, you may need to manage state or make API calls in a real app
    deleteExerciseList(exerciseId);
    //deleteExercise(exerciseId);
    console.log(`Deleting exercise with ID ${exerciseId}`);
  };

  const submitExercises = async ()=> {
    if (selectedExercises && selectedExercises.length > 0) {
      // Prepare exercise data for each selected exercise
      const exerciseDataList = selectedExercises.map((exercise) => ({
        userId: user_id, // Replace with the actual user ID
        exerciseId: exercise._id,
        sets: exercise.sets, // Replace with the actual source of sets data
        reps: exercise.reps, // Replace with the actual source of reps data
        dayOfWeek: exercise.dayOfWeek,
      }));

      // Post exercise data to the server
      // exerciseDataList.forEach((exerciseData) => {
      //   postExerciseData(exerciseData);
      // });
      const userId = exerciseDataList[0].userId;

      await postExerciseData(exerciseDataList);
      deleteWholeList();
      // Optionally, you can reset the selected exercises after publishing
     // setSelectedExercises([]);
    } else {
      // Handle the case where no exercises are selected or no day is chosen
      toast.warn('No exercises selected or day not chosen',{position:"top-right",autoClose:5000,hideProgressBar:true});
      console.log('No exercises selected or day not chosen');
    }
};

const postExerciseData = async (exerciseData) => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const apiUrl = 'http://localhost:3001/user/addExercise';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseData),
      });
  
      if (!response.ok) {
        // Handle error, throw an exception, or return a meaningful response
        toast.error(`Failed to post exercise data. Status: ${response.status}`,{position:"top-right",hideProgressBar:true});
        throw new Error(`Failed to post exercise data. Status: ${response.status}`);
      }
  
      // Exercise data successfully posted
      const result = await response.text();
      console.log('Exercise data posted successfully:', result);
      toast.success('Exercise data posted successfully',{position:"top-right",autoClose:5000,hideProgressBar:true});
    } catch (error) {
      console.log('Error posting exercise data:', error.message);
      toast.error('Error posting exercise data',{position:"top-right",autoClose:5000,hideProgressBar:true});
      // Handle error appropriately based on your application's needs
    }
  };
  const deleteExercise = async (exerciseId) => {
    try {
      const apiUrl = `http://localhost:3001/user/exercises/${exerciseId}`;
  
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // Handle error, throw an exception, or return a meaningful response
        throw new Error(`Failed to delete exercise. Status: ${response.status}`);
      }
  
      console.log(`Exercise deleted successfully`);
    } catch (error) {
      console.log('Error deleting exercise:', error.message);
      // Handle error appropriately based on your application's needs
    }
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
        {selectedExercises !== null && selectedExercises.length > 0 ? (
          (rowsPerPage > 0
            ? selectedExercises.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            : selectedExercises
          ).map((exercise) => {
            const { _id, Title, dayOfWeek, reps, sets } = exercise;

            return (
              <TableRow key={_id}>
                <TableCell>{dayOfWeek}</TableCell>
                <TableCell>{Title}</TableCell>
                <TableCell>{sets}</TableCell>
                <TableCell>{reps}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDeleteExercise(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center">
              {selectedExercises === null
                ? 'No exercises added.'
                : 'No exercises added.'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
  <Pagination
    count={Math.ceil(selectedExercises.length / rowsPerPage)}
    page={page}
    onChange={handleChangePage}
  />
  <Button variant="contained" color="primary" onClick={submitExercises}>
    Submit Exercises
  </Button>
  <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true}/>
</Paper>

  );
};

export default SelectedExercisesPage;
