import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import UpdateUserFormDialog from 'src/ekutuphane/components/UpdateUserFormDialog';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  handleClick,
  surname,
  mail,
  id,
  handleDeleteUser,
  user,
  fetchUsers,
  handleAlert
}) {
  const [open, setOpen] = useState(null);
  const [updateUserFormDialog, setUpdateUserFormDialog] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({})


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleUpdateUserFormDialog = () => {
    setUpdateUserFormDialog(true);
    setUpdatedUser(user);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{id}</TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{surname}</TableCell>

        <TableCell>{mail}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleUpdateUserFormDialog} sx={{ color:'blue'}}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => {
          handleDeleteUser(user.userId);
          handleCloseMenu();           
        }} >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      {
        updateUserFormDialog === true && <UpdateUserFormDialog open={updateUserFormDialog} setOpen={setUpdateUserFormDialog} user={updatedUser} setUser={setUpdatedUser} fetchUsers={fetchUsers} handleAlert={handleAlert} />
      }
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  username: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  mail: PropTypes.string,
  password: PropTypes.string,
  id: PropTypes.string
};
