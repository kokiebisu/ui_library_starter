import React from "react";

import { Button } from "../lib/atoms-button";

export default { title: "Button" };

const ButtonStory = (args) => <Button {...args} />;

export const Primary = ButtonStory.bind({});
Primary.args = {};
