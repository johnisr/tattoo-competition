import React, { Component, Fragment } from "react";
import { Button, Paper, Typography, IconButton, Grid } from "@material-ui/core";
import { CloudUpload, PhotoCamera, FilterNone } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Submit from "../pages/Submit";
import axios from "axios";

const styles = theme => ({
  root: {
    width: 300
  },
  paper: {
    padding: theme.spacing(6),
    margin: "10% auto",
    width: "60%"
  },
  grid: {
    marginTop: theme.spacing(0)
  },
  button: {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    margin: "20px"
  },
  largeIcon: {
    width: 200,
    height: 200
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      file: null
    };

    onSelectHandler = event => {
      console.log(event.target.files);
      this.setState({
        file: event.target.files[0]
      });
    };

    submissionHandler = () => {
      /*
      1. formData?
      2.axios.post ?
      3. no need for headers
      4.setState?
      */

      console.log("in the submit handler");
      const formData = new FormData();
      formData.append("image", this.state.file);
      const userId = localStorage.getItem('userId');
      formData.append('userId', userId);
      
      // axios
      //   .post("http://localhost:3001/submit", {
      //     method: "POST",
      //     body: formData
      //   })
      //   .then(sub => {
      //     console.log(sub);
      //   })
      //   .catch(err => console.log(err));

      fetch("http://localhost:3001/submit", {
        method: "POST",
        body: formData
      })
    };

    }


    render() {
      const { classes } = this.props;
      const { file } = this.state;
      return (
        <div style={{ margin: "auto", textAlign: "center" }}>
          <Grid
            container
            direction="column"
            spacing={4}
            justify="center"
            className={classes.grid}
          >
            <Submit
              file={file}
              classes={classes}
              onSelect={this.onSelectHandler}
              submit={this.submissionHandler}
            />
          </Grid>
        </div>
      );
    }
  }
);
