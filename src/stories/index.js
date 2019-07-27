import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import EditableLabel from "./../atoms/label/index";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

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
