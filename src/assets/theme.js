import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#3372df',
        },
        secondary: {
            main: '#eb3a0e',
        },
        background: { default: '#212121' },
        contrastThreshold: 3,
    },
    typography: {
        useNextVariants: true,
    },
});

export default theme;
