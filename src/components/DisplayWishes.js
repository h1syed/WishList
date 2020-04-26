import React, {Component} from "react";
import { listWishs } from "../graphql/queries";
import { API, graphqlOperation, Auth } from "aws-amplify";
import DeleteWish from "./DeleteWish";
import EditWish from "./EditWish";
import {onCreateWish, onDeleteWish, onUpdateWish, onCreateLike} from "../graphql/subscriptions";
import {FaThumbsUp, FaSadTear} from "react-icons/fa"
import {createLike} from "../graphql/mutations";
import UsersWhoLikedWish from "./UsersWhoLikedWish";

class DisplayWishes extends Component {

    state = {
        ownerId:"",
        ownerUsername:"",
        errorMessage: "",
        wishLikedBy: [],
        isHovering: false,
        wishes:[]
    }

    componentDidMount = async () => {
        this.getWishes()

        await Auth.currentUserInfo()
            .then(user => {
                this.setState(
                    {
                        ownerId: user.attributes.sub,
                        ownerUsername: user.username,
                    }
                )
            });

        this.createWishListener = API.graphql(graphqlOperation(onCreateWish,{owner: await Auth.currentAuthenticatedUser()}))
             .subscribe({
                 next: wishData => {
                      const newWish = wishData.value.data.onCreateWish;
                      const prevWishes = this.state.wishes.filter( wish => wish.id !== newWish.id);

                      const updatedWishes = [newWish, ...prevWishes];

                      this.setState({ wishes: updatedWishes});
                 }
             });

             this.deleteWishListener = API.graphql(graphqlOperation(onDeleteWish,{owner: await Auth.currentAuthenticatedUser()}))
                .subscribe({
                     next: wishData => {
                           
                        const deletedWish = wishData.value.data.onDeleteWish;
                        const updatedWishes = this.state.wishes.filter(wish => wish.id !== deletedWish.id);
                        this.setState({wishes: updatedWishes});
                     }
                });

                this.updateWishListener = API.graphql(graphqlOperation(onUpdateWish,{owner: await Auth.currentAuthenticatedUser()}))
                .subscribe({
                     next: wishData => {
                          const { wishes } = this.state;
                          const updateWish = wishData.value.data.onUpdateWish;
                          const index = wishes.findIndex(wish => wish.id === updateWish.id);
                          const updateWishes = [
                              ...wishes.slice(0, index),
                             updateWish,
                             ...wishes.slice(index + 1)
                            ];

                            this.setState({ wishes: updateWishes});

                     }
                });

                this.createWishLikeListener = API.graphql(graphqlOperation(onCreateLike,{owner: await Auth.currentAuthenticatedUser()}))
                    .subscribe({
                         next: wishData => {
                              const createdLike = wishData.value.data.onCreateLike;

                              let wishes = [...this.state.wishes];
                              for (let wish of wishes ) {
                                   if (createdLike.wish.id === wish.id) {
                                        wish.likes.items.push(createdLike);
                                   }
                              }
                              this.setState({ wishes });
                              
                         }
                    });
    }

    componentWillUnmount(){
        this.createWishListener.unsubscribe();
        this.deleteWishListener.unsubscribe();
        this.updateWishListener.unsubscribe();
        this.createWishLikeListener.unsubscribe();
    }

    getWishes = async () => {
        const result = await API.graphql(graphqlOperation(listWishs));
        this.setState({ wishes: result.data.listWishs.items});
    }

    likedWish = (wishId) =>  {
         
        for (let wish of this.state.wishes) {
              if ( wish.id === wishId ) {
                   if ( wish.wishOwnerId === this.state.ownerId) return true;
                    for (let like of wish.likes.items) {
                         if (like.likeOwnerId === this.state.ownerId) {
                             return true;
                         }
                    }
              }
        }
        return false;
    }

    handleLike = async wishId => {
        if (this.likedWish(wishId)) {return this.setState({errorMessage: "Can't Like Your Own Wish."})} else {
           const input = {
               numberLikes: 1,
               likeOwnerId: this.state.ownerId,
               likeOwnerUsername: this.state.ownerUsername,
               likeWishId: wishId
          }
          
          try {
             const result =  await API.graphql(graphqlOperation(createLike, { input }))
  
              console.log("Liked: ", result.data);
              
          }catch(error) {
               console.error(error);
               
          }
        }
      
   }

   handleMouseHover = async wishId => {
    this.setState({isHovering: !this.state.isHovering})

    let innerLikes = this.state.wishLikedBy

    for (let wish of this.state.wishes) {
         if (wish.id === wishId) {
              for ( let like of wish.likes.items) {
                    innerLikes.push(like.likeOwnerUsername)
              }
         }

         this.setState({wishLikedBy: innerLikes})


    }

     console.log("Wish liked by: ", this.state.wishLikedBy);
     


}

handleMouseHoverLeave = async () => {
       this.setState({isHovering: !this.state.isHovering});
       this.setState({wishLikedBy: []});
}

    render() {
        const { wishes } = this.state;

        let loggedInUser = this.state.ownerId;

        return wishes.map((wish) => {
            return (
                <div className="wishes" style={rowStyle}  key={wish.id}>
                    <h1>{ wish.wishTitle }</h1>
                    <span style={{ fontStyle: "italic", color: "#0ca5e297"  }}>
                    { "Wrote by: " } { wish.wishOwnerUsername}
                        { " on "} 
                        <time style={{ fontStyle: "italic" }}>
                        {new Date(wish.createdAt).toDateString()}
                        </time>
                    </span>
                    <p> {wish.wishBody} </p>
                    <br/>
                    <span>
                        {wish.wishOwnerId === loggedInUser &&
                             <DeleteWish data={wish}/>
                        }
                            
                         {wish.wishOwnerId === loggedInUser &&
                             <EditWish {...wish}/>
                         }
                        
                            
                        
                        
                        <span>
                             <p className="alert">{ wish.wishOwnerId === loggedInUser && this.state.errorMessage}</p>
                             <p onMouseEnter={ () => this.handleMouseHover(wish.id)}
                                 onMouseLeave={ () => this.handleMouseHoverLeave()}
                                 onClick={() => this.handleLike(wish.id)}
                                  style={{color: (wish.likes.items.length > 0) ? "blue": "gray"}}
                                 className="like-button"> 
                                <FaThumbsUp /> 
                               {wish.likes.items.length}
                             </p>
                             {
                                  this.state.isHovering &&
                                    <div className="users-liked">
                                         {this.state.wishLikedBy.length === 0 ? 
                                               " Liked by No one " : "Liked by: " }
                                         {this.state.wishLikedBy.length === 0 ? <FaSadTear /> : <UsersWhoLikedWish data={this.state.wishLikedBy} /> }

                                    </div>
                             }
                         </span>
                    </span>
                </div>
            )
        })
    }
}
const rowStyle = {
    background: '#f4f4f4',
    padding: '10px',
    border: '1px #ccc dotted',
    margin: '14px'
}
export default DisplayWishes;