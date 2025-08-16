import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN as string, {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});
export function fireEvent(eventName: string) {
  mixpanel.track(eventName)
}
export default mixpanel;
