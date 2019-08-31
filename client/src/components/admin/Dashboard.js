import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import DraftsIcon from "@material-ui/icons/Drafts";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import AccessibleIcon from "@material-ui/icons/Accessible";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* Numbers of records list */}
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <List>
              <Grid container justify="center" alignItems="center">
                <Avatar
                  alt="Remy Sharp"
                  src="/components/image/biraj.jpg"
                  className={classes.bigAvatar}
                />
                <Typography variant="h5">Biraj Halder</Typography>
              </Grid>

              <Divider />

              {/* Teachers record */}
              <ListItem button>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Teachers Record" />
              </ListItem>
              <Divider />

              {/* Students record */}
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText primary="Student Records" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="CST" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ETC" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="EE" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ME" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />

              {/* Semester fees */}
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Sem Fees" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="CST" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ETC" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="EE" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ME" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />

              {/* Students result */}
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <DirectionsRunIcon />
                </ListItemIcon>
                <ListItemText primary="Results" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="CST" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ETC" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="EE" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="ME" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />

              {/* Accounts of system */}
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <AccessibleIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Credit" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Debit" />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Fastivals" />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
            </List>
          </Paper>
        </Grid>

        {/* Numbers of records shown */}
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>Dashboard</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
