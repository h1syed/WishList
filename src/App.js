import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import {Authenticator,AmplifyTheme} from "aws-amplify-react";
import {Auth, Hub} from "aws-amplify"; 
import ProfilePage from './pages/ProfilePage';
import HomePage from "./pages/HomePage";
import WishListPage from "./pages/WishListPage";
import Navbar from "./components/Navbar";
import "element-theme-default";
import '@aws-amplify/ui/dist/style.css';

export const UserContext = React.createContext();

class App extends React.Component{
  state = {
    user: null
  };

  componentDidMount() {
    this.getUserData();
    Hub.listen('auth', this.listener);
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? this.setState({ user }) : this.setState({ user: null })
  }

  listener = (data) => {
    switch(data.payload.event){
      case "signIn":
        console.log("signed in")
        this.getUserData()
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out")
        this.setState({ user: null })
        break;
      default: 
        return;
    }
  }

  handleSignout = async () => {
    try{
      await Auth.signOut();
    } catch(err){
      console.error("Error signing out error", err);
    }
    
  }

  render(){
    const {user} = this.state;
  return !user ? (
    <Authenticator theme={theme} />
   ) : (
    <Router>
      <>
        {/*Navigation*/}
        <Navbar user={user} handleSignout={this.handleSignout}/>

        {/*Routes*/}
        <div className="app-container">
          <Route exact path="/" component={HomePage}/>
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/wishlist" component={WishListPage}/>
        </div>
      </>
    </Router>
   );
  }
}
const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0cb"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor:  "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
};



export default App;
