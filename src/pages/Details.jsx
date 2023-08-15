import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Details() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()

    const getData = () => {
        setLoading(true)
        setTimeout(() => {
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
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
    return (
        <div className='wrapper '>
            <Card className='cardContainer'>
                <div style={{ fontSize: "2rem" }} className='wrapper2 '>
                    <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
                    <b>Details of the user</b>
                    {
                        loading ? (
                            <>
                                <Skeleton variant="circular" width={50} height={50} />
                            </>
                        ) : (
                            <>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>{`${userData?.name?.charAt(0)}`}</Avatar>
                            </>
                        )
                    }

                </div>
                <div className='line'></div>
                <CardContent className='flexCenter'>
                    {
                        loading
                            ? (
                                <>
                                    <Skeleton variant="rounded" width={"25em"} height={"10em"} />
                                </>
                            )
                            : (
                                <>
                                    <div>
                                        <Typography>{`Name :- `}</Typography>
                                        <Typography>{`Username :- `}</Typography>
                                        <Typography>{`Email :- `}</Typography>
                                        <Typography>{`Phone :- `}</Typography>
                                        <Typography>{`Website :- `}</Typography>
                                        <Typography>{`Address :- `}</Typography>
                                    </div>
                                    <div>
                                        <Typography>{`${userData?.name}`}</Typography>
                                        <Typography>{`${userData?.username}`}</Typography>
                                        <Typography>{`${userData?.email}`}</Typography>
                                        <Typography>{`${userData?.phone}`}</Typography>
                                        <Typography>{`${userData?.website}`}</Typography>
                                        <Typography>{`${userData?.address?.suite} ${userData?.address?.street} ${userData?.address?.city}`}</Typography>
                                    </div>
                                </>
                            )
                    }
                </CardContent>
            </Card>
        </div>
    );
}