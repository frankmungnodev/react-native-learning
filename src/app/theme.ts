
import { useColorScheme } from 'react-native';
import {
    MD3DarkTheme,
    MD3LightTheme
} from 'react-native-paper';


export const CombinedDefaultTheme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
    },
};

export const CombinedDarkTheme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
    },
};

export type ThemeType = {
    value: 'system' | 'dark' | 'light',
    name: string,
    data: Object
};

export const systemTheme: ThemeType = {
    data: CombinedDarkTheme,
    value: 'system',
    name: 'System Theme'
}
export const lightTheme: ThemeType = {
    data: CombinedDefaultTheme,
    value: 'light',
    name: 'Light Theme'
}
export const darkTheme: ThemeType = {
    data: CombinedDarkTheme,
    value: 'dark',
    name: 'Dark Theme'
}

export const getThemeFromValue = (value: string | null): ThemeType => {
    return value == 'dark' ? darkTheme : value == 'light' ? lightTheme : systemTheme;
}

export const determineThemeData = (theme: ThemeType): ThemeType => {
    const systemTheme = useColorScheme();
    const isDarkTheme = systemTheme == 'dark';
    if (theme.value == 'system') {
        return {
            data: isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme,
            value: 'system',
            name: 'System Theme'
        };
    }

    return theme;
}