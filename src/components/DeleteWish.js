import React, {Component} from "react";
import { deleteWish } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

class DeleteWish extends Component {

    handleDeleteWish = async wishId => {
        const input = {
            id: wishId
       }

       await API.graphql(graphqlOperation(deleteWish, {input}));
    }

    render() {
        const wish  = this.props.data;
        return(
            <button className="wish-button" onClick={() => this.handleDeleteWish(wish.id)}>Delete</button>
        )
    }
}
export default DeleteWish;