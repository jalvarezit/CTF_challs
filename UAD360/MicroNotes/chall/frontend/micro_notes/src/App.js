import React, { useState } from 'react';

import { ThemeContext, themes } from './contexts/ThemeContext';
import { TextField , Fab, List, Typography, Stack, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './App.css';
import ToggleDark from './components/toggleDark';
import Footer from './components/Footer';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const clearNotes = () => {
    notes.forEach(note => {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
  
      fetch(`${API_URL}note.php?id=${note.id}`, requestOptions);      
    });
    setNotes([]);
  }

  const handleChange = (event) => {
    setNewNote(event.target.value);
  }

  const createNote = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newNote })
    };

    fetch(`${API_URL}note.php`, requestOptions)
        .then(response => response.json())
        .then(data => setNotes([...notes, {"id": data.id, "content": newNote}]));
    
    
    setNewNote("");
  }

  const listNotes = notes.map((note) => 
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>{note.id}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {note.content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-warning">Micro Notes</h1>
      </header>
        <Fab
          sx={{
            position: "fixed",
            top: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2)
          }}
        >
        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <ToggleDark
              toggleDark={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            />
          )}
        </ThemeContext.Consumer>
      </Fab>
      <TextField
        sx ={{ color: 'red'}}
        formControlProps={{
          fullWidth: true
        }}
        multiline
        onChange={handleChange}
        type="text"
        value={newNote}
      />
      <br></br>
      <Button mt={3} variant="outlined" size="large" onClick={createNote} color="primary">Create</Button>
      <Button mt={3} variant="outlined" size="large" onClick={clearNotes} color="primary">Clear</Button>
      
      <Typography mt={7}>Private Notes</Typography>
      <Stack mt={2} direction="row" justifyContent="center">
        <List>
          {listNotes}
        </List>
      </Stack>
      <Footer></Footer>
    </div>
  );
}

export default App;
