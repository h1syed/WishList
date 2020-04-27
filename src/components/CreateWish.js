import React, {Component} from "react";
import { API, graphqlOperation,Auth } from "aws-amplify";
import { createWish } from "../graphql/mutations";

class CreateWish extends Component {
  

       state = {
        wishOwnerId: "",
        wishOwnerUsername: "",
        wishTitle: "",
        wishBody: ""
    };
   
    

    componentDidMount = async () => {
        await Auth.currentUserInfo()
        .then(user => {
            this.setState({
                  wishOwnerId: user.attributes.sub,
                  wishOwnerUsername: user.username
            });
        });
    }

    handleChangeWish = event => this.setState({
        [event.target.name] : event.target.value 
        });

    handleAddWish = async event => {
        event.preventDefault();
        const input = {
             wishOwnerId: this.state.wishOwnerId,
             wishOwnerUsername: this.state.wishOwnerUsername,
             wishTitle: this.state.wishTitle,
             wishBody: this.state.wishBody,
             createdAt: new Date().toISOString()
        }

        await API.graphql(graphqlOperation(createWish, { input }));

        this.setState({ wishTitle: "", wishBody: ""})


   }

    render() { 
        return(
            <form className="add-wish" onSubmit={this.handleAddWish}>
                <input style={{ font: '19px'}} 
                  type="text" 
                  placeholder="New Wish"
                  name="wishTitle"
                  required
                  value={this.state.wishTitle}
                  onChange={this.handleChangeWish}
                  />

                <textarea 
                  type="text"
                  name="wishBody"
                  rows="3"
                  cols="40"
                  required
                  placeholder="Description"
                  value={this.state.wishBody}
                  onChange={this.handleChangeWish}
                  />

                <input  type="submit"
                  className="btn"
                  style={{ fontSize: '19px'}}/>
            </form>
        )
    }
}

export default CreateWish;