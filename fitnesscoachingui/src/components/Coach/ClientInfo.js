import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

const ClientInfo = ({ user }) => {
  const cardStyle = {
    maxWidth: 300,
    margin: 'auto',
    marginTop: 20,
    backgroundColor: '#f0f0f0', // Set your desired background color
  };

  const avatarStyle = {
    width: 100,
    height: 100,
    margin: 'auto',
    marginTop: 10,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  };

  return (
    <Card style={cardStyle}>
      <Avatar alt={user.name} src={user.avatar} style={avatarStyle} />
      <CardContent style={contentStyle}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography color="textSecondary">Age: {user.age}</Typography>
        <Typography color="textSecondary">Address: {user.address}</Typography>
        <Typography color="textSecondary">Height: {user.height}</Typography>
        <Typography color="textSecondary">Weight: {user.weight}</Typography>
        {/* <Typography color="textSecondary">
          Membership Start Date: {user.membershipStartDate}
        </Typography>
        <Typography color="textSecondary">
          Membership End Date: {user.membershipEndDate}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default ClientInfo;
