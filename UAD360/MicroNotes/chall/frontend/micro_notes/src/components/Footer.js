import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Footer() {
    const [openContrib, setOpenContrib] = useState(false);

    const handleOpenContrib = () => setOpenContrib(true);
    const handleCloseContrib = () => setOpenContrib(false);

    return (
        <div className="Footer">
        <footer style={{color: "gray", position: "fixed", bottom: 0}}>
            <Typography>Click <Button onClick={handleOpenContrib}>here</Button> to contribute to the project</Typography>
            <Modal
            open={openContrib}
            onClose={handleCloseContrib}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Contribute
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    We did not make the project open source yet, hold on for updates.
                </Typography>
                </Box>
            </Modal>
        </footer>
        </div>
    );
}

export default Footer;
