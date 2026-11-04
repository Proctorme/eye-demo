import type { IWidget } from "@/global";

type WidgetLifecycleHandlers = {
  onStarted?: () => void;
  onEnded?: () => void;
};

// Call before init on both a new session and a restored session.
export function registerWidgetEvents(widget: IWidget, handlers: WidgetLifecycleHandlers = {}) {
  widget.resetSessionListeners();
  widget.on("STARTED", () => {
    console.log("Widget started ▶️");
    handlers.onStarted?.();
  });
  widget.on("FACE_ABSENCE", data => console.log(" face absence 🙈", data));
  widget.on("TAB_NOT_FOCUS", data => console.log(" tab not focus 💻", data));
  widget.on("MULTIPLE_FACE", data => console.log(" multiple face 🧑‍🧒‍🧒", data));
  widget.on("SOUND_DETECTED", data => console.log(" sound detected 🎶", data));
  widget.on("PERIODIC_SNAPSHOT", data => console.log(" periodic snapshot 📸", data));
  widget.on("END_PROCTORING", () => {
    console.log("Widget finished proctoring ⛔️");
    handlers.onEnded?.();
  });
}
