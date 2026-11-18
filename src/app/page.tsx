import { EarnPoints } from "@/components/earn-points";
import { EventBanner } from "@/components/event-banner";
import { EventPass } from "@/components/event-pass";
import { PointsCard } from "@/components/points-card";

const points = { points: 8879, eventPoints: 150, raffleEntries: 1, progress: 50, pointsToNextEntry: 50 };
const pass = {
  eventName: "STAN SMITH · SHANGHAI",
  guestName: "Cecilia Vera",
  code: "SS-1001",
  guestType: "Guest",
  plusOne: "Yes (+1)",
};
const activities = [
  { id: "checkin", title: "Arrive and check in", points: "+100 points" },
  { id: "archive", title: "STAN SMITH Archive booth", points: "+50 points" },
];

export default function Home() {
  return (
    <main style={{ padding: 32, display: "grid", gap: 48 }}>
      {(["stan-smith", "default"] as const).map((theme) => (
        <section key={theme} data-theme={theme}>
          <h2 className="ss-text-body-m-bold">{theme === "stan-smith" ? "Stan Smith" : "Default"}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
            <PointsCard {...points} />
            <EventPass {...pass} status="valid" />
            <EventPass {...pass} status="checked-in" />
            <EventBanner
              title="Earn points at the event"
              description="Earn points and join the prize draw."
              ctaLabel="See activities"
            />
            <EarnPoints items={activities} />
          </div>
        </section>
      ))}
    </main>
  );
}
