import React from 'react';

import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameInputPlayers from "../src/components/GameInputPlayers";

configure({ adapter: new Adapter() });

function sum(a, b) { return a - b; }

test('Simple test, adds 1 - 2 to equal -1', () => {
  expect(sum(1, 2)).toBe(-1);
});

describe('Testing the useEffect of the GameInputPlayers component', () => {

  let wrapper;
  let useEffect;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };

  const props = {
    handleChange: () => { },
    position: 1,
    players: 2,
    data: [
      { id: 0, name: 'Kiss Péter', sign: 'O', key: 'b27a9320-0692-4f9e-a29d-cf4a7564007e' },
      { id: 1, name: 'Nagy', sign: 'X', key: 'ded7309d-b67c-46d8-a696-4c9216e51637' }
    ]
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect");
    wrapper = shallow(<GameInputPlayers {...props} />);
    mockUseEffect();
  });

  it("Change players props, renders 2 instead of 4 fields", async () => {

    // Change players props to 4 
    wrapper.setProps({ players: 4 });

    // If change 'Pálya méret', 'Játékosok száma' select is enabled
    expect(wrapper.find('.playersData')).toHaveLength(4);

  });

});