import React from "react";
import { Link } from "react-router-dom";
import logo from "../Hackillinoislogo.png";

interface IHeaderState {
  contentHeight: string;
  currentButton: number;
}

interface IHeaderProps {}

class Header extends React.Component<IHeaderProps, IHeaderState> {

  constructor(props: IHeaderState) {
    super(props);
    this.state = {
      contentHeight: "92vh",
      currentButton: -10,
    };
  }

  handleHome = () => {
    this.setState({ currentButton: -1 });
    this.linkStyle(-1);
  };

  handleMentors = () => {
    this.setState({ currentButton: 0 });
    this.linkStyle(0);
  };
  handlePrizes = () => {
    this.setState({ currentButton: 1 });
    this.linkStyle(1);
  };
  handleSchedule = () => {
    this.setState({ currentButton: 2 });
    this.linkStyle(2);
  };

  render(): React.ReactNode {
    return (
        <table style={{ width: "100%" }}>
          <tbody style={{ width: "100%" }}>
            <tr>
              <td style={{ verticalAlign: "middle", width: "80px" }}>
                  <img
                    alt="HackIllinoisLogo"
                    src={logo}
                    style={{width: "80px", height: "80px"}}
                  />
              </td>
              <td
                style={{
                  verticalAlign: "middle",
                  width: "550px",
                  overflow: "hidden",
                }}
              >
                <Link
                  style={this.linkStyle(-1)}
                  to="./"
                  onClick={this.handleHome}
                >
                  Home
                </Link>
                <Link
                  style={this.linkStyle(0)}
                  to="./mentors"
                  onClick={this.handleMentors}
                >
                  Mentors
                </Link>
                <Link
                  style={this.linkStyle(1)}
                  to="./prizes"
                  onClick={this.handlePrizes}
                >
                  Prizes
                </Link>
                <Link
                  style={this.linkStyle(2)}
                  to="./schedule"
                  onClick={this.handleSchedule}
                >
                  Schedule
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
  
  private linkStyle(buttonIdx: number) {
    if (buttonIdx === this.state.currentButton) {
      return {
        marginRight: "2.3em",
        fontSize: "20px",
        textDecoration: "underline solid grey",
        textDecorationThickness: "10px",
        textUnderlinePosition: "under",
        color: "white",
      };
    } else return { marginRight: "2.3em", color: "white" };
  }

  public componentDidMount(): void {
    console.log("Header componentDidMount");
  }
}

export default Header;
