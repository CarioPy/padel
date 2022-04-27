import styles from "../styles/Player.module.css";
import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: { name: "" },
    };
  }

  render() {
    return (
      <>
        <div className={styles.player}>
          {!this.state.player.name{
          <input className={styles.input} placeholder="Choose Player"></input>}}
        </div>
      </>
    );
  }
}

export default Player;
