import { PointsCard } from "@/components/points-card";

const sample = {
  points: 8879,
  eventPoints: 150,
  raffleEntries: 1,
  progress: 50,
  pointsToNextEntry: 50,
};

export default function Home() {
  return (
    <main style={{ padding: 32, display: "grid", gap: 32, justifyItems: "start" }}>
      <section data-theme="stan-smith">
        <h2 className="ss-text-body-s">Stan Smith</h2>
        <PointsCard {...sample} />
      </section>
      <section data-theme="default">
        <h2 className="ss-text-body-s">Default</h2>
        <PointsCard {...sample} />
      </section>
    </main>
  );
}
