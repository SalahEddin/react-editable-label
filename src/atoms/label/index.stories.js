import React from "react";

import { storiesOf } from "@storybook/react";

import EditableLabel from "./index";
import './index.css';

storiesOf("Editable", module).add("label", () => (
  <div style={{width:'200px', height:'150px', paddingLeft:'10px'}}>
    <EditableLabel
      text="Hello!"
      labelClassName="myLabelClass"
      inputClassName="myInputClass"
      inputWidth="200px"
      inputMaxLength="50"
      labelFontWeight="bold"
      inputFontWeight="bold"
      onFocus={t => console.log("Focused with text: " + t)}
      onFocusOut={t => console.log("Unfocused with text: " + t)}
    />
  </div>
));
