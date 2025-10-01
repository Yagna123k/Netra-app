import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (percentage: number): number => {
  return (percentage * deviceHeight) / 100;
};

export const wp = (percentage: number): number => {
  return (percentage * deviceWidth) / 100;
};
