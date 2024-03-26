import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), totalPizzas: 0)
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), totalPizzas: 32)
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, totalPizzas: 32)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let totalPizzas: Int
}

struct HelloWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
        Text(entry.totalPizzas > 0 ? "You've eaten \(entry.totalPizzas) pizzas!" : "Why u no eat pizza?")
    }
}

struct HelloWidget: Widget {
    let kind: String = "HelloWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            HelloWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Hey Pizza!")
        .description("Get your pizzas super-fast!")
    }
}

struct HelloWidget_Previews: PreviewProvider {
    static var previews: some View {
        HelloWidgetEntryView(entry: SimpleEntry(date: Date(), totalPizzas: 0))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
