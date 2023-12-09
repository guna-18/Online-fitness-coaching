import { Card, CardContent, Typography, Stack, Avatar } from '@mui/material';
import {useNavigate} from 'react-router-dom';

function ClientCard(props){
    const user = props.user;
    const navigate = useNavigate();
    const navigateToClientHandler = (userId) => {
        navigate('/clients/'+userId);
    };
return(<>
<Card key={user._id} onClick={() => navigateToClientHandler(user._id)}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar>{user.name[0]}</Avatar>
              <div>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </div>
            </Stack>
          </CardContent>
        </Card>
</>);
}

export default ClientCard;