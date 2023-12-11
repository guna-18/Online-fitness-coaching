import React, { useEffect, useState } from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import {Button, Checkbox, Typography} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import AddExerciseModal from "./AddExerciseModal";
import UserTab from "./UserTab";
const Admin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(0);
    const [exercises, setExercises] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterBodyPart, setFilterBodyPart] = useState('');
    const [filterLevel, setFilterLevel] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        types: [],
        bodyParts: [],
        levels: []
    });
    const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] = useState(false);
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleOpenModal = () => {
        setIsAddExerciseModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddExerciseModalOpen(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleSelectExercise = (exerciseId) => {
        setSelectedExercises(prevSelected => {
            if (prevSelected.includes(exerciseId)) {
                return prevSelected.filter(id => id !== exerciseId);
            } else {
                return [...prevSelected, exerciseId];
            }
        });
    };


    const handleRemoveExercises = async () => {
        console.log(selectedExercises)
        try {
            const response = await fetch('http://localhost:3001/admin/exercises', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: selectedExercises })
            });

            if (!response.ok) {
                setError(response.status)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setError("")
            console.log('Exercises removed successfully');
            handleRefresh(true)
        } catch (error) {
            console.error("Error removing exercises:", error);
        }
    };

    const fetchFilterOptions = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/exerciseOptions');
            if (!response.ok) {
                setError(response.status)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setError("")
            const data = await response.json();
            setFilterOptions(data);
        } catch (error) {
            console.error("Error fetching filter options:", error);
        }
    };



    useEffect(() => {
        fetchExercises();
        fetchFilterOptions();
    }, [value, searchQuery, filterType, filterBodyPart, filterLevel]);


    const fetchExercises = async () => {
        try {
            let url = 'http://localhost:3001/admin/exercises';
            const response = await fetch(url);
            if (!response.ok) {
                setError(response.status)
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setError("")
            setLoading(false)
            let data = await response.json();
            if (filterType) {
                data = data.filter(exercise => exercise.Type === filterType);
            }
            if (filterBodyPart) {
                data = data.filter(exercise => exercise.BodyPart === filterBodyPart);
            }
            if (filterLevel) {
                data = data.filter(exercise => exercise.Level === filterLevel);
            }
            // Search by title or description
            if (searchQuery) {
                data = data.filter(exercise =>
                    (exercise.Title && exercise.Title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (exercise.Desc && exercise.Desc.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }

            setExercises(data);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        }
    };



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleRefresh = (e) => {
        if(e)  {
            setFilterType('');
            setFilterBodyPart('');
            setFilterLevel('');
            setSearchQuery('');
            fetchExercises();
            fetchFilterOptions()
        }
    }


    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <>
                <Typography variant="h4" align="center" style={{ marginTop: '10px' }}>
                    Hi, Admin
                </Typography>

                <Container maxWidth={false} style={{ margin: 0, padding: '10px' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Exercises" />
                            <Tab label="Users" />
                        </Tabs>
                    </Box>
                    {value === 0 && (
                        <>
                        <TableContainer component={Paper}>
                            <div style={{ display: 'flex', padding: '10px', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    placeholder="Search Title/Desc"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1, // takes the remaining space
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Button style={{ flexShrink: 0 }} onClick={() => {
                                    setFilterType('');
                                    setFilterBodyPart('');
                                    setFilterLevel('');
                                    setSearchQuery('');
                                    fetchExercises(); 
                                }}>Clear</Button>
                            </div>

                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>
                                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                                <option value="">All Types</option>
                                                {filterOptions.types.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <select value={filterBodyPart} onChange={(e) => setFilterBodyPart(e.target.value)}>
                                                <option value="">All Body Parts</option>
                                                {filterOptions.bodyParts.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </TableCell>
                                        <TableCell>
                                            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}>
                                                <option value="">All Levels</option>
                                                {filterOptions.levels.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {exercises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exercise) => (
                                        <TableRow key={exercise._id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectedExercises.includes(exercise._id)}
                                                    onChange={() => handleSelectExercise(exercise._id)}
                                                />
                                            </TableCell>
                                            <TableCell>{exercise.Title}</TableCell>
                                            <TableCell>{exercise.Desc}</TableCell>
                                            <TableCell>{exercise.Type}</TableCell>
                                            <TableCell>{exercise.BodyPart}</TableCell>
                                            <TableCell>{exercise.Level}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={exercises.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
                                <Button onClick={handleOpenModal}>Add Exercise</Button>
                                <AddExerciseModal open={isAddExerciseModalOpen} handleClose={handleCloseModal} refresh={handleRefresh} />
                                <Button onClick={handleRemoveExercises} variant="outlined" color="secondary" >Remove Exercise</Button>
                            </div>

                        </>
                    )}

                    {value === 1 && <UserTab/>}
                </Container>
                </>
            )}
        </>
    );
};

export default Admin;
