### Games Info

Every game follows the template below, however since each game is unique some features like scroll listeners or audio might be stripped away.

All games were created as Classes originally, but eventually refactored into functional components to use React Hooks in 2019.

### Feeling Creative?

If you want to try and create a game, do the following first:

- Create a `GameName.js`, `GameName.css` and an `index.js` in a new folder `GameName` in the `src/components/games` folder
  -- in your `index.js` add `export { default } from './GameName'`
  -- paste the template below in your `GameName.js` file
  -- you can now start to change the template around to fix your game idea
- Import your games folder in the `src/helpers/gamesInfo` file
- Add your game info object at the end of the array
  -- Just copy and edited a past game object to begin
- `npm start`
- Navigate to `http://localhost:3000/game/GameName/start`
- Code

### Game Template

```jsx
import React, { useCallback } from "react";
import shuffle from "lodash/shuffle";
// import classNames from "classnames";
// import {useSpring} from "react-spring"
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import useData from "hooks/useData";
import useKeys from "hooks/useKeys";
import useAudio from "hooks/useAudio";
import useScroll from "hooks/useScroll";
import useFitText from "hooks/useFitText";
import useFirstRun from "hooks/useFirstRun";
import useSplit2Rows from "hooks/useSplit2Rows";
import useHandleGame from "hooks/useHandleGame";
import useDocumentTitle from "hooks/useDocumentTitle";
import { googleEvent } from "helpers/ga";
import {
  nextRoundData,
  arrOfRandoNum,
  changeIsVocab,
  getRandoNum,
} from "helpers/gameUtils";
import FitText from "@Reusable/FitText";
// import helpers here
// import CSS here

// CONSTANT VARIABLES - specific to the game

const init = data => ({
  data: shuffle(data),
  isVocab: true,
});

function reducer(state, action) {
  const { type, data, isVocab } = action;
  switch (type) {
    case "Set_Data":
      return { ...state, data: shuffle(data) };
    case "Change_isVocab":
      return changeIsVocab(isVocab, state);
    // add other conditions here
    default:
      return state;
  }
}

export default function Template(props) {
  // PROPS - remove unused variable below
  const { title, isMenuOpen, font, vocabulary, expressions, colors } = props;
  useDocumentTitle(`Playing - ${title} - ESL in the ROK`);
  const isFirstRun = useFirstRun();

  // AUDIO - delete if there's no audio used in the game
  const [audioRef, resetFunc] = useAudio(url, shouldLoop);

  // STATE - set vocabulary, expressions or both below
  const [state, dispatch, didUpdate] = useData(reducer, init, vocabulary, expressions);
  const { data } = state;
  const [refs] = useFitText(gameData.length, gameData, font, false);

  // HANDLE GAME - add dependencies as needed
  const handleGame = useCallback(() => {
    console.log("new round");
    googleEvent(title);
  }, []);
  useHandleGame(handleGame, didUpdate);

  // EVENT HANDLERS - add dependencies as needed
  // GAME SPECIFIC KEY EVENTS
  const keysCB = useCallback(
    ({ keyCode }) => {
      console.log("game specific key events");
    },
    [dispatch]
  );
  useKeys(isMenuOpen, handleGame, keysCB);

  // GAME SPECIFIC SCROLL EVENTS
  const scrollCB = useCallback(
    scrolledUp => {
      console.log("game specific scroll events");
    },
    [dispatch]
  );
  useScroll(isMenuOpen, scrollCB);

  // USE EFFECTS HERE

  // GAME FUNCTIONS HERE - should start with a single underscore _func()

  // CLASSES

  return (
    // REMEMBER TO PASS FONT TO THE CONTAINER STYLING
    <div onClick={handleGame}>
      <p>{title} Template</p>
    </div>
  );
}

// INNER COMPONENTS HERE

// OTHER FUNCTIONS HERE - should start with a double underscore __func()
```
