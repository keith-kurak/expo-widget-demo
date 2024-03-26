import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import { HelloWidget } from './HelloWidget';

const nameToWidget = {
  // Hello will be the **name** with which we will reference our widget.
  Hello: HelloWidget,
};

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget =
    nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

    const demoString = await AsyncStorage.getItem(
      "widgetDemoString"
    ) || "waiting...";

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget text={demoString} />);
      break;

    case 'WIDGET_UPDATE':
      props.renderWidget(<Widget text={demoString} />);
      break;

    case 'WIDGET_RESIZED':
      props.renderWidget(<Widget text={demoString} />);
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}