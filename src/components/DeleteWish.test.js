import React, { Component } from "react";
import { shallow } from "enzyme";
import DeleteWish from "./DeleteWish";
import {API} from "aws-amplify";

describe("Delete wish component", () => {
    it("renders properly", () => {
        const wrapper = shallow(<DeleteWish/>);
        expect(wrapper).toMatchSnapshot();
    });

    describe("Delete button" , () => {
        it("should call handleDeleteWish on click", async () => {
            const mockWish = {
                id: "123"
            }
            const wrapper = shallow(<DeleteWish data = {mockWish}/>);
            const spy = jest.spyOn(wrapper.instance(), "handleDeleteWish");
            const spy1 = jest.spyOn(API, "graphql").mockReturnValue(Promise.resolve());            
            wrapper.find({ className: "wish-button"}).simulate("click");
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(mockWish.id);
            spy.mockRestore();
        });
    });
});