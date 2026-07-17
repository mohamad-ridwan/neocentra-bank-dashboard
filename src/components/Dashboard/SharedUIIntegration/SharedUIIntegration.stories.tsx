import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import { SharedUIIntegration } from './SharedUIIntegration';

const meta = {
  title: 'Dashboard/SharedUIIntegration',
  component: SharedUIIntegration,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    injected: { control: 'boolean' },
    counterValue: { control: { type: 'number' } },
    onIncrement: { action: 'increment' },
    onDecrement: { action: 'decrement' },
  },
  args: {
    injected: false,
    counterValue: 0,
    onIncrement: fn(),
    onDecrement: fn(),
  },
} satisfies Meta<typeof SharedUIIntegration>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    injected: false,
    counterValue: 0,
  },
};

export const InjectedReducer: Story = {
  args: {
    injected: true,
    counterValue: 10,
  },
};

export const LargeCounter: Story = {
  args: {
    injected: true,
    counterValue: 9999,
  },
};
