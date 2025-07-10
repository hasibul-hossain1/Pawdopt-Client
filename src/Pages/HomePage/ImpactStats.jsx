import { Card, CardContent } from "@/components/ui/card";
import Divider from "@/Shared/Divider";
import CountUp from "./CountUp/CountUp";

const stats = [
  { label: "Pets Adopted", value: 245, emo:'🐕' },
  { label: "Rescues Made", value: 172, emo:'⛑️' },
  { label: "Happy Homes", value: 93, emo:'🏡'},
  { label: "Active Campaigns", value: 12, emo:'🏕️' },
];

export default function ImpactStats() {
  return (
    <section className="py-16 bg-muted text-center">
      <h2 data-aos="slide-right">Our Impact So Far</h2>
      <Divider />
      <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="py-8">
              <div className="text-4xl font-bold text-secondary-foreground">
               <div className="mb-2">{stat.emo}</div>
                <CountUp
                  from={0}

                  separator=","
                  direction="up"
                  duration={2}
                  to={stat.value}
                />
              </div>
              <p className="text-muted-foreground mt-2 text-base font-medium">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
