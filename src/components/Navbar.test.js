import React from "react";
import { shallow } from "enzyme";
import Navbar from "./Navbar";

describe("Navbar", () => {

    const navbar = shallow(<Navbar user= {""} />);

    it("should render Navbar", () => {
        expect(navbar).toMatchSnapshot();
    });
});