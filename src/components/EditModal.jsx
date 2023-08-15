import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
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

const EditModal = ({ open, setOpen, setEditData, editData, editHandler }) => {
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='container'>
                        <Typography>Fill the changes</Typography>
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={editData?.name} onChange={(e) => {
                            setEditData((prev) => {
                                return ({ ...prev, "name": e.target.value })
                            })
                        }} />
                        <TextField id="outlined-basic" label="Phone" type='number' variant="outlined" value={editData?.phone} onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^\d{0,10}$/.test(inputValue)) {
                                setEditData((prev) => ({ ...prev, "phone": inputValue }));
                            }
                        }}
                            inputProps={{
                                inputMode: 'numeric',
                                maxLength: 10,
                            }}
                        />
                        <TextField id="outlined-basic" label="
                        Email" type='email' variant="outlined" value={editData?.email} onChange={(e) => {
                                setEditData((prev) => {
                                    return ({ ...prev, "email": e.target.value })
                                })
                            }} />
                        <Button onClick={() => {
                            editHandler()
                            handleClose()
                        }}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default EditModal
