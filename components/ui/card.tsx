// components/ui/card.tsx
// import React from 'react';
// import { View } from 'react-native';

// export const Card = ({ children, style = {} }) => {
//   return (
//     <View
//       style={[
//         {
//           backgroundColor: '#ffffff',
//           borderRadius: 16,
//           padding: 16,
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 6,
//           elevation: 4,
//           marginBottom: 16,
//         },
//         style,
//       ]}
//     >
//       {children}
//     </View>
//   );
// };

// export const CardContent = ({ children, style = {} }) => {
//   return <View style={style}>{children}</View>;
// };

import React, { ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card: React.FC<CardProps> = ({ children, style = {} }) => {
  return (
    <View
      style={[
        {
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
          marginBottom: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, style = {} }) => {
  return <View style={style}>{children}</View>;
};
