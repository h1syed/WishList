import React from "react";
import DisplayWishes from "../components/DisplayWishes";
import CreateWish from "../components/CreateWish";

class HomePage extends React.Component {
  state = {};

  render() {
    return (
    <div className="App">
        <CreateWish />
        <DisplayWishes />
    </div>
    )
  }
}

export default HomePage;