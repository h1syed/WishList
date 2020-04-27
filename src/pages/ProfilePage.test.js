import React from "react";
import { shallow } from "enzyme";
import ProfilePage from "./ProfilePage";

describe("ProfilePage", ()=>{
    const profilepage = shallow(<ProfilePage />);

    it("renders properly", () => {
        expect(profilepage).toMatchSnapshot();
    });

   

    
});