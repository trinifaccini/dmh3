import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextCard from './text-card.component';


export default {
  title: 'TextCard',
  component: TextCard,
  argTypes: {
  },
} as ComponentMeta<typeof TextCard>;

const Template: ComponentStory<typeof TextCard> = (args: any) => <TextCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

Primary.args = { title: "Transferí dinero", content: "Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"};
