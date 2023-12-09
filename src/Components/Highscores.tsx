import React from 'react';
import NameModal from './NameModal';
import useHighscores from '../Hooks/useHighscores';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Text, View, StyleSheet, Pressable} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Highscores'>;

const Highscores = ({route, navigation}: Props) => {
  const {score} = route.params;
  const {saveScore, scoreList} = useHighscores();
  const ScoreList = scoreList.map((score, idx) => {
    return (
      <Text key={idx} style={styles.scoretext}>
        {score.name || 'Anonymous'} - {score.score}
      </Text>
    );
  });
  return (
    <View style={styles.container}>
      <NameModal saveScore={saveScore} score={score} />
      <Text style={styles.title}>Highscores</Text>
      <View style={{flex: 1}}>{ScoreList}</View>
      <Pressable style={styles.startbtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btntext}>New Game</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 48,
    margin: '10%',
    color: 'black',
  },
  startbtn: {
    backgroundColor: 'orange',
    width: 200,
    height: 60,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
  },
  btntext: {
    fontSize: 20,
    fontWeight: '800',
    color: 'black',
  },
  scoretext: {
    fontSize: 24,
    textAlign: 'center',
    margin: 2,
    color: 'black',
  },
});
export default Highscores;
