export const tokens = {
  global: {
    spacing: {
      100: {
        value: '16',
        type: 'spacing',
      },
      125: {
        value: '{global.spacing.scale} * 5',
        type: 'spacing',
      },
      scale: {
        value: '{global.spacing.100} / 4',
        type: 'spacing',
      },
    },
  },
};
