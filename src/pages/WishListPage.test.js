import React from "react";
import { shallow } from "enzyme";
import WishListPage from "./WishListPage";

describe("WishListPage", ()=>{
    const wishlistpage = shallow(<WishListPage />);

    it("renders properly", () => {
        expect(wishlistpage).toMatchSnapshot();
    });

   

    
});