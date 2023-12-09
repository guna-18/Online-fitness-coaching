import React, { useState,useEffect } from 'react';
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
} from '@mui/material';

// const exercisesData = [
//     {
//       "id": 1,
//       "Title": "Partner plank band row",
//       "Desc": "The partner plank band row is an abdominal exercise where two partners perform single-arm planks while pulling on the opposite ends of an exercise band. This technique can be done for time or reps in any ab-focused workout.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 2,
//       "Title": "Banded crunch isometric hold",
//       "Desc": "The banded crunch isometric hold is an exercise targeting the abdominal muscles, particularly the rectus abdominis or \"six-pack\" muscles. The band adds resistance and continuous tension to this popular exercise.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 3,
//       "Title": "FYR Banded Plank Jack",
//       "Desc": "The banded plank jack is a variation on the plank that involves moving the legs in and out for repetitions. Having a band around the thighs forces the lower body to work harder, particularly the hips and glutes. The plank jack is commonly performed as part of a bodyweight circuit, or as part of a dynamic warm-up.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 4,
//       "Title": "Banded crunch",
//       "Desc": "The banded crunch is an exercise targeting the abdominal muscles, particularly the rectus abdominis or \"six-pack\" muscles. The band adds resistance and continuous tension to this popular exercise.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 5,
//       "Title": "Crunch",
//       "Desc": "The crunch is a popular core exercise targeting the rectus abdominis, or \"six-pack\" muscles, as well as the obliques. It has been the centerpiece of many ab-focused workouts, due to both its simplicity and the intense burn and mind-muscle connection it produces. It can be performed for time or reps as part of the ab-focused portion of any workout.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 6,
//       "Title": "Decline band press sit-up",
//       "Desc": "The decline band press sit-up is a weighted core exercise that works the rectus abdominis or \"six pack\" muscles, as well as the deep core muscles. It also taxes the muscles of the shoulders and upper back. Sit-up variations with added resistance are usually performed for moderate to high reps, such as 8-12 reps per set or more, as part of the core-focused portion of a workout.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 7,
//       "Title": "FYR2 Banded Frog Pump",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 8,
//       "Title": "Band low-to-high twist",
//       "Desc": "The band low-to-high twist is a core exercise targeting the upper abdominals and the obliques. Take care to perform it with control, as rapid, uncontrolled twisting can injure the spine. It is usually performed for moderate to high reps, at least 8-15 per side, as part of the core-focused portion of a workout.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Bands",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 9,
//       "Title": "Barbell roll-out",
//       "Desc": "The barbell roll-out is an abdominal exercise that utilizes a barbell in the place of an ab roller. It is best performed with a barbell that has rotating collars, and is considered more difficult than other ab roller variations. Many lifters may not be able to perform a single rep at first, but once they can perform these for reps, they'll be rewarded with a seriously strong core.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 10,
//       "Title": "Barbell Ab Rollout - On Knees",
//       "Desc": "The barbell roll-out is an abdominal exercise that utilizes a barbell in the place of an ab roller. It is best performed with a barbell that has rotating collars, and is considered more difficult than other ab roller variations. Many lifters may not be able to perform a single rep at first, but once they can perform these for reps, they'll be rewarded with a seriously strong core.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 11,
//       "Title": "Decline bar press sit-up",
//       "Desc": "The decline bar press sit-up is a weighted core exercise targeting the abdominal muscles, particularly the lower abs. It also challenges the shoulders and upper back to move the weight. Weighted sit-up variations are usually performed for moderate to high reps, such as 8-12 reps per set or more, as part of the core-focused portion of a workout.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 12,
//       "Title": "Bench barbell roll-out",
//       "Desc": "The bench barbell roll-out is a challenging exercise targeting the abdominals. It is similar to using an ab roller, but using a barbell allows for a wider grip. Placing the knees on a bench rather than the floor makes the move more difficult by increasing the challenge to the upper body.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Beginner"
//     },
//     {
//       "id": 13,
//       "Title": "Barbell Side Bend",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Beginner"
//     },
//     {
//       "id": 14,
//       "Title": "Seated bar twist",
//       "Desc": "The seated bar twist is a core exercise meant to strengthen the obliques. It is often performed for high reps with relatively light weight, such as an empty barbell, a lightweight fixed-weight bar, or even a PVC pipe. It can be performed during a workout, at the end of a workout, or outside of the gym to build core strength and resiliency.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 15,
//       "Title": "Single-arm landmine pull and press",
//       "Desc": "The single-arm landmine pull and press is an explosive rotational movement using a barbell anchored in a landmine device. It combines a pull off the floor with rotation and finishes with a press. It is usually performed for low reps per set with an emphasis on speed and form, not moving heavy weight.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 16,
//       "Title": "Barbell Ab Roll Out - Gethin Variation",
//       "Desc": "The barbell roll-out is an abdominal exercise that utilizes a barbell in the place of an ab roller. It is best performed with a barbell that has rotating collars, and is considered more difficult than other ab roller variations. Many lifters may not be able to perform a single rep at first, but once they can perform these for reps, they'll be rewarded with a seriously strong core.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 17,
//       "Title": "30 Barbell Floor Wiper",
//       "Desc": "The barbell floor wiper is a core exercise in which the barbell is held in the locked-out position of a floor press, and the hips and legs are rotated side to side. It targets the oblique muscles of the lateral abdomen, but is also seriously challenging to the deep core and rectus abdominis or \"six-pack\" muscles.",
//       "Type": "Strength",
//       "BodyPart": "Abdominals",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 18,
//       "Title": "30 Barbell Roll-Out",
//       "Desc": "The barbell roll-out is an abdominal exercise that utilizes a barbell in the place of an ab roller. It is best performed with a barbell that has rotating collars, and is considered more difficult than other ab roller variations. Many lifters may not be able to perform a single rep at first, but once they can perform these for reps, they'll be rewarded with a seriously strong core.",
//       "Type": "Strength",
//       "BodyPart": "Chest",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     },
//     {
//       "id": 19,
//       "Title": "Decline plate sit-up",
//       "Desc": "The decline plate sit-up is a weighted core exercise that works the rectus abdominis or \"six pack\" muscles, as well as the deep core muscles. Weighted sit-up variations are usually performed for moderate to high reps, such as 8-12 reps per set or more, as part of the core-focused portion of a workout.",
//       "Type": "Strength",
//       "BodyPart": "Chest",
//       "Equipment": "Barbell",
//       "Level": "Intermediate"
//     }
//   ];
const ExerciseFiltering = (props) => {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterBodyPart, setFilterBodyPart] = useState('');
  const [filterEquipment, setFilterEquipment] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('Mon');
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exercisesData, setExercisesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/coach/exercises');
        const data = await response.json();
        setExercisesData(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedExercises([...selectedExercises, id]);
    } else {
      setSelectedExercises(selectedExercises.filter((exerciseId) => exerciseId !== id));
    }
  };

  const handleCheckboxChange2 = (event, exercise) => {
    if (event.target.checked) {
      // Include the dayOfWeek in the exercise object
      const exerciseWithDay = { ...exercise, dayOfWeek: selectedDay };
      setSelectedExercises([...selectedExercises, exerciseWithDay]);
    } else {
      setSelectedExercises(selectedExercises.filter((curexercise) => curexercise._id !== exercise._id));
    }
  };
  
  // const isSelected = (id) => selectedExercises.includes(id);
  const isSelected = (exercise) => selectedExercises.some((selectedExercise) => selectedExercise._id === exercise._id);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleAddExercises = () => {
    // Add your logic here to handle adding exercises for the selected day
    console.log(`Adding exercises for ${selectedDay}`);
    console.log('Selected Exercises:', selectedExercises);
    props.addExercisestoList(selectedExercises);
    // Reset selected exercises after submitting
    setSelectedExercises([]);
  };

  const filteredExercises = exercisesData.filter((exercise) => {
    const typeMatch = !filterType || exercise.Type === filterType;
    const bodyPartMatch = !filterBodyPart || exercise.BodyPart === filterBodyPart;
    const equipmentMatch = !filterEquipment || exercise.Equipment === filterEquipment;
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
      <div style={{ margin: '16px' }}>
        <FormControl sx={{ minWidth: 120, marginRight: '16px' }}>
          <InputLabel>Day</InputLabel>
          <Select value={selectedDay} onChange={handleDayChange}>
            <MenuItem value="Mon">Monday</MenuItem>
            <MenuItem value="Tue">Tuesday</MenuItem>
            <MenuItem value="Wed">Wednesday</MenuItem>
            <MenuItem value="Thu">Thursday</MenuItem>
            <MenuItem value="Fri">Friday</MenuItem>
            <MenuItem value="Fri">Saturday</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddExercises}>
          Add Exercises
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
              <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Type</InputLabel>
                  <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Strength">Strength</MenuItem>
                    {/* Add other types as needed */}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Body Part</InputLabel>
                  <Select
                    value={filterBodyPart}
                    onChange={(e) => setFilterBodyPart(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Chest">Chest</MenuItem>
                    <MenuItem value="Abdominals">Abdominals</MenuItem>
                    {/* Add other body parts as needed */}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Equipment</InputLabel>
                  <Select
                    value={filterEquipment}
                    onChange={(e) => setFilterEquipment(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Barbell">Barbell</MenuItem>
                    <MenuItem value="Bands">Bands</MenuItem>
                    {/* Add other equipment as needed */}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    {/* Add other levels as needed */}
                  </Select>
                </FormControl>
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
              const { _id, Title, Desc, Type, BodyPart, Equipment, Level } = exercise;
              const isItemSelected = isSelected(exercise);

              return (
                <TableRow key={_id} hover selected={isItemSelected}>
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleCheckboxChange2(event, exercise)}
                    />
                  </TableCell>
                  <TableCell>{Title}</TableCell>
                  <TableCell>{Type}</TableCell>
                  <TableCell>{BodyPart}</TableCell>
                  <TableCell>{Equipment}</TableCell>
                  <TableCell>{Level}</TableCell>
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
