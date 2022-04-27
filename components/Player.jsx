import styles from "../styles/Player.module.css";
import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
    };
  }

  render() {
    return (
      <>
        <div className={styles.player}></div>
      </>
    );
  }
}

export default Player;
