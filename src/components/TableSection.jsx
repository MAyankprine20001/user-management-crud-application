import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import EditModal from './EditModal';
import AddModal from './AddModal';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';

const TableSection = () => {
    const [userData, setUserData] = useState([])
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // api call for data gathering
    const getData = () => {
        setLoading(true)
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(response => response.json())
                .then((data) => {
                    setUserData(data)
                }).finally(() => {
                    setLoading(false)
                })
        }, 1000);
    }
    useEffect(() => {
        getData();
    }, [])

    // method to delete 
    const deleteHandler = (DeletionID) => {
        setUserData((prev) => prev.filter((data) => data.id != DeletionID))
    }

    // store information for changes
    const [editData, setEditData] = useState({
        "id": userData.length + 1,
        "name": "",
        "phone": "",
        "email": ""
    })

    // method to make changes the table/edit method
    const editHandler = () => {
        const data = userData.map((singleUser) => {
            if (singleUser.id - 1 === editData.id) {
                singleUser.name = editData.name.length > 0 ? editData.name : singleUser.name
                singleUser.phone = editData.phone.length > 0 ? editData.phone : singleUser.phone
                singleUser.email = editData.email.length > 0 ? editData.email : singleUser.email

            }
            return singleUser
        })
        setUserData([...data])
    }

    // method to add data
    const addHandler = () => {
        const obj = {
            ...editData,
            "id": userData.length + 1
        }
        setUserData([...userData, obj])
    }
    if (loading) {
        return (
            <>
                <Skeleton variant="text" sx={{ fontSize: '6rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '6rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '6rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '6rem' }} />

            </>
        )
    }
    else {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.length > 0 && userData.map((singleData, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{singleData.id}</td>
                                        <td className='pointer' onClick={()=>navigate(`/details/${singleData.id}`)}>{singleData.name}</td>
                                        <td>{singleData.email}</td>
                                        <td>{singleData.phone}</td>
                                        <td style={{ padding: "12px" }}>
                                            <Button variant="outlined" style={{ marginRight: "10px" }} onClick={() => {
                                                setEditData(() => {
                                                    return (
                                                        {
                                                            "id": index,
                                                            "name": "",
                                                            "phone": "",
                                                            "email": ""
                                                        }
                                                    )
                                                })
                                                setOpenEditModal(true)
                                            }}>EDIT</Button>
                                            <Button variant="outlined" onClick={() => deleteHandler(singleData.id)}>DELETE</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: "5px" }}>
                    <Button variant="outlined" onClick={() => {
                        setEditData((prev) => {
                            return (
                                {
                                    ...prev,
                                    "name": "",
                                    "phone": "",
                                    "email": ""
                                }
                            )
                        })
                        setOpenAddModal(true)
                    }}>ADD</Button>
                </div>
                {
                    openEditModal && <EditModal open={openEditModal} setOpen={setOpenEditModal} editData={editData} setEditData={setEditData} editHandler={editHandler} />
                }
                {
                    openAddModal && <AddModal open={openAddModal} setOpen={setOpenAddModal} editData={editData} setEditData={setEditData} addHandler={addHandler} />
                }
            </>
        )
    }


}

export default TableSection