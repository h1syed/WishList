import React from "react";
import { shallow } from "enzyme";
import CreateWish from "./CreateWish";
import { API, Auth } from "aws-amplify";


describe("Create wish component", () => {
    const createwish = shallow(<CreateWish/>);

    it("renders properly", () => {
        expect(createwish).toMatchSnapshot();
    });

    it("renders a wish title input text area", () => {
        expect(shallow(<CreateWish/>).find({name: "wishTitle"}).length).toEqual(1);
    });
   
    it("renders a wish body input text area", () => {
        expect(shallow(<CreateWish/>).find({name: "wishBody"}).length).toEqual(1);
    });

    it("renders a submit button", () => {
        expect(shallow(<CreateWish/>).find({className: "btn"}).length).toEqual(1);
    });
    
    describe("wish title input", () => {
        it("should respond to change event and change the state of the create wish component", () => {
            const wrapper = shallow(<CreateWish/>);
            wrapper.find({name: "wishTitle"}).simulate('change', {target:{name: "wishTitle", value: "This is my wish"} });
            expect(wrapper.state("wishTitle")).toEqual("This is my wish");
        });
    });

    describe("wish body input", () => {
        it("should respond to the change event and change state of the create wish component", ()=> {
            const wrapper = shallow(<CreateWish/>);
            wrapper.find({name: "wishBody"}).simulate('change', {target: {name: "wishBody", value: "This is the wish body"}});
            expect(wrapper.state("wishBody")).toEqual("This is the wish body");
        });
    });

    describe("form" , () => {
        it("should call handleAddWish on submit", async () => {
          const wrapper = shallow(<CreateWish/>);
            const mockPreventDefault = jest.fn();
            const spy = jest.spyOn(wrapper.instance(), "handleAddWish");
            const spy1 = jest.spyOn(API, "graphql").mockReturnValue(Promise.resolve());
            wrapper.instance().forceUpdate();
            const mockEvent = {
                preventDefault: mockPreventDefault
            }
            wrapper.find({ className: "add-wish"}).simulate("submit", mockEvent);
            expect(spy).toHaveBeenCalledWith(mockEvent);
            spy.mockRestore();
        });
    });

    it("componentDidMount", async () => {
        const wrapper = shallow(<CreateWish/>);
        const instance = wrapper.instance();
        const user = {
            attributes:  {
                sub: "123"
            },
            username: "Bob"
        };
        const spy = jest.spyOn(Auth, "currentUserInfo").mockReturnValue(Promise.resolve(user));
        await instance.componentDidMount();
        expect(instance.state).toEqual({
            wishBody: "",
            wishOwnerId: "123",
            wishOwnerUsername: "Bob",
            wishTitle: ""
        });
        spy.mockRestore();
      });

   
});