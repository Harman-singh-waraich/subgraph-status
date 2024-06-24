import {} from "styled-components";

declare module "styled-components" {
  //eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      primary: string;
      stroke: string;
    };
  }
}
