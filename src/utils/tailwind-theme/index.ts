import resolveConfig from 'tailwindcss/resolveConfig';
import theme from "../../../tailwind.config";

const tailwindFullConfig = resolveConfig(theme);

export default tailwindFullConfig;
