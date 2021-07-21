import axios from 'axios';
import React from "react";

interface IMentorsPageProps {
    id: string;
    isOpen: boolean;
    descriptionList: string[];
    nameList: string[];
    profileList: string[];
    currentMentor: any;
    mentorMap: any;
}

interface IMentorsPageState {}

class MentorsPage extends React.Component< IMentorsPageState, IMentorsPageProps> {
    constructor(props: IMentorsPageProps) {
        super(props);

        this.state = {
            isOpen: false,
            id: "",
            descriptionList: [],
            nameList: [],
            profileList: [],
            currentMentor: "",
            mentorMap: []
        }
    }

    public async componentDidMount(): Promise<void> {
        const url = 'https://api.hackillinois.org/upload/blobstore/mentors/';
        try {
            var descriptionList = [];
            var nameList = [];
            var profileList = [];
            var mentorMap = new Map();
            const response = await axios.get(url);
            if (response.status === 200) {
                this.setState({id: response.data.id});
                console.log(response.data.data);
                for (var i = 0; i < response.data.data.length; i++) {
                    descriptionList.push(response.data.data[i].description);
                    profileList.push(response.data.data[i].profile);
                    nameList.push(response.data.data[i].firstName + " " + response.data.data[i].lastName); 
                }

                this.setState({descriptionList, nameList, profileList, mentorMap});
            }
        } catch (error) {
            console.log(error);
        }
    }

    PopupScreen = (props: {
        handleClose: React.MouseEventHandler<HTMLSpanElement> | undefined;
        index: number;
      }) => {
        console.log(props.index)
        return (
          <div className="popup-box">
            <div className="box">
              <span className="close-icon" onClick={props.handleClose}>
                x
              </span>
              <div style={{ textAlign: "center" }}>
                {this.state.descriptionList[this.state.currentMentor]}
              </div>
            </div>
          </div>
        );
      };

    getCurrentMentor(index: number) {
        this.setState({currentMentor: index })
    }
    

    render(): React.ReactNode {
        const togglePopup = () => {
            this.setState({ isOpen: !this.state.isOpen });
          };
        return (
            <div className="footer-icons">
              <span>
                <h5 className="footer-twitter">
                {this.state.profileList.map((item, index) => (
                        <ul>
                            <img alt="profile" src={item} style={{width: "50px", height: "50px"}}></img>
                        </ul>
                    ))}
                </h5>
                </span>
                <span>
                <h5>
                    {this.state.nameList.map((item, index) => (
                        <div>
                        <button
                        onClick={() => {
                          togglePopup()
                          this.getCurrentMentor(index)
                        }}
                        ><h3 className="footer-fb">
                          {item}{this.state.isOpen && (
                        <this.PopupScreen handleClose={togglePopup} index={index}/>
                      )}
                      </h3>
                      </button>
                      
                      </div>
                    ))}
                </h5>
                </span>
                <div><h3>
                  
                  </h3>
                </div>
            </div>
        )
    }
}

export default MentorsPage;