import React, { Component } from "react";
import { shallow } from "enzyme";
import { API, Auth } from "aws-amplify";
import EditWish from "./EditWish";

describe("Edit wish component", () => {
    it("renders properly", () => {
        const wrapper = shallow(<EditWish/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("componentDidMount" , async () => {
        const wish = {
            wishTitle: "",
            wishBody: ""
        }
        const wrapper = shallow(<EditWish {...wish}/>);
        const instance = wrapper.instance();
        const user = {
            attributes: {
                sub: "123"
            },
            username: "Bob"
        }
        const spy = jest.spyOn(Auth, "currentUserInfo").mockReturnValue(Promise.resolve(user));
        await instance.componentDidMount();
        expect(instance.state).toEqual({
            show: false,
            id: "",
            wishOwnerId: "123",
            wishOwnerUsername: "Bob",
            wishTitle: "",
            wishBody: "",
            wishData: {
                wishTitle: "",
                wishBody: ""
           }
        });
        spy.mockRestore();
    });

describe("modal", () => {
    it("close button calls handleModal onClick", () => {
        const wrapper = shallow(<EditWish/>).setState({show: true});
        const spy = jest.spyOn(wrapper.instance(), "handleModal");
        wrapper.instance().forceUpdate()
        wrapper.find({ className: "close"}).simulate("click");
        expect(spy).toHaveBeenCalledTimes(1);
        expect(wrapper.instance().state.show).toBe(false);
        spy.mockRestore();
    });
});

describe("form", () => {


    it("calls handleUpdateWish onSubmit when change is submitted", async () => {
        const wrapper = shallow(<EditWish/>).setState({show: true});
        const mockPreventDefault = jest.fn();
        const spy = jest.spyOn(wrapper.instance(), "handleUpdateWish");
        const spy1 = jest.spyOn(Auth, "currentUserInfo").mockReturnValue(Promise.resolve(""))
        const spy2 = jest.spyOn(API, "graphql").mockReturnValue(Promise.resolve());
        wrapper.instance().forceUpdate();
        const mockEvent = {
            preventDefault: mockPreventDefault
        }
        wrapper.find({ className: "add-wish"}).simulate("submit", mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
        spy.mockRestore();
        spy1.mockRestore();
        wrapper.setState({ show: false});
    });

    it("calls handleTitle onChange of input for wishTitle", () => {    
        const wrapper = shallow(<EditWish/>).setState({ show: true });
        const spy = jest.spyOn(wrapper.instance(), "handleTitle");
        wrapper.instance().forceUpdate();
       const mockEvent= {
            target: {
                name: "wishTitle",
                value: "This is my new wish"
            }
        }
        wrapper.find({ name: "wishTitle"}).simulate("change",mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
        wrapper.setState({ show: false });
        spy.mockRestore();
    });

    it("calls handleBody onChange of input for wishBody", () => {
        const wrapper = shallow(<EditWish/>).setState({ show: true });
        const spy = jest.spyOn(wrapper.instance(), "handleBody");
        wrapper.instance().forceUpdate();
        const mockEvent = {
            target: {
                value: "This is an event"
            }
        }
        wrapper.find({ name: "wishBody"}).simulate("change", mockEvent);
        expect(spy).toHaveBeenCalledWith(mockEvent);
        wrapper.setState({ show: false });
        spy.mockRestore();
    });
});
});