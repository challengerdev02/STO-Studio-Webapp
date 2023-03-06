import "../styles/metacomic-theme.css";
import "../styles/utilities.css";
// Import from @storybook/X where X is your framework
import { addDecorator, addParameters } from "@storybook/react";
import { withRootAttribute } from "storybook-addon-root-attribute";
import "metacomicicons/fonts/metacomic.css";

// global
addDecorator(withRootAttribute);
addParameters({
  rootAttribute: {
    attribute: "data-theme",
    root: "html",
    defaultState: {
      name: "Default",
      value: "dark",
    },
    states: [
      {
        name: "Light Theme",
        value: "light",
      },
      {
        name: "Dark Theme",
        value: "dark",
      },
    ],
  },
});
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
