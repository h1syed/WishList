import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe("HomePage", ()=>{
    const homepage = shallow(<HomePage />);

    it("renders properly", () => {
        expect(homepage).toMatchSnapshot();
    });

    it("contains a CreateWish Component", () => {
        expect(homepage.find("CreateWish").exists()).toBe(true);
    });

    it("contains a DisplayWishes Component", () => {
        expect(homepage.find("DisplayWishes").exists()).toBe(true);
    });

    
});