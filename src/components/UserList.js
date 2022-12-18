import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import UpdateDialog from './UpdateDialog'
import DeleteDialog from './DeleteDialog';

const UserList = () => {
    const { users, nextUserId } = useSelector((store) => store.users);
    const [currUserId, setCurrUserId] = useState(nextUserId);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const isEmpty = users.length === 0;

    const handleOpenUpdateDialog = (id) => {
        setCurrUserId(id)
        setOpenUpdate(true);
    }
    const handleCloseUpdateDialog = () => {
        setCurrUserId(nextUserId)
        setOpenUpdate(false);
    }

    const handleOpenDeleteDialog = (id) => {
        setCurrUserId(id);
        setOpenDelete(true);
    }
    const handleCloseDeleteDialog = () => {
        setOpenDelete(false);
    }


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={6}>User List</TableCell>
                        <TableCell align="right"><Button variant="contained" onClick={(e) => handleOpenUpdateDialog(nextUserId, e)}>Add new</Button></TableCell>
                    </TableRow>
                </TableHead>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isEmpty ?
                        <TableRow>
                            <TableCell colSpan={7} align="center">No data to show.</TableCell>
                        </TableRow> :
                        <>
                            {users.map((user) => {
                                let { id, name, username, email, address: { city } } = user;
                                return (
                                    <TableRow key={id}>
                                        <TableCell align="center">{id}</TableCell>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>{username}</TableCell>
                                        <TableCell>{email}</TableCell>
                                        <TableCell>{city}</TableCell>
                                        <TableCell align="center"><Button variant="contained" onClick={(e) => handleOpenUpdateDialog(id, e)}>Edit</Button></TableCell>
                                        <TableCell align="center"><Button variant="contained" onClick={(e) => handleOpenDeleteDialog(id, e)}>Delete</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </>
                    }
                </TableBody>
            </Table>
            <UpdateDialog open={openUpdate} handleClose={handleCloseUpdateDialog} userId={currUserId} />
            <DeleteDialog open={openDelete} handleClose={handleCloseDeleteDialog} userId={currUserId} />
        </TableContainer>
    )
}

export default UserList