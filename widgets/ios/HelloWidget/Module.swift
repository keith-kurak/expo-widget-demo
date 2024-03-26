import ExpoModulesCore
import ActivityKit
import WidgetKit

internal class MissingCurrentWindowSceneException: Exception {
    override var reason: String {
        "Cannot determine the current window scene in which to present the modal for requesting a review."
    }
}

public class ReactNativeWidgetExtensionModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ReactNativeAppClip')` in JavaScript.
        Name("ReactNativeWidgetExtension")

        // Defines event names that the module can send to JavaScript.
        Events("onChange")

        Function("areActivitiesEnabled") { () -> Bool in
            let logger = Logger()
            logger.info("areActivitiesEnabled()")

            return false
        }

        // Function to call from JS
        Function("reloadWidget") { () in
            // Trigger a widget update to sync the data
            if #available(iOS 14.0, *) {
                WidgetCenter.shared.reloadAllTimelines()
            }
        }
    }
}
