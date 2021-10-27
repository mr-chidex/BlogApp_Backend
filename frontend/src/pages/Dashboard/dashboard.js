import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useHistory } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Logo from "../../components/Logo";
import DropDown from "./DropDown";
import { userLogoutAction } from "../../redux/actions/userActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  iconColor: { color: "#aaa" },
  imageContainer: {
    width: 30,
    height: 30,
    margin: "1rem auto",
    backgroundColor: "#fff",
    borderRadius: 15,
    border: "solid 1px #bbb",
    padding: "1px",
    display: "grid",
    placeItems: "center",
  },
  image: {
    width: "100%",
    borderRadius: "50%",
  },
  root: { backgroundColor: "#182029", color: "#fff" },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  background: "#111",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardNav({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const home = window.location.origin;
  const history = useHistory();
  const { user } = useSelector((state) => state.userData);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <a href={`${home}`}>
              <Logo noLink={true} />
            </a>

            <DropDown
              display={
                user?.image?.url ? (
                  <Box className={classes.imageContainer} title={user?.name}>
                    <img
                      className={classes.image}
                      src={user?.image?.url}
                      alt="profile"
                    />
                  </Box>
                ) : (
                  <Avatar />
                )
              }
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push("/dashboard/add-post")}>
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Add Posts" />
          </ListItem>
          <ListItem button onClick={() => history.push("/dashboard/post")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="All Post" />
          </ListItem>
          {user?.admin && (
            <ListItem
              button
              onClick={() => history.push("/dashboard/subscribers")}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary="News Subscribers" />
            </ListItem>
          )}
          <Divider />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box className={classes.title}>
                {" "}
                <SettingsIcon className={classes.iconColor} />
                <span>Settings</span>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem
                button
                onClick={() => history.push("/dashboard/profile")}
              >
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => history.push("/dashboard/change-password")}
              >
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem
                button
                onClick={() => history.push("/dashboard/edit-profile")}
              >
                <ListItemText primary="Edit Profile" />
              </ListItem>
              <ListItem button onClick={logoutHandler}>
                <ListItemText primary="Logout" />
              </ListItem>
            </AccordionDetails>
          </Accordion>
        </List>
      </Drawer>
      <Main open={open} className={classes.root}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
