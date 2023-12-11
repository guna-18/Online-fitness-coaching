import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

const EliteUserExerciseFiltering = (props) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [page, setPage] = useState(1);
  const { user_id } = useParams();
  const [filterType, setFilterType] = useState("");
  const [filterBodyPart, setFilterBodyPart] = useState("");
  const [filterEquipment, setFilterEquipment] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [sets, setSets] = useState(1);
  const [reps, setReps] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exercisesData, setExercisesData] = useState([]);
  const [exerciseSetsReps, setExerciseSetsReps] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [exercisesResponse, megaExercisesResponse] = await Promise.all([
          fetch(`http://localhost:3001/coach/exercises/${user_id}`),
          fetch("http://localhost:3001/coach/exercises"),
        ]);

        const exercisesData = await exercisesResponse.json();
        const megaExerciseData = await megaExercisesResponse.json();
        const initialSetsReps = {};
        exercisesData.forEach((exercise) => {
          initialSetsReps[exercise._id] = { sets: 1, reps: 1 };
        });
        setExerciseSetsReps(initialSetsReps);
        // Modify exerciseData by adding Title from megaExerciseData
        const modifiedExercisesData = exercisesData.map((exercise) => {
          const matchingMegaExercise = megaExerciseData.find(
            (megaExercise) => megaExercise._id === exercise.exerciseId
          );

          return {
            ...exercise,
            Title: matchingMegaExercise
              ? matchingMegaExercise.Title
              : "Unknown Title",
          };
        });
        setExercisesData(modifiedExercisesData);
        //setSelectedExercises(modifiedExercisesData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckboxChange2 = (event, exercise) => {
    if (event.target.checked) {
      // Include the dayOfWeek in the exercise object
      const exerciseWithDaySetsReps = {
        ...exercise,
        dayOfWeek: selectedDay,
        sets: exerciseSetsReps[exercise._id]?.sets || 1,
        reps: exerciseSetsReps[exercise._id]?.reps || 1,
      };
      setSelectedExercises([...selectedExercises, exerciseWithDaySetsReps]);
    } else {
      setSelectedExercises(
        selectedExercises.filter(
          (curexercise) => curexercise._id !== exercise._id
        )
      );
    }
  };

  // const isSelected = (id) => selectedExercises.includes(id);
  const isSelected = (exercise) =>
    selectedExercises.some(
      (selectedExercise) => selectedExercise._id === exercise._id
    );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSetsChange = (e, exerciseId) => {
    const newSets = parseInt(e.target.value, 10);
    if (newSets < 1) {
      setExerciseSetsReps((prev) => ({
        ...prev,
        [exerciseId]: { ...prev[exerciseId], sets: 1 },
      }));
    } else {
      setExerciseSetsReps((prev) => ({
        ...prev,
        [exerciseId]: { ...prev[exerciseId], sets: newSets },
      }));
    }
  };

  const handleRepsChange = (e, exerciseId) => {
    const newReps = parseInt(e.target.value, 10);
    if (newReps < 1) {
      setExerciseSetsReps((prev) => ({
        ...prev,
        [exerciseId]: { ...prev[exerciseId], reps: 1 },
      }));
    } else {
      setExerciseSetsReps((prev) => ({
        ...prev,
        [exerciseId]: { ...prev[exerciseId], reps: newReps },
      }));
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddExercises = async () => {
    try {
      // Prepare exercise data for tracking
      const trackingDataList = selectedExercises.map((exercise) => ({
        userId: user_id,
        exerciseId: exercise._id,
        sets: exercise.sets,
        reps: exercise.reps,
        datePerformed: new Date(),
      }));

      // Post tracking data to the server
      await postTrackingData(trackingDataList);

      // Reset selected exercises after submitting
      setSelectedExercises([]);
    } catch (error) {
      console.log("Error tracking exercises:", error.message);
      // Handle error appropriately based on your application's needs
    }
  };

  const postTrackingData = async (trackingData) => {
    try {
      const apiUrl = "http://localhost:3001/user/track";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trackingData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to post tracking data. Status: ${response.status}`
        );
      }
      // Tracking data successfully posted
      const result = await response.text();
      console.log("Tracking data posted successfully:", result);
      toast.success("Tracking data posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log("Error posting tracking data:", error.message);
      toast.error("Error posting tracking data", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
      // Handle error appropriately based on your application's needs
    }
  };

  const submitExercises = async () => {
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
      // Optionally, you can reset the selected exercises after publishing
      // setSelectedExercises([]);
    } else {
      // Handle the case where no exercises are selected or no day is chosen
      console.log("No exercises selected or day not chosen");
    }
  };

  const submitSession = async () => {
    if (selectedExercises && selectedExercises.length > 0) {
      // Prepare exercise data for each selected exercise
      const exerciseDataList = selectedExercises.map((exercise) => ({
        userId: user_id, // Replace with the actual user ID
        exerciseId: exercise._id,
        sets: exercise.sets, // Replace with the actual source of sets data
        reps: exercise.reps, // Replace with the actual source of reps data
        datePerformed: new Date().toLocaleDateString(),
      }));

      // Post exercise data to the server
      // exerciseDataList.forEach((exerciseData) => {
      //   postExerciseData(exerciseData);
      // });
      const userId = exerciseDataList[0].userId;

      await postSession(exerciseDataList);
      // Optionally, you can reset the selected exercises after publishing
      // setSelectedExercises([]);
    } else {
      // Handle the case where no exercises are selected or no day is chosen
      console.log("No exercises selected or day not chosen");
    }
  };

  const postExerciseData = async (exerciseData) => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const apiUrl = "http://localhost:3001/user/addExercise";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        // Handle error, throw an exception, or return a meaningful response
        throw new Error(
          `Failed to post exercise data. Status: ${response.status}`
        );
      }

      // Exercise data successfully posted
      const result = await response.text();
      console.log("Exercise data posted successfully:", result);
    } catch (error) {
      console.log("Error posting exercise data:", error.message);
      // Handle error appropriately based on your application's needs
    }
  };

  const postSession = async (exerciseData) => {
    try {
      // Replace 'your-api-endpoint' with the actual API endpoint
      const apiUrl = "http://localhost:3001/user/add";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });

      if (!response.ok) {
        // Handle error, throw an exception, or return a meaningful response
        throw new Error(
          `Failed to post session variable. Status: ${response.status}`
        );
      }

      // Exercise data successfully posted
      const result = await response.text();
      console.log("Session variable posted successfully:", result);
    } catch (error) {
      console.log("Error posting session variable:", error.message);
      // Handle error appropriately based on your application's needs
    }
  };
  const filteredExercises = exercisesData.filter((exercise) => {
    const typeMatch = !filterType || exercise.Type === filterType;
    const bodyPartMatch =
      !filterBodyPart || exercise.BodyPart === filterBodyPart;
    const equipmentMatch =
      !filterEquipment || exercise.Equipment === filterEquipment;
    const levelMatch = !filterLevel || exercise.Level === filterLevel;

    return typeMatch && bodyPartMatch && equipmentMatch && levelMatch;
  });

  const filteredExercisesBySearch = filteredExercises.filter((exercise) =>
    exercise.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div style={{ margin: "16px" }}>
          {/* <FormControl sx={{ minWidth: 60, marginRight: "16px" }}>
            <InputLabel>Day</InputLabel>
            <Select value={selectedDay} onChange={handleDayChange}>
              <MenuItem value="Mon">Monday</MenuItem>
              <MenuItem value="Tue">Tuesday</MenuItem>
              <MenuItem value="Wed">Wednesday</MenuItem>
              <MenuItem value="Thu">Thursday</MenuItem>
              <MenuItem value="Fri">Friday</MenuItem>
              <MenuItem value="Sat">Saturday</MenuItem>
            </Select>
          </FormControl> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddExercises}
          >
            Track Exercises
          </Button>
        </div>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Select</TableCell>
              <TableCell>
                <TextField
                  label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredExercisesBySearch.slice(
                  (page - 1) * rowsPerPage,
                  page * rowsPerPage
                )
              : filteredExercisesBySearch
            ).map((exercise) => {
              const { _id, Title, Desc, Type, BodyPart, Equipment, Level } =
                exercise;
              const isItemSelected = isSelected(exercise);

              return (
                <TableRow key={_id} hover selected={isItemSelected}>
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) =>
                        handleCheckboxChange2(event, exercise)
                      }
                    />
                  </TableCell>
                  <TableCell>{Title}</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>
                    <FormControl sx={{ minWidth: 30, marginRight: "16px" }}>
                      <TextField
                        label="Sets"
                        type="number"
                        min="0"
                        value={exerciseSetsReps[_id]?.sets || 1}
                        onChange={(e) => handleSetsChange(e, _id)}
                      />
                    </FormControl>
                    <FormControl sx={{ minWidth: 30, marginRight: "16px" }}>
                      <TextField
                        label="Reps"
                        type="number"
                        min="0"
                        value={exerciseSetsReps[_id]?.reps || 1}
                        onChange={(e) => handleRepsChange(e, _id)}
                      />
                    </FormControl>
                  </TableCell>
                </TableRow>
              );
            })}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
            />
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredExercisesBySearch.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Paper>
  );
};

export default EliteUserExerciseFiltering;
