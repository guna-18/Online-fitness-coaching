import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Pagination,
  Paper,
  FormControl,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import ExerciseFiltering from "../components/User/ExerciseFiltering";
import SelectedExercisesPage from "../components/User/SelectedExercisesPage";
  
const BasicUserAddExercises = () => {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [selectedExercises,setSelectedExercises] = useState(null);

 const addExercises = (exercisesList) => {
  setSelectedExercises((prevSelectedExercises) => {
    return prevSelectedExercises !== null
      ? [...prevSelectedExercises, ...exercisesList]
      : exercisesList;
  });
};

const deleteExercises = (id) => {
  setSelectedExercises((prevSelectedExercises) => {
    if (prevSelectedExercises === null) {
      // If selectedExercises is null, nothing to delete
      return null;
    }

    // Filter out the exercise with the given id
    const updatedExercises = prevSelectedExercises.filter(
      (exercise) => exercise._id !== id
    );

    return updatedExercises.length > 0 ? updatedExercises : null;
  });
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const [exercisesResponse, megaExercisesResponse] = await Promise.all([
        //   fetch(`http://localhost:3001/user/all/${user_id}`),
        //   fetch('http://localhost:3001/user/search'),
        // ]);
  
        // const exercisesData = await exercisesResponse.json();
        // const megaExerciseData = await megaExercisesResponse.json();
  
        // // Modify exerciseData by adding Title from megaExerciseData
        // const modifiedExercisesData = exercisesData.map((exercise) => {
        //   const matchingMegaExercise = megaExerciseData.find(
        //     (megaExercise) => megaExercise._id === exercise.exerciseId
        //   );
  
        //   return {
        //     ...exercise,
        //     Title: matchingMegaExercise ? matchingMegaExercise.Title : 'Unknown Title',
        //   };
        // });
  
        //setSelectedExercises(modifiedExercisesData);
        setSelectedExercises([]);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [user_id]);
  

  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
      {!loading && !error &&(
        <>
    <Grid container spacing={2}>
      
      <Grid item xs={8}>
        <ExerciseFiltering addExercisestoList={addExercises}/>
      </Grid>
      <Grid item xs={4}>
      <SelectedExercisesPage selectedExercises={selectedExercises} deleteExerciseList={deleteExercises}/>
    </Grid>
    </Grid>
    </>
      )}
  </>
  );
};

export default BasicUserAddExercises;
