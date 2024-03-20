import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GeneralHeader from "integrador/components/layouts/header/general-header.component";


export default {
  title: 'Layout/Header/GeneralHeader',
  component: GeneralHeader,
  argTypes: {
  },
} as ComponentMeta<typeof GeneralHeader>;

const Template: ComponentStory<typeof GeneralHeader> = (args: any) => <GeneralHeader {...args} />;

export const Index = Template.bind({});
Index.args = {
  variant: 'index'
};

export const SignIn = Template.bind({});
SignIn.args = {
  variant: 'signIn'
};

export const Other = Template.bind({});
Other.args = {
};