import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from './store.js';
import Button from './Button/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';
import EditCountryModal from './Modal/EditCountryModal';
import AddCountryModal from './Modal/AddCountryModal';
import ConfirmCountryModal from './Modal/ConfirmCountryModal';

const CountryIndex = observer(() => {
  const { CountryStore } = React.useContext(StoreContext);
  const [searchName, setSearchName] = useState('');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    CountryStore.fetchCountryList();
  }, [CountryStore, currentPage, searchName]);

  const handleCloseModal = () => {
    setOpenModalAdd(false);
    setOpenModalDelete(false);
    setOpenModalEdit(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (value) => {
    setSearchName(value);
    setCurrentPage(1);
  };

  const handleDeleteUserFromModal = async (countryToDelete) => {
    await CountryStore.deleteCountry(countryToDelete.id);
  };

  const handleDeleteClick = (country) => {
    setOpenModalDelete(true);
    setSelectedCountry(country);
  };

  const handleEditClick = (country) => {
    setSelectedCountry(country);
    setOpenModalEdit(true);
  };

  const handleEditFromModal = async (editedCountry) => {
    await CountryStore.editCountry(editedCountry);
    setOpenModalEdit(false);
  };

  const handleUpdateTable = async (country) => {
    await CountryStore.addCountry(country);
    setOpenModalAdd(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <TextField
          label="Enter Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>code</TableCell>
              <TableCell>name</TableCell>
              <TableCell>des</TableCell>
              <TableCell>
                <Button btnName="Add" handleClick={() => setOpenModalAdd(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {CountryStore.countryList.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.code}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.description}</TableCell>
                <TableCell>
                  <Button btnName="Edit" handleClick={() => handleEditClick(country)} />
                  <Button btnName="Delete" handleClick={() => handleDeleteClick(country)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
      </div>
      {openModalEdit && <EditCountryModal open={openModalEdit} onClose={handleCloseModal} country={selectedCountry} onSaveChanges={handleEditFromModal} />}
      {openModalAdd && <AddCountryModal open={openModalAdd} onClose={handleCloseModal} handleUpdateTable={handleUpdateTable} />}
      {openModalDelete && <ConfirmCountryModal open={openModalDelete} onClose={handleCloseModal} country={selectedCountry} handleDeleteUserFromModal={handleDeleteUserFromModal} />}
    </div>
  );
});

export default CountryIndex;
