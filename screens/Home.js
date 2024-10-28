import { useState } from "react";
import { Text, View, Pressable, Keyboard } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from "./Header";
import Footer from "./Footer";
import { horizontalScale, moderateScale, verticalScale } from '../metrics/Metrics'
import { 
    NBR_OF_DICES, 
    NBR_OF_THROWS, 
    MIN_SPOT, 
    MAX_SPOT, 
    BONUS_POINTS, 
    BONUS_POINTS_LIMIT } from "../constants/Game";
import styles from "../style/style";

export default Home = ({navigation}) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }
  
    return (
        <>
            <Header />
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="information" size={moderateScale(90)} color="#E4B1F0" />
                </View>
                
                {!hasPlayerName ? 
                    <>
                        <Text style={styles.promptText}>
                            For awesome TOP 5 scoreboard enter your name:
                        </Text>
                        <TextInput
                            label="Player name"
                            value={playerName}
                            onChangeText={setPlayerName}
                            mode="outlined" 
                            autoFocus={true}
                            style={styles.textinput} 
                        />
                        <Pressable
                            style={styles.homebutton}
                            onPress={() => handlePlayerName(playerName)}
                        >
                            <Text style={styles.homebuttonText}>Let's go!</Text>
                        </Pressable>
                    </>
                : 
                    <>
                        <View style={styles.rulesContainer}>
                            <Text style={styles.rulesTitle}>Rules of the game{"\n"}</Text>
                            <Text style={styles.rulesText} multiline={true}>
                                THE GAME: Upper section of the classic Yahtzee
                                dice game. You have {NBR_OF_DICES} dices and
                                for every dice you have {NBR_OF_THROWS + ' '} 
                                throws. After each throw you can keep dices in
                                order to get same dice spot counts as many as
                                possible. In the end of the turn you must select
                                your points from {MIN_SPOT} to {MAX_SPOT}.
                                Game ends when all points have been selected.
                                The order for selecting those is free.{"\n"}{"\n"}
                                POINTS: After each turn game calculates the sum
                                for the dices you selected. Only the dices having
                                the same spot count are calculated. Inside the
                                game you cannot select the same points from
                                {' ' + MIN_SPOT} to {MAX_SPOT} again.{"\n"}{"\n"}
                                GOAL: To get points as much as possible.
                                {' ' + BONUS_POINTS_LIMIT} points is the limit of
                                getting a bonus which gives you {BONUS_POINTS + ' '}
                                points more.
                            </Text>
                            <Text style={styles.rulesPlayerText}>Good luck, {playerName}</Text>
                        </View>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('Gameboard', { player: playerName })}
                            style={styles.playButton}
                        >
                            PLAY
                        </Button>
                    </>
                }
            </View>
            <Footer />
        </>
    );
}
