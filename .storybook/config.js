import { configure } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';

function loadStories() {
  // addParameters({
  //   options: {
  //     theme: themes.dark,
  //   },
  // });
  require('../src/stories');
}

configure(loadStories, module);
