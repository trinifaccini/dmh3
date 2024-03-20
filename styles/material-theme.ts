import createTheme from "@mui/material/styles/createTheme";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false; // removes the `xs` breakpoint
        sm: false;
        md: false;
        lg: false;
        xl: false;
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        laptop: true;
        desktop: true;
    }
}

export const theme = createTheme({
    breakpoints: {
        values: {
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1300,
        },
      },
    typography: {

        fontFamily: 'Open Sans, sans-serif',
        h1: {
            fontSize: '34pt',
            fontWeight: 'normal',    
        },
        h2: {
            fontSize: '27pt',
            fontWeight: 'bold'
        },
        h3: {
            fontSize: '24pt',
            fontWeight: '600'
        },
        h4: {
            fontSize: '16pt',
            fontWeight: 'bold'
        },
        h5: {
            fontSize: '14pt',
            fontWeight: 'bold'
        },
        h6: {
            fontSize: '12pt',
            fontWeight: 'bold'
        },
        body1: {
            fontSize: '13pt',
        },
        body2: {
            fontSize: '11pt',
        }
    },

    palette : {
        primary: {
            light: '#3A393E',
            main: '#201F22',
        },
        secondary: {
            light: '#FFFFFF',
            main: '#C1FD35'
        },
        error: {
            main: '#DA0000'
        },
        text: {
            primary: '#000000',
            secondary: '#EEEAEA'
        },
        action: {
            disabledBackground: '#C1FD35'
        }
    }

}); 
