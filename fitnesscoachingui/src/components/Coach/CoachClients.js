import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ClientCard from "./ClientCard";
import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';

// const users = [
//   { id: 1, name: "John Doe", username: "john_doe", email: "john@example.com" },
//   { id: 2, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
//   { id: 3, name: "John Doe", username: "john_doe", email: "john@example.com" },
//   { id: 4, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
//   { id: 5, name: "John Doe", username: "john_doe", email: "john@example.com" },
//   { id: 6, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
//   { id: 7, name: "John Doe", username: "john_doe", email: "john@example.com" }
// ];
function CoachClients() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [users,setUsers] = useState(null);
  useEffect(() => {


    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/coach/getClients/6562e2f55958b87ec7e5d206');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
    const navigate = useNavigate();
    const navigateToClientHandler = (userId) => {
     // console.log("navigating to "+userId);
        navigate(`/clients/${userId}`);
    };
  return (
    <>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
      {!loading && !error && (
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Stack spacing={2}>
            {users && users.map((user) => (
              <ClientCard key={user._id} user={user} onClick={() => navigateToClientHandler(user._id)} />

            ))}
          </Stack>
        </Box>
      </Container>
             )}
    </>
  );
}
export default CoachClients;
