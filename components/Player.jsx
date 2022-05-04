import styles from "../styles/Player.module.css";
import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      research: "",
      player: {},
    };
  }

  handleChange = (e) => {
    this.setState({ research: e.target.value });
  };

  research = async (e) => {
    try {
      let players = await fetch("/api/player/find_name", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.research,
        }),
      });

      let new_player = await players.json();

      if (new_player.data) {
        this.setState({ player: new_player.data });
        this.props.parentCallBack(new_player.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        {!this.state.player.name && (
          <div className={styles.player}>
            <input
              className={styles.input}
              placeholder="Choose Player"
              onChange={this.handleChange}
            ></input>
            <button onClick={this.research}>OK</button>
          </div>
        )}
        {this.state.player.name && (
          <div className={styles.playerValidated}>
            <h1 className={styles.playerScore}>{this.state.player.score}</h1>
            <h3 className={styles.playerName}>{this.state.player.name}</h3>
          </div>
        )}
      </>
    );
  }
}

export default Player;
