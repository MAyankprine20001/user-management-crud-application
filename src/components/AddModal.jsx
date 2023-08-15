import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
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

const AddModal = ({ open, setOpen, setEditData, editData, addHandler }) => {
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
                        <Typography>FILL THE DETAILS</Typography>
                        <TextField id="outlined-basic" label="Name" variant="outlined" value={editData?.name} onChange={(e) => {
                            setEditData((prev) => {
                                return ({ ...prev, "name": e.target.value })
                            })
                        }} />
                        <TextField id="outlined-basic" label="Phone" variant="outlined" value={editData?.phone} onChange={(e) => {
                            setEditData((prev) => {
                                return ({ ...prev, "phone": e.target.value })
                            })
                        }} />
                        <TextField id="outlined-basic" label="
                        Email" variant="outlined" value={editData?.email} onChange={(e) => {
                                setEditData((prev) => {
                                    return ({ ...prev, "email": e.target.value })
                                })
                            }} />
                        <Button onClick={() => {
                            let validation = Object.values(editData).map((element) => {
                               return (element.length > 0 ? true :false)
                            }).slice(1)
                           
                            validation = validation.includes(false)
                            console.log(validation,"lion")
                            if (!validation) {
                                addHandler()
                                handleClose()
                            }else{
                                toast.error("plz fill all the info")
                            }
                        }}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AddModal
