import React from "react";

import { storiesOf } from "@storybook/react";

import EditableLabel from "./../atoms/label/index";

storiesOf("Editable", module).add("laebl", () => (
  <EditableLabel
    text="Hello!"
    labelClassName="myLabelClass"
    inputClassName="myInputClass"
    inputWidth="200px"
    inputHeight="25px"
    inputMaxLength="50"
    labelFontWeight="bold"
    inputFontWeight="bold"
    onFocus={(t)=> console.log('Focused with text: ' + t)}
    onFocusOut={(t)=> console.log('Unfocused with text: ' + t)}
  />
));
