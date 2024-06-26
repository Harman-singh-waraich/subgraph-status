import React from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";

export interface WithThemeProps {
  theme?: Partial<{
    borderRadius: string;

    colors: Partial<{
      main: string;
      secondary: string;
      primary: string;
      stroke: string;
    }>;
  }>;
}

export const defaultTheme: DefaultTheme = {
  colors: {
    primary: "#DAF0FF",
    secondary: "#BECCE5",
    main: "#1B003F",
    stroke: "#42498F",
  },
  borderRadius: "3px",
};

const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithThemeProps) => (
    <ThemeProvider theme={{ ...defaultTheme, ...props.theme }}>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default withTheme;
