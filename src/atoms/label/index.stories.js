import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import {EditableLabel} from './index'

storiesOf('Edit Label', module).add('textbox with icon', () => <EditableLabel/>);
