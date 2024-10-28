import { Text, View, Pressable } from "react-native";
import { Button } from "react-native-paper";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/style";
import { horizontalScale, moderateScale, verticalScale } from '../metrics/Metrics'
import { useEffect, useState } from "react";
import {
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
  SCOREBOARD_KEY,
} from "../constants/Game";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Container, Row, Col } from "react-native-flex-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = [];

export default Gameboard = ({ navigation, route }) => {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState("Throw dices.");
  const [gameEndStatus, setGameEndStatus] = useState(false);
  //Mitkä arpakuutioista ovat valittuina?
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  //Arpakuutioiden silmäluvut
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  //Valittujen arpakuutioiden kokonaispistemäärät
  const [dicePointsTotal, setDicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  //Mitkä arpakuutioiden silmäluvuista on valittu pisteisiin
  const [selectedDicePoints, setSelectedDicePoints] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  const [playerName, setPlayerName] = useState("");
  const [scores, setScores] = useState([]);
  const [bonusPoints, setBonusPoints] = useState(0);
  const totalPoints = dicePointsTotal.reduce(
    (total, points) => total + points,
    0
  );

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        const tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
        console.log("Gameboard: Read successful.");
        console.log("Gameboard: Number of scores: " + tmpScores.length);
      }
    } catch (e) {
      console.log("Gameboard: Read error: " + e);
    }
  };

  const savePlayerPoints = async () => {
    const newKey = scores.length + 1;
    const playerPoints = {
      key: newKey,
      name: playerName,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      points: totalPoints + bonusPoints,
    };
    try {
      const newScore = [...scores, playerPoints];
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
      console.log("Gameboard: Save successful." + jsonValue);
    } catch (e) {
      console.log("Gameboard: Save error " + e);
    }
  };

  // Aloita uusi peli (nollaa tilamuuttujat)
  const startNewGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(0));
    setGameEndStatus(false);
    setStatus("Throw dices.");
    setBonusPoints(0);
  };

  //Tässä luodaan arpakuutiorivi sarakkeittain (Col)
  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable key={"row" + dice} onPress={() => chooseDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            key={"row" + dice}
            size={moderateScale(50)}
            color={getDiceColor(dice)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  //Tässä luodaan pisterivi sarakkeittain (Col)
  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>{getSpotTotal(spot)}</Text>
      </Col>
    );
  }

  //Tässä luodaan rivi, joka kertoo onko pisteet jo valittu silmäluvulle
  const pointsToSelectRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          key={"buttonsRow" + diceButton}
          onPress={() => chooseDicePoints(diceButton)}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={moderateScale(35)}
            color={getDicePointsColor(diceButton)}
          ></MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const chooseDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first.");
    }
  };

  const chooseDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce(
          (total, x) => (x === i + 1 ? total + 1 : total),
          0
        );
        points[i] = nbrOfDices * (i + 1);
      } else {
        setStatus("You already selected points for " + (i + 1));
        return points[i];
      }
      setDicePointsTotal(points);
      setSelectedDicePoints(selectedPoints);

      if (selectedPoints.every((point) => point)) {
        calculateBonus();
        setGameEndStatus(true);
        setStatus("Game over! All points selected.");
      } else {
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setStatus("Start a new round.");
      }

      return points[i];
    } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
    }
  };

  function getDiceColor(i) {
    return selectedDices[i] ? "#e71bc5" : "#7E60BF";
  }

  function getDicePointsColor(i) {
    return selectedDicePoints[i] && !gameEndStatus ? "#e71bc5" : "#7E60BF";
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  const throwDices = () => {
    if (nbrOfThrowsLeft > 0) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
          spots[i] = randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
      setDiceSpots(spots);
      setStatus("Select and throw dices again.");
    } else {
      setStatus("No throws left. Please select points.");
    }
  };

  const calculateBonus = () => {
    const currentTotal = dicePointsTotal.reduce(
      (total, points) => total + points,
      0
    );
    if (currentTotal >= BONUS_POINTS_LIMIT) {
      setBonusPoints(BONUS_POINTS); // Jos bonus saavutetaan, asetetaan bonuspisteet
      console.log("Bonus achieved!");
    } else {
      setBonusPoints(0); // Jos bonusraja ei täyty, bonus on 0
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Container style={styles.dicerow}>
          <Row>{dicesRow}</Row>
        </Container>
        <View style={styles.centeredView}>
          <Text style={styles.gameboardtexts}>
            Throws left: {nbrOfThrowsLeft}
          </Text>
          <Text>{status}</Text>
          {!gameEndStatus && (
            <Button
              mode="contained"
              onPress={throwDices}
              style={styles.throwButton}
            >
              THROW DICES
            </Button>
          )}
          <Text style= {styles.gameboardtexts}>
          Total: {dicePointsTotal.reduce((total, points) => total + points, 0)}
        </Text>
        <Text>
          {bonusPoints > 0
            ? `Congratulations! You've earned a bonus of ${bonusPoints} points!`
            : `You need ${Math.max(
                0,
                BONUS_POINTS_LIMIT - totalPoints
              )} more points for bonus.`}
        </Text>
        </View>
        <Container style= {styles.pointsrow}>
          <Row>{pointsRow}</Row>
        </Container>
        <Container style= {styles.pointstoselectrow}>
          <Row>{pointsToSelectRow}</Row>
        </Container>

        {gameEndStatus && (
          <>
            {bonusPoints > 0 && (
              <Text style= {styles.gameboardtexts}>Total with bonus: {totalPoints + bonusPoints}</Text>
            )}
          </>
        )}

        {gameEndStatus ? (
          <>
           <View style={styles.buttonContainer}>
    <Button
        mode="contained"
        onPress={() => startNewGame()}
        style={styles.smallButton}
    >
        START NEW GAME
    </Button>
    <Button
        mode="contained"
        onPress={() => savePlayerPoints()}
        style={styles.smallButton}
    >
        SAVE POINTS
    </Button>
</View>
          </>
        ) : null}
        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  );
};
