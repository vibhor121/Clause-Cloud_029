// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md', // This applies a medium border radius to all buttons
      },
    },
  },
});

export default theme;