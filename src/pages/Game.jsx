import { useEffect, useState } from "react";
import ScoreBoard from "../components/ScoreBoard";
import java from "../images/java.png";
import vue from "../images/vue.png";
import swift from "../images/swift.png";
import angular from "../images/angular.png";
import python from "../images/python.png";
import react from "../images/react.png";
import blank from "../images/blank.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import axios from "axios";
import "./Game.css";

const width = 8;
const candyColors = [java, swift, angular, python, react, vue];
let flag = false;

const Game = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const dispatch = useDispatch();

  if (scoreDisplay !== 0 && !flag) {
    setScoreDisplay(0);
  }

  if (scoreDisplay > highScore && flag) {
    setHighScore(scoreDisplay);
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (columnOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < width * width; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfFour.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];
      const isBlank = currentColorArrangement[i] === blank;

      if (columnOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];
      const isBlank = currentColorArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (rowOfThree.every((square) => currentColorArrangement[square] === decidedColor && !isBlank)) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach((square) => (currentColorArrangement[square] = blank));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangement[i] = candyColors[randomNumber];
      }

      if (currentColorArrangement[i + width] === blank) {
        currentColorArrangement[i + width] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  };

  const dragStart = (e) => {
    flag = true;
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute("data-id"));
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute("data-id"));

    currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute("src");
    currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute("src");

    const validMoves = [squareBeingDraggedId - 1, squareBeingDraggedId - width, squareBeingDraggedId + 1, squareBeingDraggedId + width];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute("src");
      currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute("src");
      setCurrentColorArrangement([...currentColorArrangement]);
    }
  };

  // create a 8x8 matrix with the values in array candyColors
  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangement([...currentColorArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangement]);

  const LogoutHandleClick = () => {
    localStorage.clear();
    updateScore();
    logout(dispatch);
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `login`;
    navigate(path);
  };

  const getScore = async () => {
    user && setHighScore(user.highscore);
  };

  const updateScore = async () => {
    if (scoreDisplay >= highScore) {
      try {
        const res = await axios.put("http://localhost:1104/api/users/updateScore", { email: user.email, highscore: highScore });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  return (
    <div style={{ height: "90vh" }}>
      <div className="logout">
        <button
          onClick={(e) => {
            e.preventDefault();
            routeChange();
            LogoutHandleClick();
          }}
        >
          LogOut
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>Hello {user.username}, come let's set a new Highcore</h2>
      <h3 style={{ textAlign: "center" }}>HighScore : {highScore}</h3>
      <div className="app">
        <ScoreBoard score={scoreDisplay} />
        <div className="game">
          {currentColorArrangement.map((candyColor, index) => (
            <img
              key={index}
              src={candyColor}
              alt={candyColor}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
