import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BodySingle from "integrador/components/layouts/body/single/body-single.component";


export default {
  title: 'Layout/Body/BodySingle',
  component: BodySingle,
  argTypes: {
  },
} as ComponentMeta<typeof BodySingle>;

const Template: ComponentStory<typeof BodySingle> = (args: any) => <BodySingle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Single body',
  // containerProps: {sx: {backgroundColor:'#faa' }}
};