import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), text: "what's up2?")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        // TODO: I don't understand getSnapshot when we have getTimeline, gotta look up this API
        let entry = SimpleEntry(date: Date(), text: "what's up3?")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {

        guard let groupDir = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.com.keith-kurak.expo-widget-demo") else {
            fatalError("could not get shared app group directory.")
        }

        let fileUrl = groupDir.appendingPathComponent("demo.txt")

        do {
            let text = try String(contentsOf: fileUrl, encoding: .utf8)
            let entry = SimpleEntry(date: Date(), text: text)
            // Some other stuff to make the widget update...
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        } catch {
            let entry = SimpleEntry(date: Date(), text: "")
            let timeline = Timeline(entries: [entry], policy: .atEnd)
            completion(timeline)
        }
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let text: String
}

struct HelloWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        Text(!entry.text.isEmpty ? "Hello: \(entry.text)" : "Nothing yet!")
    }
}

struct HelloWidget: Widget {
    let kind: String = "HelloWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            HelloWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Hello Widget!")
        .description("All the hellos on your home screen.")
    }
}

struct HelloWidget_Previews: PreviewProvider {
    static var previews: some View {
        HelloWidgetEntryView(entry: SimpleEntry(date: Date(), text: "whats up?"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
