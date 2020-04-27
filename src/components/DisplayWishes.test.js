import React from "react";
import { shallow } from "enzyme";
import  {Auth , API} from "aws-amplify";
import DisplayWishes from "./DisplayWishes";
import Amplify from "aws-amplify";
import aws_exports from "../aws-exports";

Amplify.configure(aws_exports);


describe("DisplayWishes", () => {
    const displaywishes = shallow(<DisplayWishes/>);

    it("renders properly", () => {
        expect(displaywishes).toMatchSnapshot();
    });
    
    
    
            
});