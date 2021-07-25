import axios from 'axios';
import React from "react";
import { DefaultButton } from '@fluentui/react/lib/Button'
import { SearchBox, ISearchBoxStyles } from "@fluentui/react/lib/SearchBox";

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
          <div id="profile">
            <SearchBoxGroups></SearchBoxGroups>
            <div className="profileList" >
              <span>
                <h5>
                {this.state.profileList.map((item, index) => (
                    <ul>
                      <img alt="profile" src={item} style={{width: "100px", height: "100px"}}></img>
                    </ul>
                ))}
                </h5>
              </span>
            </div>
            <span>
              <h5>
                {this.state.nameList.map((item, index) => (
                  <div>
                    <DefaultButton
                      className="leftList"
                      style={{marginBottom:"60px", top: "40px"}}
                      styles={{
                      root: {
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "25px",
                      },
                      }}
                      onClick={() => {
                        togglePopup()
                        this.getCurrentMentor(index)
                      }}>
                      <h3>
                        {item}
                        {this.state.isOpen && (<this.PopupScreen handleClose={togglePopup} index={index}/>)}
                      </h3>
                    </DefaultButton>
                  </div>
                  ))}
              </h5>
            </span>
          </div>
        )
    }
}

const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: { width: 300, height: 30, borderRadius: "25%" },
};

function filterFunction() {
  let filter, table, tr, td, i, txtValue;
  const input = document.getElementById("input");
  if (input !== null) {
    filter = (input as HTMLInputElement).value.toUpperCase();
    table = document.getElementById("profile");
    if (table !== null) {
      tr = table.getElementsByTagName("span");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("h3")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(tr[i])
            tr[i].style.display="";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
}

export const SearchBoxGroups = () => (
  <SearchBox
    id="input"
    styles={searchBoxStyles}
    placeholder="Search"
    onClear={() => filterFunction()}
    onChange={() => filterFunction()}
  />
);

export default MentorsPage;