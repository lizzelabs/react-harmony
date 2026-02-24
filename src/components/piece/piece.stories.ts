import type { Meta, StoryObj } from '@storybook/react-vite';

import { Piece } from './piece';

const meta = {
  title: 'Piece',
  component: Piece,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: { description: 'Element to be rendered ex: span, p, div, ul, li' },
    kind: {
      description:
        'Element name, it could be useful for constrain your shared styles',
    },
    id: { description: 'Id in case of null is filled with an unique value.' },
    children: {
      description: 'HTML children',
    },
    withStyle: {
      description: 'CSS Styles',
    },
    aria: {
      description: 'ARIA attributes',
    },
    className: {
      description: 'CSS classes',
    },
  },
} satisfies Meta<typeof Piece>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Div: Story = {
  args: {
    as: 'div',
  },
};

export const Paragraph: Story = {
  args: {
    as: 'p',
  },
};
