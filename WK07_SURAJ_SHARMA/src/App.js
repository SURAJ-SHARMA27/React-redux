import React, { useState, useEffect } from 'react';
import { TextField, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Autocomplete, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  tableContainer: {
    marginTop: 16,
  },
};

const App = () => {
  const [postIdInput, setPostIdInput] = useState('');
  const [tableData, setTableData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const fetchAndAdd = () => {
    const selectedPost = posts.find(post => post.id === Number(postIdInput));

    if (selectedPost) {
      setTableData([...tableData, { id: selectedPost.id, title: selectedPost.title }]);
      setPostIdInput('');
    }
  };

  const deleteRow = (id) => {
    setTableData(tableData.filter(row => row.id !== id));
  };

  const editRow = (id, title) => {
    setEditId(id);
    setEditTitle(title);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = () => {
    setTableData(tableData.map(row => (row.id === editId ? { ...row, title: editTitle } : row)));
    setEditDialogOpen(false);
  };

  return (
    <Container style={styles.container}>
      <h1>CRUD App</h1>
      <Autocomplete
        options={posts}
        getOptionLabel={(post) => `${post.id} - ${post.title}`}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select ID" variant="outlined" />}
        onChange={(event, value) => setPostIdInput(value ? value.id : '')}
      />
      <Button variant="contained" color="primary" onClick={fetchAndAdd} style={{ marginTop: 10 }}>
        Add to Table
      </Button>

      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Post Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => editRow(row.id, row.title)} style={{ marginRight: 10 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteRow(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullWidth maxWidth="sm" >
        
        <DialogTitle>Edit Title</DialogTitle>
        <DialogContent>
          <TextField
            label="New Title"
            variant="outlined"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
