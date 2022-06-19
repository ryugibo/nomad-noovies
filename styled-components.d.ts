import { BlurTint } from "expo-blur";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    blurTint: BlurTint;
    mainBgColor: string;
    textColor: string;
    accentColor: string;
  }
}
