import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, Button } from '@mui/material';

const UserTab = () => {
    const [users, setUsers] = useState([]);
    const[nameValue, setNameValue] = useState("")
    const[typeValue,setTypeValue] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/admin/users');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleNameChange = (userId, newName) => {
        setUsers(users.map(user =>
            user._id === userId ? { ...user, name: newName } : user
        ));
    };

    const handleUserTypeChange = (userId, newUserType) => {
        setUsers(users.map(user =>
            user._id === userId ? { ...user, usertype: newUserType } : user
        ));
    };

    const handleSave = async (userId) => {
        const userToUpdate = users.find(user => user._id === userId);
        if (userToUpdate) {
            try {
                const response = await fetch(`http://localhost:3001/admin/users/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userToUpdate),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('User updated successfully');

            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>User Type</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Height/Weight</TableCell>
                        <TableCell>Age</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>
                                <TextField
                                    value={user.name}
                                    onChange={(e) => handleNameChange(user._id, e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    value={user.usertype}
                                    onChange={(e) => handleUserTypeChange(user._id, e.target.value)}
                                >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="User">User</MenuItem>
                                    <MenuItem value="Coach">Coach</MenuItem>
                                </Select>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell>{user.height}/{user.weight}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.gender}</TableCell>

                            <TableCell>
                                <Button onClick={() => handleSave(user._id)}>Save</Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTab;
