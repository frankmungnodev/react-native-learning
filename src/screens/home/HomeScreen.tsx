import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {decrement, increment, selectCount} from '../counter/counterSlice';
import {RootTabParamList} from '../../../App';
import {selectTheme, updateTheme} from '../../app/appSlice';
import {darkTheme, lightTheme, systemTheme} from '../../app/theme';

type Props = NativeStackScreenProps<RootTabParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const count = useAppSelector(selectCount);
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          height: 'auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Button mode="elevated" onPress={() => dispatch(decrement())}>
          Decrease
        </Button>
        <Text variant="displayLarge" style={{color: 'red'}}>
          {count}
        </Text>
        <Button mode="elevated" onPress={() => dispatch(increment())}>
          Increase
        </Button>
      </View>
      <Text>{theme.name}</Text>
      <View
        style={{
          flex: 1,
          height: 'auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Button
          mode="elevated"
          onPress={() => dispatch(updateTheme(systemTheme))}>
          System Theme
        </Button>
        <Button
          mode="elevated"
          onPress={() => dispatch(updateTheme(lightTheme))}>
          Light Theme
        </Button>
        <Button
          mode="elevated"
          onPress={() => dispatch(updateTheme(darkTheme))}>
          Dark Theme
        </Button>
      </View>
    </ScrollView>
  );
};
