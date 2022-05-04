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
      today_date: new Date().toISOString().slice(0, 10),
      allmatches: [],
    };
  }

  // Retreive player based on its name
  getOrCreatePlayer = async () => {
    const router = Router;
    console.log(this.props.props.user);
    if (this.state.playerInfo) {
      try {
        let player = await fetch("/api/player/find", {
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
      let new_player = await fetch("/api/player", {
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

  fetchMatch = async () => {
    const matches = await fetch("/api/match/findall", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pid: this.state.playerInfo.pid }),
    });
    const { data } = await matches.json();
    this.setState({ allmatches: data });
  };

  render() {
    this.getOrCreatePlayer();
    this.fetchMatch();
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
          <h4>{this.state.today_date}</h4>
          <div className={styles.matchTableContainer}>
            <table className={styles.matchTable}>
              <thead>
                <tr>
                  <td>Match Played</td>
                </tr>
              </thead>
              {this.state.allmatches.map((match) => {
                return (
                  <tbody key={match.mid}>
                    <tr>
                      <td>
                        {match.score_teamA}:{match.score_teamB}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Statistics;
