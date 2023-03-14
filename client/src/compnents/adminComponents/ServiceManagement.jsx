import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "../../styles/AdminStyles/serviceManagement.css";
import { TextField } from "@mui/material";
import { addService, deleteService, getServices } from "../../services/adminApi";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Modal from "react-bootstrap/Modal";

export default function ServiceManagement() {
    const [serviceData, setServiceData] = React.useState([]);
    React.useEffect(() => {
        try {
            async function fetchData() {
                const result = await getServices();
                setServiceData(result.serviceData);
            }
            fetchData();
        } catch (error) {
            console.log(error.message);
        }
    }, [serviceData]);

    return (
        <div class="container text-center mt-3 containerbody">
            <div class="row bootstrap snippets bootdeys">
                <div class="comment-wrapper">
                    <div class="panel panel-info">
                        <div class="panel-body text-center">
                            <br />
                            <CustomizedDialogs />
                            <hr />
                            <ul class="media-list p-2">
                                {serviceData.map((data) => {
                                    return (
                                        <li class="media">
                                            <a href="#" class="pull-left">
                                                <img src={data.image} alt="" class="img-circle" />
                                            </a>
                                            <div class="media-body">
                                                <strong className="text-success">{data.serviceName}</strong>
                                                <p className="text-black">{data.serviceDetails}</p>
                                                <Button variant="contained">Edit</Button>
                                                <Example id={data._id}/>
                                            </div>
                                            
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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

function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    var [serviceData, setServiceData] = React.useState({
        serviceName: "",
        serviceDetails: "",
        encodedUrl: "",
    });
    const [image, setImage] = React.useState("");
    const [result, setresult] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setServiceData({ ...serviceData, [name]: value });
    };

    const submitService = async (event) => {
        event.preventDefault();
        if (!serviceData.serviceName && !serviceData.serviceDetails && !image) {
            setTimeout(() => {
                setErrMsg("");
            }, 5000);
            return setErrMsg("Please Complete All Fields");
        }
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
            const data = {
                serviceName: serviceData.serviceName,
                serviceDetails: serviceData.serviceDetails,
                encodedUrl: reader.result,
            };
            console.log(data);
            const res = await addService(data);
            if (res) {
                handleClose();
                setresult(true);
            }
        };
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} type="button" class="btn btn-info text-black">
                Add Service
            </Button>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Enter Service Details
                </BootstrapDialogTitle>
                <div style={{ width: "350px", height: "350px", textAlign: "center" }}>
                    <form onSubmit={submitService}>
                        <DialogContent dividers>
                            {errMsg && <p className="text-danger">{errMsg}</p>}
                            <TextField
                                size="small"
                                id="outlined-basic"
                                onChange={onChange}
                                fullWidth
                                label="Service Name"
                                variant="outlined"
                                name="serviceName"
                            />
                            <div class="form-group mt-3">
                                <textarea
                                    class="form-control"
                                    placeholder="Service Description"
                                    onChange={onChange}
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="serviceDetails"
                                ></textarea>
                            </div>
                            <br />
                            <span>Upload Image</span>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                <AddPhotoAlternateIcon style={{ fontSize: 40 }} />
                            </IconButton>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus type="submit">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </div>
            </BootstrapDialog>
            {result && <CustomizedSnackbars />}
        </div>
    );
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars() {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    Service Submitted Successfully!
                </Alert>
            </Snackbar>
        </Stack>
    );
}

function Example(props) {
    const [show, setShow] = React.useState(false);
    const [msg,setMsg] = React.useState("")
    const handleClickDeleteService = async() => {
        try {
            const serviceId={
                id : props.id
            }
            const result = await deleteService(serviceId)
            if (result) {
                setMsg("Successfully Deleted")
                setTimeout(() => {
                    handleClose()
                }, 3000);
            }
        } catch (error) {
            console.log(error.message);
        }
        
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="ms-3" variant="contained" onClick={handleShow}>
                Remove
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h4 className="text-danger">Are You Sure?</h4>
                </Modal.Header>
                {msg && <h6 className="text-danger">{msg}</h6>} 
                <Modal.Footer>
                    <Button variant="outlined" onClick={handleClickDeleteService}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
