import React from 'react';

import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameInput from "../src/components/GameInput";

configure({ adapter: new Adapter() });

function sum(a, b) { return a + b; }

test('Simple test, adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

describe('Testing the handleChange method of the GameInput component', () => {

  it("Test for first selected change", async () => {
    const wrapper = shallow(<GameInput
      pos={1}
      gameData={{}}
      start={false}
      setGameData={() => { }}
      setStatus={() => { }}
    />);

    // 'Pálya méret' select is enabled
    expect(wrapper.find('#net').prop('disabled')).toBeFalsy();
    // 'Játékosok száma' select is disabled
    expect(wrapper.find('#players').prop('disabled')).toBeTruthy();

    // 'Pálya méret' selected change
    wrapper.find('#net').prop('onChange')({ target: { value: "5", id: "net" } }, 1);


    // If change 'Pálya méret', 'Játékosok száma' select is enabled
    expect(wrapper.find('#players').prop('disabled')).toBeFalsy();

  });

  it("Test for second selected change", async () => {
    const wrapper = shallow(<GameInput pos={1} gameData={{}} start={false} setGameData={() => { }} setStatus={() => { }} />);

    // GameInputPlayers component not rendered
    expect(wrapper.find('.gameInputField.data.hidden')).toHaveLength(1);

    // 'Pálya méret' and 'Játékosok száma' select is changed
    wrapper.find('#net').prop('onChange')({ target: { value: "5", id: "net" } }, 1);
    wrapper.find('#players').prop('onChange')({ target: { value: "2", id: "players" } }, 2);

    // If 'Pálya méret' and 'Játékosok száma' select is changed 
    expect(wrapper.find('.gameInputField.data.hidden')).toHaveLength(0);

  });

  it("Test for third input field, one of two names, the' 'Start' button is NOT displayed", async () => {
    const wrapper = shallow(<GameInput pos={1} gameData={{}} start={false} setGameData={() => { }} setStatus={() => { }} />);

    // Start button hidden
    expect(wrapper.find('.gameInputField.data.hidden')).toHaveLength(1);

    // 'Pálya méret' and 'Játékosok száma' select, and names fields is changed
    wrapper.find('#net').prop('onChange')({ target: { value: "5", id: "net" } }, 1);
    wrapper.find('#players').prop('onChange')({ target: { value: "2", id: "players" } }, 2);
    wrapper.find('#players').prop('onChange')({
      target: {
        value: [
          { id: 0, name: 'Kiss Péter', sign: 'O', key: 'b27a9320-0692-4f9e-a29d-cf4a7564007e' },
          { id: 1, name: '', sign: 'X', key: 'ded7309d-b67c-46d8-a696-4c9216e51637' }
        ]
        , id: "data"
      }
    }, 2);

    // The "Start' button is NOT displayed
    expect(wrapper.find('.gameInputField.start.hidden')).toHaveLength(1);

  });

  it("Test third input field, two of two names, the 'Start' button is displayed", async () => {
    const wrapper = shallow(<GameInput pos={1} gameData={{}} start={false} setGameData={() => { }} setStatus={() => { }} />);

    // The 'Start' button is hidden 
    expect(wrapper.find('.gameInputField.data.hidden')).toHaveLength(1);

    // 'Pálya méret' and 'Játékosok száma' select, and names fields is changed
    wrapper.find('#net').prop('onChange')({ target: { value: "5", id: "net" } }, 1);
    wrapper.find('#players').prop('onChange')({ target: { value: "2", id: "players" } }, 2);
    wrapper.find('#players').prop('onChange')({
      target: {
        value: [
          { id: 0, name: 'Kiss Péter', sign: 'O', key: 'b27a9320-0692-4f9e-a29d-cf4a7564007e' },
          { id: 1, name: 'Nagy János', sign: 'X', key: 'ded7309d-b67c-46d8-a696-4c9216e51637' }
        ]
        , id: "data"
      }
    }, 2);

    // The "Start' button is displayed
    expect(wrapper.find('.gameInputField.start.hidden')).toHaveLength(0);

  });


})