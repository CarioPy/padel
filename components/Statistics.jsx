import styles from "../styles/Statistics.module.css";
import Image from "next/image";
import React, { Component } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerInfo: {},
    };
  }

  // Retreive player based on its name
  getOrCreatePlayer = async () => {
    const router = Router;
    if (this.state.playerInfo) {
      try {
        let player = await fetch("http://localhost:3000/api/player/find", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.props.props.user.name,
          }),
        });

        let { data } = await player.json();
        this.setState({ playerInfo: data });
      } catch (error) {
        console.log(error);
      }
    } else {
      let new_player_uuid = uuidv4();
      let new_player = await fetch("http://localhost:3000/api/player", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pid: new_player_uuid,
          name: this.props.props.user.name,
          score: 0,
          email: this.props.props.user.email,
        }),
      });

      this.setState({
        playerInfo: {
          pid: new_player_uuid,
          name: this.props.props.user.name,
          score: 0,
          email: this.props.props.user.email,
        },
      });
      router.push("/");
    }
  };
  raiseScore = async () => {
    await fetch("http://localhost:3000/api/player/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: this.state.playerInfo.pid,
        name: this.state.playerInfo.name,
        score: this.state.playerInfo.score + 1,
        email: this.state.playerInfo.email,
      }),
    });
  };

  decreaseScore = async () => {
    await fetch("http://localhost:3000/api/player/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: this.state.playerInfo.pid,
        name: this.state.playerInfo.name,
        score: this.state.playerInfo.score - 1,
        email: this.state.playerInfo.email,
      }),
    });
  };

  render() {
    this.getOrCreatePlayer();
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
          <button onClick={this.decreaseScore}>Score -1</button>
        </div>
      </>
    );
  }
}

export default Statistics;
