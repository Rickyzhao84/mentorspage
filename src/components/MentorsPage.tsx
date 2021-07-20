import axios from 'axios';
import React from "react";

interface IMentorsPageProps {
    id: string;
    isOpen: boolean;
    descriptionList: string[];
    nameList: string[];
    profileList: string[];
    currentMentor: any;
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
        }
    }

    public async componentDidMount(): Promise<void> {
        const url = 'https://api.hackillinois.org/upload/blobstore/mentors/';
        try {
            var descriptionList = [];
            var nameList = [];
            var profileList = [];
            const response = await axios.get(url);
            if (response.status === 200) {
                this.setState({id: response.data.id});
                console.log(response.data.data);
                for (var i = 0; i < response.data.data.length; i++) {
                    descriptionList.push(response.data.data[i].description);
                    profileList.push(response.data.data[i].profile);
                    nameList.push(response.data.data[i].firstName + " " + response.data.data[i].lastName); 
                }
                this.setState({descriptionList, nameList, profileList});
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
                {this.state.descriptionList[props.index]}
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
            <div>
                <h5 style={{float: 'left'}}>
                {this.state.profileList.map((item, index) => (
                        <ul>
                            <img alt="profile" src={item} style={{width: "50px", height: "50px"}}></img>
                        </ul>
                    ))}
                </h5>
                <h5 style={{float: "right"}}>
                    {this.state.nameList.map((item, index) => (
                        <div>
                        <button
                        onClick={togglePopup}
                        >
                          {item}{this.state.isOpen && (
                        <this.PopupScreen handleClose={togglePopup} index={index}/>
                      )}
                      </button>
                      
                      </div>
                    ))}
                </h5>
            </div>
        )
    }
}

export default MentorsPage;