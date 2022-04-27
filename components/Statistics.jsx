import styles from "../styles/Statistics.module.css";
import Image from "next/image";
import React, { Component } from "react";
import Link from "next/link";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInfo: {},
    };
  }

  // Retreive player based on its name
  getPlayer = async () => {
    try {
      let players = await fetch("http://localhost:3000/api/player", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let { data } = await players.json();
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === this.props.props.user.name) {
          this.setState({ playerInfo: data[i] });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Create Player function

  createPlayer = async () => {
    let new_player = await fetch("http://localhost:3000/api/player", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.props.props.user.name,
        email: this.props.props.user.email,
        score: 0,
      }),
    });

    this.setState({
      playerInfo: {
        name: this.props.props.user.name,
        email: this.props.props.user.email,
        score: 0,
      },
    });
  };

  raiseScore = async () => {
    let update_player = await fetch("http://localhost:3000/api/player/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.playerInfo.name,
        email: this.props.props.user.email,
        score: this.state.playerInfo.score + 1,
      }),
    });
  };

  render() {
    this.getPlayer();
    if (!this.state.playerInfo.name) {
      this.createPlayer();
    }

    return (
      <>
        <h4 className={styles.title}>Statistics</h4>
        <div className={styles.dashboardContainer}>
          <div className={styles.horizontalTopContainer}>
            <Image
              className={styles.player_pic}
              src={this.props.props.user.image}
              width={80}
              height={80}
            ></Image>
            <div className={styles.player_name}>
              {this.state.playerInfo.name}
            </div>
            <Link href="/profile/zero">
              <div className={styles.player_score}>
                {this.state.playerInfo.score}
              </div>
            </Link>
          </div>
          <button onClick={this.raiseScore}>Score +1</button>
        </div>
      </>
    );
  }
}

export default Statistics;
