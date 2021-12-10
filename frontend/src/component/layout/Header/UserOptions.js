import React, {Fragment} from 'react';
import './index.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const UserOptions = ({ user }) => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const options = [
        {icon:<ListAltIcon/>, name:"Orders", func: orders},
        {icon:<PersonIcon/>, name:"Profile", func: account},
        {icon:<ExitToAppIcon/>, name:"Logout", func: logoutUser}
    ]

    if(user.role === 'admin'){
        options.unshift({icon:<DashboardIcon/>, name:"Dashboard", func: dashboard});
    }

    function dashboard(){
        history.push('/dashboard');
    }

    function orders(){
        history.push('/orders');
    }

    function account(){
        history.push('/account');
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }


    return (
        <Fragment>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : '/Profile.png'}
                        alt="Profile"
                    />
                }
            >
            {
                options.map(item => (
                    <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                ))
            }
            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions
