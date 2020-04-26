import React, { Component } from "react";
import {shallow} from "enzyme";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import { Auth, Hub } from "aws-amplify";
import App from "./App";

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

describe("App", () => {
    const app = shallow(<App/>)

    it("renders without crashing", () => {
      expect(app).toMatchSnapshot();
    });

    it("initializes the 'state' with user equaling null", () => {
     expect (app.state().user).toEqual(null);
    });

    describe("listener method" , () => {
      it("calls getUserData when user is signed in", () => {
        const instance = app.instance();
        const data = {
          payload:{
            event: "signIn"
          }
        };
        const spy = jest.spyOn(instance, "getUserData").mockReturnValue(true);
        instance.listener(data);
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
      });

      it("signUp test when user signs up", () => {
        const instance = app.instance();
        console.log = jest.fn();
        const data = {
          payload: {
            event: "signUp"
          }
        };
        instance.listener(data);
        expect(console.log).toHaveBeenCalledWith("signed up");
      });

      it("signOut test when user is signed in", () => {
        const instance = app.instance();
        instance.setState({ user: "Bob" });
          const data = {
            payload: {
              event: "signOut"
            }
          };
        instance.listener(data);
        expect(instance.state.user).toBe(null);
      });

      it("default test", () => {
        const instance = app.instance();
          const data = {
            payload: {
              event: ""
            }
          };
        const result = instance.listener(data);
        expect(result).toBeUndefined();
      });
    });

   

	describe("Authenticator component when user is not signed in", ()=> {
		it("renders a sign up page with authentication", () => {
			expect(app.find("Authenticator").length).toEqual(1);
    });
  });
    
    describe("After user signs in and is Authenticated", () => {
      it("renders a navbar with signOut", () => {
        app.setState({ user: true });
        expect(app.find("Navbar").length).toEqual(1);
        app.setState({ user: null });
      });
    });

    it("componentDidMount", async () => {
      const instance = app.instance();
      const spy = jest.spyOn(instance, "getUserData");
      const spy1 = jest.spyOn(Auth, "currentAuthenticatedUser").mockReturnValue(Promise.resolve(true));
      await instance.componentDidMount();
      expect(instance.getUserData).toHaveBeenCalledTimes(1);
      expect(instance.state.user).toBe(true);
      spy.mockRestore();
      spy1.mockRestore();
    });
	
    
 
    it("handleSignout with no error", async () => {
      const instance = app.instance();
      const spy = jest.spyOn(Auth, "signOut").mockReturnValue(Promise.resolve());
      await instance.handleSignout();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("handleSignout with an error", async () => {
      const instance = app.instance();
      console.error = jest.fn();
      const spy = jest.spyOn(Auth, "signOut").mockImplementation(() => {
        throw new Error();
      });
      await instance.handleSignout();
      expect(console.error).toHaveBeenCalledWith("Error signing out error", new Error());
    });

 
  it("getUserData when promise is rejected", async () => {
    const instance = app.instance();
    instance.setState({ user: true });
    const spy = jest.spyOn(Auth, "currentAuthenticatedUser").mockReturnValue(false);
    await instance.getUserData();
    expect(instance.state.user).toBe(null);
  });

  
});



