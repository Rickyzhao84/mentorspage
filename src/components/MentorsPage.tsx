import axios from 'axios';
import React from "react";

interface IMentorsPageProps {
    id: string;
    descriptionList: string[];
    nameList: string[];
}

interface IMentorsPageState {}

class MentorsPage extends React.Component< IMentorsPageState, IMentorsPageProps> {
    constructor(props: IMentorsPageProps) {
        super(props);

        this.state = {
            id: "",
            descriptionList: [],
            nameList: [],
        }
    }

    public async componentDidMount(): Promise<void> {
        const url = 'https://api.hackillinois.org/upload/blobstore/mentors/';
        try {
            var descriptionList = [];
            var nameList = [];
            const response = await axios.get(url);
            if (response.status === 200) {
                this.setState({id: response.data.id});
                console.log(response.data.data);
                for (var i = 0; i < response.data.data.length; i++) {
                    descriptionList.push(response.data.data[i].description);
                    nameList.push(response.data.data[i].firstName + " " + response.data.data[i].lastName); 
                }
                this.setState({descriptionList, nameList});
            }
        } catch (error) {
            console.log(error);
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <h5>
                    {this.state.nameList.map((item, index) => (
                        <ul>
                            {item}
                        </ul>
                    ))}
                </h5>
            </div>
        )
    }
}

export default MentorsPage;