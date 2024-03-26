import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

export function HelloWidget({ text }: { text: string}) {
  return (
    <FlexWidget
      clickAction="OPEN_APP"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
    >
      <TextWidget
        text="Hello"
        style={{
          fontSize: 32,
          color: '#000000',
        }}
      />
       <TextWidget
        text={text}
        style={{
          fontSize: 18,
          color: '#000000',
        }}
      />
    </FlexWidget>
  );
}