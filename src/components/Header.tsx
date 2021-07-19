import React from "react";
import { Link } from "react-router-dom";

interface IContentState {
  bookContent?: {};
}

interface IHeaderState {
  contentHeight: string;
  currentButton: number;
}

interface IHeaderProps {

}

class Header extends React.Component<IHeaderProps, IHeaderState> {

  constructor(props: IHeaderState) {
    super(props);
    this.state = {
      contentHeight: "92vh",
      currentButton: -10,
    };
  }

  //        <button style={{border:'none'}} onClick={this.handleMyName}>my-name</button>

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
    console.log("Header.render");
    
    return (
        <table style={{ width: "100%" }}>
          <tbody style={{ width: "100%" }}>
            <tr>
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
                  style={this.linkStyle(2)}
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
                  style={this.linkStyle(3)}
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
        marginRight: "2.3em", //"15px",
        fontSize: "20px",
        textDecoration: "underline solid grey",
        textDecorationThickness: "10px",
        textUnderlinePosition: "under",
        color: "black",
      };
    } else return { marginRight: "2.3em", color: "black" };
  }

  public componentDidMount(): void {
    console.log("Header componentDidMount");
  }
}

export default Header;
