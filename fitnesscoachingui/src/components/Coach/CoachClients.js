import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ClientCard from "./ClientCard";
import {useNavigate} from 'react-router-dom';

const users = [
  { id: 1, name: "John Doe", username: "john_doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
  { id: 3, name: "John Doe", username: "john_doe", email: "john@example.com" },
  { id: 4, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
  { id: 5, name: "John Doe", username: "john_doe", email: "john@example.com" },
  { id: 6, name: "Jane Doe", username: "jane_doe", email: "jane@example.com" },
  { id: 7, name: "John Doe", username: "john_doe", email: "john@example.com" }
];
function CoachClients() {
    const navigate = useNavigate();
    const navigateToClientHandler = (userId) => {
        navigate('/clients/${userId}');
    };
  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Stack spacing={2}>
            {users.map((user) => (
              <ClientCard key={user.id} user={user} onClick={() => navigateToClientHandler(user.id)} />
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
export default CoachClients;
