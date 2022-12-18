import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, updateUser } from '../features/users/usersSlice';

const UpdateDialog = ({ open, handleClose, userId }) => {
  const { users } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  const newUser = {
    "id": userId,
    "name": "",
    "username": "",
    "email": "",
    "address": {
      "city": ""
    }
  }

  const [currentUser, setCurrentUser] = useState({});

  const index = users.findIndex(user => user.id === userId);
  const isNewUser = userId >= users.length;

  useEffect(() => isNewUser ? setCurrentUser(newUser) : setCurrentUser(users[index]), [isNewUser])

  const handleAddUser = () => {
    handleClose();
    dispatch(addNewUser(currentUser))
  }

  const handleUpdateUser = () => {
    handleClose();
    dispatch(updateUser(currentUser))
  }

  const handleFieldChange = (key, value) => {
    setCurrentUser(prev => ({ ...prev, [key]: value }))
  }

  const handleCityChange = (e) => {
    setCurrentUser(prev => ({ ...prev, ...{ address: { city: e.target.value } } }))
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Form</DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          variant="standard"
          value={currentUser?.name}
          required
          fullWidth
          error={!currentUser?.name ? true : false}
          helperText={!currentUser?.name ? "Field required" : ''}
          onChange={(e) => handleFieldChange("name", e.target.value)}
        />
        <TextField
          margin="dense"
          id="username"
          label="Username"
          type="text"
          variant="standard"
          value={currentUser?.username}
          required
          fullWidth
          error={!currentUser?.username ? true : false}
          helperText={!currentUser?.username ? "Field required" : ''}
          onChange={(e) => handleFieldChange("username", e.target.value)}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          variant="standard"
          value={currentUser?.email}
          fullWidth
          onChange={(e) => handleFieldChange("email", e.target.value)}
        />
        <TextField
          margin="dense"
          id="city"
          label="City"
          type="text"
          variant="standard"
          value={currentUser?.address?.city}
          fullWidth
          onChange={handleCityChange}

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {isNewUser ?
          <Button onClick={handleAddUser}>Add</Button>
          :
          <Button onClick={handleUpdateUser}>Update</Button>}
      </DialogActions>
    </Dialog>
  );
}

export default UpdateDialog;