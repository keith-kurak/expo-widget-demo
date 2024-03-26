# Expo Widget Demo
Data flow from app to widget on iOS and Android

## Android
Library: `react-native-android-widget` (https://github.com/sAleksovski/react-native-android-widget)

### How to test
1. `npx expo run:android`
2. Add widget to homescreen
3. Open app, go to tab 1.
4. Generate a random slug.
5. Check the widget - the same slug should appear.

### Where to look for files
- **widgets/android** - the widget, its preview (don't really understand how these work yet), and the task handler.
- **app/(tabs)/index.tsx** - the data syncing demo
- **app.json** - config plugin settings

### Implementation notes
- This one is pretty much all-inclusive and fairly mature. Fully-working config plugin. Widget coded in a limited form of JSX.
- Data syncing in this example is via async storage. **widget-task-handler.tsx** can use hooks and pass data to widget components.
- I forgot to make a separate entry point registering the headless task and just stuffed it into root layout. Should fix later, I guess.
- I'm fuzzy on how precisely to control the min and max sizes. I got resizing working to some extend, though. The properties supported by the plugin don't seem to jive with the advice in https://developer.android.com/develop/ui/views/appwidgets (e.g., the approximate DP sizes for each cell), and the plugin also doesn't appear to support the Android 12+ properties.

## iOS
Library: `react-native-widget-extension` (https://github.com/bndkt/react-native-widget-extension)

Some inspiration from: https://github.com/EvanBacon/expo-apple-targets

Most of the app group data sharing cribbed from: https://evanbacon.dev/blog/apple-home-screen-widgets

### How to test
1. `npx expo run:ios`
2. Add widget to homescreen
3. Open app, go to tab 2.
4. Generate a random slug.
5. Check the widget - the same slug should appear.

### Where to look for files
- **widgets/ios** - all the widget extension target's files (except for the entitlements file).
- **app/(tabs)/two.tsx** - the data syncing demo
- **app.json** - config plugin settings, EAS build properties to detect signing for the extension target bundle (haven't tested this yet), app group entitlements

### Implementation notes
- The extension is pretty geared towards a dynamic island live activity. It doesn't support data syncing without both `patch-package` and `patch-project`.
- The extension's app group entitlement needed `patch-project`, which adds both the entitlements file and links it in the pbxproj. The config plugin would copy the file over, but wouldn't do the linking.
- I had to keep **Attributes.swift** as a stub for the live activity I didn't want to use.
- Plugin hardcodes the widget target names and bundle identifier.
- The library includes an Expo module for sharing data with the live activity. What actually happens is the API contract / types is fixed inside the package in node_modules, but the native implementation is overridden by the **Module.swift** file copied from **widgets/ios**. I needed to add a refresh function to force updating the data read from the widget, so I patch-package'd the node_modules build JS to force the JS to find an implementation, which was then included in my **Module.swift**. Ultimately, just about anyone making a widget like this should make a local Expo module with this functionality.
- I chose to share data via a straight FS read/write instead of shared defaults so I could evaluate the feasibility of syncing images. I had to use `react-native-fs` as it had built-in support for reading the app group folder path, though this path could have been used with `expo-file-system`.
- Though it seems more complex at first, the workarounds required suggest to me that `expo-apple-targets` would work better for this use case. It seems more complex at first, but that complexity is necessary.
- To share a little more code, both iOS and Android widgets could probably sync data from the filesystem.
