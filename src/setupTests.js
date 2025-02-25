// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import requestAnimationFrame from './tempPolyfills';
 
import Enzyme,{ configure, shallow, render, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new EnzymeAdapter(), disableLifecycleMethods: true})

global.shallow = shallow;
global.render = render;
global.mount = mount;