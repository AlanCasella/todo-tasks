import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectOutlined from '@material-ui/icons/SubjectOutlined';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import HomeOutlined from '@material-ui/icons/HomeOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => {
    return {
        nav: {
            display: "flex",
            justifyContent: "space-evenly",
            paddingLeft: theme.spacing(9),
            height: theme.mixins.toolbar.minHeight,
            backgroundColor: "#F8F8FF"
        }
    }

})

const Nav = () => {
    const classes = useStyles()
    const router = useRouter()

    function handleClick(path) {
        router.push(path)
    }

    return (
        <Drawer
        variant="permanent"
        anchor="top"
        >
            <List className={classes.nav}>
                <ListItem  button onClick={() => handleClick("/")} selected={router.pathname === "/"}>
                    <ListItemIcon>
                        <HomeOutlined color="secondary"/>
                        <ListItemText primary="Home" />
                    </ListItemIcon>
                </ListItem>
                <ListItem  button onClick={() => handleClick("/about")} selected={router.pathname === "/about"}>
                    <ListItemIcon>
                    <InfoOutlined color="secondary"/>
                        <ListItemText primary="About" />
                    </ListItemIcon>
                </ListItem>
                <ListItem  button onClick={() => handleClick("/tasks")} selected={router.pathname === "/tasks"}>
                    <ListItemIcon>
                        <SubjectOutlined color="secondary"/>
                        <ListItemText primary="List"/>
                    </ListItemIcon>
                </ListItem>
                <ListItem  button onClick={() => handleClick("/add")} selected={router.pathname === "/add"}>
                    <ListItemIcon>
                        <AddCircleOutlineOutlined color="secondary"/>
                        <ListItemText primary="Add"/>
                    </ListItemIcon>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Nav;