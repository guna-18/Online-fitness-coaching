import React, { useState } from "react";
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
import ExerciseFiltering from "../components/Coach/ExerciseFiltering";
import ClientInfo from "../components/Coach/ClientInfo";
import SelectedExercisesPage from "../components/Coach/SelectedExercisesPage";

const user1 = {
  name: "John Doe",
  age: 25,
  address: "123 Main St, Cityville",
  height: "5'10\"",
  weight: "160 lbs",
  membershipStartDate: "2023-01-01",
  membershipEndDate: "2023-12-31",
};

const dummyExercises = [
    {
        "day": "Monday",
      "id": 1,
      "Title": "Partner plank band row"
    },
    {
        "day": "Monday",
      "id": 2,
      "Title": "Banded crunch isometric hold"
    },
    {
        "day": "Tuesday",
      "id": 3,
      "Title": "FYR Banded Plank Jack"
    },
    {
        "day": "Wednesday",
      "id": 4,
      "Title": "Banded crunch"
    },
    {
        "day": "Thursday",
      "id": 5,
      "Title": "Crunch"
    }
    // Add more exercises as needed
  ]
  

const CoachAddExercises = () => {
  return (
    <>
    <Grid container spacing={2}>
      
      <Grid item xs={8}>
        <ExerciseFiltering />
      </Grid>
      <Grid item xs={4}>
      <SelectedExercisesPage selectedExercises={dummyExercises}/>
    </Grid>
    </Grid>
    <Grid container spacing={8}>

    <Grid item xs={12}>
        <ClientInfo user={user1} />
      </Grid>
    </Grid>
  </>
  );
};

export default CoachAddExercises;
