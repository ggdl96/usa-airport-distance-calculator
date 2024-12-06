import tailwindFullConfig from "@/utils/tailwind-theme";
import tailwindConfig from "../../../tailwind.config";

export const containerStyle = {
  width: "100%",
  height: "400px",
};

export const labelStyles = {
  color: tailwindConfig.theme.extend.colors.input,
  fontWeight: "bold",
};

export const lineStyles = {
  strokeColor: tailwindFullConfig.theme.colors.input,
  strokeOpacity: 0.6,
  strokeWeight: 2,
};
