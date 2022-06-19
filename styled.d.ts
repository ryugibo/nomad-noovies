// import original module declarations
import "styled-components/native";
import { BlurTint } from "expo-blur";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    blurTint: BlurTint;
    mainBgColor: string;
    textColor: string;
    accentColor: string;
  }
}
