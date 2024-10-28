import { useState, useEffect } from "react";
import { Text, View, Button } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { horizontalScale, moderateScale, verticalScale } from '../metrics/Metrics'
import { SCOREBOARD_KEY } from "../constants/Game";
import styles from "../style/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataTable } from "react-native-paper";

export default Scoreboard = ({ navigation }) => {

    const [scores, setScores] = useState([]);
    const [sortedScores, setSortedScores] = useState([]);

    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY);
            setScores([]);
        }
        catch(e) {
            console.log('Clear error: ' + e);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData();
        })
        return unsubscribe;
    }, [navigation]);

    const getScoreboardData = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                const tmpScores = JSON.parse(jsonValue);
            tmpScores.sort((a, b) => b.points - a.points); // Laskevaa järjestystä
            const topScores = tmpScores.slice(0, 5); // Ota vain top 5
            setScores(topScores); // Aseta vain top 5 tulokset
            console.log('Scoreboard: Read successful.');
            console.log('Scoreboard: Number of scores: ' + topScores.length);
            }
        }
        catch (e) {
            console.log('Scoreboard: Read error: ' + e);
        }
    }

return (
    <View>
        <Header />
        <Text style={styles.top}>TOP 5</Text>
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Player</DataTable.Title>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title numeric>Points</DataTable.Title>
            </DataTable.Header>

            {scores.map((score) => (
                <DataTable.Row key={score.key}>
                    <DataTable.Cell>{score.name}</DataTable.Cell>
                    <DataTable.Cell>{score.date}</DataTable.Cell>
                    <DataTable.Cell>{score.time}</DataTable.Cell>
                    <DataTable.Cell numeric>{score.points}</DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
        <Button title="Clear Scoreboard" onPress={clearScoreboard} />
        <Footer />
    </View>
);
};