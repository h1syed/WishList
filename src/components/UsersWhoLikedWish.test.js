import React from "react";
import { shallow, mount  } from "enzyme";
import UsersWhoLikedWish from "./UsersWhoLikedWish";

describe("UsersWhoLikedWish", () => {
    const userswholikedwish = shallow(<UsersWhoLikedWish data={[""]} />);

    it("renders properly", () => {
        expect(userswholikedwish).toMatchSnapshot();
    });
});