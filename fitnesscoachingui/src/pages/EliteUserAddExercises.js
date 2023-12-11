// Import necessary modules and components
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import EliteUserExerciseElite from "../components/User/EliteUserExerciseFiltering";
import EliteUserSelectedExercise from "../components/User/EliteUserSelectedExercise";

const EliteUserAddExercises = () => {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const addExercises = (exercisesList) => {
    setSelectedExercises((prevSelectedExercises) => [
      ...prevSelectedExercises,
      ...exercisesList,
    ]);
  };

  const updateSetsReps = (updatedSets, updatedReps, exerciseId) => {
    setSelectedExercises((prevSelectedExercises) =>
      prevSelectedExercises.map((exercise) =>
        exercise._id === exerciseId
          ? { ...exercise, sets: updatedSets, reps: updatedReps }
          : exercise
      )
    );
  };

  useEffect(() => {
    const fetchDummyData = () => {
      // Mock data for EliteUser exercises
      const dummyData = [
        { _id: 1, name: "Exercise 1" },
        { _id: 2, name: "Exercise 2" },
        // Add more dummy data as needed
      ];

      setSelectedExercises(dummyData);
      setLoading(false);
    };

    fetchDummyData();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <div
            style={{
              textAlign: "center",
              fontSize: "2.5em",
              color: "#222", // Darker color
              marginTop: "20px", // Added margin-top
            }}
          >
            Elite User
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <EliteUserExerciseElite
                addExercisestoList={addExercises}
                updateSetsReps={updateSetsReps}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <SelectedExercisesPage
                selectedExercises={selectedExercises}
                deleteExerciseList={deleteExercises}
              />
            </Grid> */}
          </Grid>
        </>
      )}
    </>
  );
};

export default EliteUserAddExercises;
