import { Paper } from "@mui/material";
import "../../styles/UserStyles/UserBanner.css";

function Item(props) {
    return (
        <Paper>
            <div className="bannerimage">
                <img className="bannerimg" src={props.item} alt="Banner" />
            </div>
        </Paper>
    );
}

export default Item;
