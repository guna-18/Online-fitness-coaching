import React, { useState, useEffect } from "react";
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
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";

const ExerciseFiltering = (props) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/search");
        const data = await response.json();
        setExercisesData(data);
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
        sets: sets,
        reps: reps,
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

  const handleSetsChange = (e) => {
    if (e.target.value < 1) {
      setSets(1);
    } else {
      setSets(e.target.value);
    }
  };

  const handleRepsChange = (e) => {
    if (e.target.value < 1) {
      setReps(1);
    } else {
      setReps(e.target.value);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddExercises = () => {
    // Add your logic here to handle adding exercises for the selected day
    console.log(`Adding exercises for ${selectedDay}`);
    console.log("Selected Exercises:", selectedExercises);
    props.addExercisestoList(selectedExercises);
    //submitSession();
    // Reset selected exercises after submitting
    setSelectedExercises([]);
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
        dayOfWeek: exercise.dayOfWeek,
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
        <div style={{ margin: "16px" }}>{/* ... (your existing code) */}</div>
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
              <TableCell>{/* ... (your existing code) */}</TableCell>
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
                  <TableCell>{Type}</TableCell>
                  <TableCell>{BodyPart}</TableCell>
                  <TableCell>{Equipment}</TableCell>
                  <TableCell>{Level}</TableCell>
                  {/* Display updated sets and reps */}
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                </TableRow>
              );
            })}
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

export default ExerciseFiltering;
