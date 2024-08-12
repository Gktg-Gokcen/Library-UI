import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../../sections/user/table-no-data';
import UserTableRow from '../../sections/user/user-table-row';
import UserTableHead from '../../sections/user/user-table-head';
import TableEmptyRows from '../../sections/user/table-empty-rows';
import UserTableToolbar from '../../sections/user/user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../sections/user/utils';
import axios from 'axios';
import AddUserFormDialog from './AddUserFormDialog';
import AlertComp from './AlertComp';
import UpdateUserFormDialog from './UpdateUserFormDialog';

// ----------------------------------------------------------------------


export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [addFormDialog, setAddFormDialog] = useState(false);

  const [alert, setAlert] = useState("")

  const [alertopen, setAlertopen] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({})

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers();
    
  }, [])
  
  const fetchUsers = async () => {
    await axios.get("http://localhost:8080/api/user")
      .then(response => {
        setUsers(response.data)
        console.log("user", users);
      })

  }

  const handleDeleteUser = async (userId) => {
    await axios.delete("http://localhost:8080/api/user?userId=" + userId)
      .then(() => {
        fetchUsers();
        handleAlert("success");
      })
      .catch(error => {
        console.error('Kitap silme işlemi sırasında hata oluştu.', error);
        handleAlert("error");
      });
  }

  const handleAddFormDialog = () => {
    setAddFormDialog(true);
  }

  const handleAlert = (message) => {
    if (message === "error") {
      setAlert("error")
    } else if (message === "success") {
      setAlert("success")
    }
    setAlertopen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertopen(false);
  };

  const handleSort = (event, id) => {
    console.log(id);
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Kullanıcılar</Typography>

        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Button onClick={handleAddFormDialog} sx={{ marginLeft: '1000px' }} variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
            Kulanıcı Ekle
          </Button>

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: 'Id' },
                    { id: 'name', label: 'Adı' },
                    { id: 'surname', label: 'Soyadı' },
                    { id: 'mail', label: 'Mail' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <UserTableRow
                        key={user?.userId}
                        id={user?.userId}
                        name={user?.username}
                        surname={user?.userSurname}
                        mail={user?.email}
                        selected={selected.indexOf(user.username) !== -1}
                        handleClick={(event) => handleClick(event, user.username)}
                        handleDeleteUser={handleDeleteUser}
                        handleAlert={handleAlert}
                        user={user}
                        fetchUsers={fetchUsers}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <AddUserFormDialog open={addFormDialog} setOpen={setAddFormDialog} fetchUsers={fetchUsers} handleAlert={handleAlert} />

      <AlertComp alert={alert} alertopen={alertopen} handleClose={handleClose} ></AlertComp>
    </>
  );
}
