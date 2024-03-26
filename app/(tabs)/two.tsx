import { StyleSheet, Button } from 'react-native';
import { useEffect, useState } from "react";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { generateSlug } from 'random-word-slugs';
import * as ReactNativeWidgetExtension from "react-native-widget-extension";
import RNFS from 'react-native-fs';

export default function TabTwoScreen() {
  const [slug, setSlug] = useState<string>("");
  const [appGroupPath, setAppGroupPath] = useState<string>("");

  useEffect(() => {
    (async () => {
      const path = await RNFS.pathForGroup('group.com.keith-kurak.expo-widget-demo');
      const filePath = `${path}/demo.txt`;
      setAppGroupPath(filePath);
      if (await RNFS.exists(filePath)) {
        const demoString = await RNFS.readFile(filePath);
        setSlug(demoString);
      } else {
        setSlug("nothing yet");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sync to iOS Widget</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Shared file path:</Text>
      <Text>{appGroupPath}</Text>
      <Text style={styles.title}>Demo String:</Text>
      <Text>{slug}</Text>
      <Button
        title="Generate Random Phrase"
        onPress={() => {
          const slug = generateSlug(4, { format: "title" });
          setSlug(slug);
          (async () => {
            const path = await RNFS.pathForGroup('group.com.keith-kurak.expo-widget-demo');
            const filePath = `${path}/demo.txt`;
            await RNFS.writeFile(filePath, slug);
            // we patch-package this in to temporarily avoid a local Expo module,
            // but we'll probably need it
            ReactNativeWidgetExtension.reloadWidget();
          })();
        }}
      />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
