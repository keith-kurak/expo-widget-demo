import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Button } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { generateSlug } from "random-word-slugs";
import { requestWidgetUpdate } from 'react-native-android-widget';
import { HelloWidget } from '@/widgets/android/HelloWidget';

export default function TabOneScreen() {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    (async () => {
      const demoString =
        (await AsyncStorage.getItem("widgetDemoString")) || "waiting...";
      setSlug(demoString);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync to Android Widget</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Demo String:</Text>
      <Text>{slug}</Text>
      <Button
        title="Generate Random Phrase"
        onPress={() => {
          const slug = generateSlug(4, { format: "title" });
          setSlug(slug);
          AsyncStorage.setItem("widgetDemoString", slug);
          requestWidgetUpdate({
            widgetName: 'Hello',
            renderWidget: () => <HelloWidget text={slug} />,
            widgetNotFound: () => {
              // Called if no widget is present on the home screen
            }
          });
        }}
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
