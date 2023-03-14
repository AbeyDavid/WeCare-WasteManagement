import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { approveDriver, getPendingDrivers} from "../../services/adminApi";
import "../../styles/AdminStyles/adminNewDrivers.css";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

export default function NewDrivers() {
    const [driverData, setDriverData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getPendingDrivers();
            setDriverData(result.driverData);
        }
        fetchData();
    }, [driverData]);
    return (
        <div>
            <div className="text-center">
                <div class="container bootstrap snippets bootdey">
                    <div class=" list-content">
                        {driverData.length!==0?
                        <ul class="list-group">
                            <li href="#" class="list-group-item title">
                                New Driver Requests
                            </li>
                            {driverData.map((data, index) => {
                                return (
                                    <li href="#" class="list-group-item text-left" key={data._id}>
                                        <img
                                            class="img-thumbnail"
                                            src="https://bootdey.com/img/Content/User_for_snippets.png"
                                        />
                                        <label class="name text-black">
                                            {data.name}
                                            <br />
                                        </label>
                                        <span className="ms-5">{data.status}</span>
                                        <p className="mt-3 pull-right">
                                            <CustomizedDialogs data={data} />
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                        :
                        <h4> No Requests</h4>
                        }
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(false);
    const [driverData, setdriver] = useState(props);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const driverApprove = async(id) => {
        var driverId = { id: id };
        const result = await approveDriver(driverId);
        console.log(result.driverData);
        if (result.driverData) {
            handleClose()
        }
    };
    const driverReject = async(id) => {
        var driverId = { id: id };
        const result = await approveDriver(driverId);
        console.log(result.driverData);
        if (result.driverData) {
            handleClose()
        }
    }; 
    return (
        <div>
            <Button variant="contained" color="success" onClick={handleClickOpen}>
                View
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {driverData.data.name}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Age: {driverData.data.age}
                        <br />
                        <hr />
                        Email: {driverData.data.email}
                        <br />
                        <hr />
                        Phone: {driverData.data.phone}
                        <br />
                        <hr />
                        Address: {driverData.data.address}
                        <br />
                        <hr />
                        Experience: {driverData.data.experience}
                        <br />
                        <hr />
                    </Typography>
                    <Typography gutterBottom>
                        <h4>Licence:</h4>
                        <img src={driverData.data.licence} alt="" class="img-fluid w-50 h-auto" />
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button Approve variant="contained" color="success" onClick={() => driverApprove(driverData.data._id)}>
                        Approve
                    </Button>
                    <Button Approve variant="contained" color="error" onClick={() => driverReject(driverData.data._id)}>
                        Reject
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
