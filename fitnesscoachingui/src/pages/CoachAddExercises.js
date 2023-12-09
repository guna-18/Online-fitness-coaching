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
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [user,setUser] = useState(null);
 const [selectedExercises,setSelectedExercises] = useState(null);

//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`http://localhost:3001/coach/exercises/${clientId}`);
//       const data = await response.json();
//       setSelectedExercises(data);
//       setLoading(false);
//     } catch (error) {
//       setError('Error fetching data. Please try again.');
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

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



const handlePublishToUser = async ()=> {
    if (selectedExercises && selectedExercises.length > 0) {
      // Prepare exercise data for each selected exercise
      const exerciseDataList = selectedExercises.map((exercise) => ({
        userId: clientId, // Replace with the actual user ID
        exerciseId: exercise._id,
        sets: exercise.sets || 3, // Replace with the actual source of sets data
        reps: exercise.reps || 12, // Replace with the actual source of reps data
        dayOfWeek: exercise.dayOfWeek,
      }));

      // Post exercise data to the server
      // exerciseDataList.forEach((exerciseData) => {
      //   postExerciseData(exerciseData);
      // });
      const userId = exerciseDataList[0].userId;

      // Delete existing exercises for the user
      await deleteExercisesForUser(userId);
      await postExerciseData(exerciseDataList);
      // Optionally, you can reset the selected exercises after publishing
     // setSelectedExercises([]);
    } else {
      // Handle the case where no exercises are selected or no day is chosen
      console.log('No exercises selected or day not chosen');
    }
}

const deleteExercisesForUser = async (userId) => {
  try {
    const apiUrl = `http://localhost:3001/coach/exercises/${userId}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle error, throw an exception, or return a meaningful response
      throw new Error(`Failed to delete exercises. Status: ${response.status}`);
    }

    console.log(`Exercises deleted successfully for userId: ${userId}`);
  } catch (error) {
    console.log('Error deleting exercises:', error.message);
    // Handle error appropriately based on your application's needs
  }
};

const postExerciseData = async (exerciseData) => {
  try {
    // Replace 'your-api-endpoint' with the actual API endpoint
    const apiUrl = 'http://localhost:3001/coach/exercises';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData),
    });

    if (!response.ok) {
      // Handle error, throw an exception, or return a meaningful response
      throw new Error(`Failed to post exercise data. Status: ${response.status}`);
    }

    // Exercise data successfully posted
    const result = await response.json();
    console.log('Exercise data posted successfully:', result);
  } catch (error) {
    console.log('Error posting exercise data:', error.message);
    // Handle error appropriately based on your application's needs
  }
};


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:3001/coach//clientInfo/${clientId}`);
  //       const data = await response.json();
  //       setUser(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError('Error fetching data. Please try again.');
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesResponse, userInfoResponse, megaExercisesResponse] = await Promise.all([
          fetch(`http://localhost:3001/coach/exercises/${clientId}`),
          fetch(`http://localhost:3001/coach/clientInfo/${clientId}`),
          fetch('http://localhost:3001/coach/exercises'),
        ]);
  
        const exercisesData = await exercisesResponse.json();
        const userInfoData = await userInfoResponse.json();
        const megaExerciseData = await megaExercisesResponse.json();
  
        // Modify exerciseData by adding Title from megaExerciseData
        const modifiedExercisesData = exercisesData.map((exercise) => {
          const matchingMegaExercise = megaExerciseData.find(
            (megaExercise) => megaExercise._id === exercise.exerciseId
          );
  
          return {
            ...exercise,
            Title: matchingMegaExercise ? matchingMegaExercise.Title : 'Unknown Title',
          };
        });
  
        setSelectedExercises(modifiedExercisesData);
        setUser(userInfoData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };
  
    fetchData();
  }, [clientId]);
  

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
      <SelectedExercisesPage selectedExercises={selectedExercises} deleteExerciseList={deleteExercises} handlePublishToUser={handlePublishToUser}/>
    </Grid>
    </Grid>
    <Grid container spacing={8}>

    <Grid item xs={12}>
        <ClientInfo user={user} />
      </Grid>
    </Grid>
    </>
      )}
  </>
  );
};

export default CoachAddExercises;
