import React, {Component} from "react";
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { updateWish } from "../graphql/mutations";

class EditWish extends Component {

    state = {
        show: false,
        id: "",
        wishOwnerId: "",
        wishOwnerUsername: "",
        wishTitle: "",
        wishBody: "",
        wishData: {
             wishTitle: this.props.wishTitle,
             wishBody: this.props.wishBody
        }
    }

    handleModal = () => {
        this.setState({ show: !this.state.show});
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
   }

   handleUpdateWish = async (event) => {
    event.preventDefault();
    const {username} = await Auth.currentUserInfo();
    const input = {
         id: this.props.id,
         wishOwnerId: this.state.wishOwnerId,
         wishOwnerUsername: this.state.wishOwnerUsername,
         wishTitle: this.state.wishData.wishTitle,
         wishBody: this.state.wishData.wishBody

    }

    await API.graphql(graphqlOperation(updateWish, { input },{ owner: username }));

    //force close the modal 
    this.setState({ show: !this.state.show});

}

handleTitle = event => {
    this.setState({
        wishData: {...this.state.wishData, wishTitle: event.target.value}
         
    });
}

handleBody = event => {
    this.setState({ wishData: {...this.state.wishData,
     wishBody: event.target.value}})
}

    componentDidMount = async () => {

        await Auth.currentUserInfo()
            .then(user => {
                 this.setState({
                     wishOwnerId: user.attributes.sub,
                     wishOwnerUsername: user.username 
                 })
            })
         
    }

    render() {
        return (
            <>
                { this.state.show && (
                 <div className="modal">
                      <button className="close"
                         onClick={this.handleModal}>
                          X
                      </button>

                      <form className="add-wish"
                         onSubmit={(event) => this.handleUpdateWish(event)}>

                             <input style={{fontSize: "19px"}}
                                  type="text" placeholder="Title"
                                  name="wishTitle"
                                  value={this.state.wishData.wishTitle}
                                  onChange={this.handleTitle} />

                             <input 
                                style={{height: "150px", fontSize: "19px"}}
                                type="text"
                                name="wishBody"
                                value={this.state.wishData.wishBody}
                                onChange={this.handleBody}
                                />

                             <button className="wish-button">Update Wish</button>


                      </form>

                      
                 </div>
             )
             }


                    
                <button className="wish-button" onClick={this.handleModal}>Edit</button>
            </>
        )
    }
}
export default EditWish;