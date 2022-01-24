import React from "react";
import Root from "../Root";
import renderer from "react-test-renderer";
import { configureStoreProd, history } from "../../../redux/configureStore";

//*******************************************************************************************************
describe(">>>Root --- mock store and mock App", () => {
    
  let store = configureStoreProd({});

  let wrapper = renderer.create(<Root history={history} store={store}/>);

  it("+++ render the component App: sleep page. No any modals", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

//*******************************************************************************************************
