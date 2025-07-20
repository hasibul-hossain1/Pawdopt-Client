import Divider from "@/Shared/Divider";
import Section from "@/Shared/Section";
import React from "react";
import ctaImg1 from "@/assets/edited1.png";
import ctaImg2 from "@/assets/edited2.png";
import ctaImg3 from "@/assets/edited3.png";
import CtaCard from "./CtaCard";

function CallToAction() {
  return (
    <Section>
      <h2 data-aos="slide-right">Every Pet Deserves a Home</h2>
      <Divider />
      <div className="">
        <CtaCard
          image={ctaImg1}
          title="Adoption Begins with Compassion"
          description="A simple moment — a glance between two people and a dog — can be the beginning of something life-changing. That gentle nudge of a nose, that hopeful look from behind the fence, speaks of days spent waiting for someone to care. Compassion is what turns that moment into a new beginning.
When you choose to adopt, you're giving more than shelter. You're giving warmth, attention, laughter, late-night walks, and quiet cuddles. You're saying, “You matter.”
And in return, you receive a kind of loyalty and love that’s pure, uncomplicated, and endlessly thankful. Compassion doesn’t end at the shelter door — it comes home with you, wagging its tail and forever grateful."
          data-aos="fade-right"
        />
        <CtaCard
          image={ctaImg2}
          title="More Than a Pet — A Bond for Life"
          description="The soft rustle of fur against your shirt, the warmth of a quiet purr — these aren’t just small comforts. They’re the signs of a bond forming that words can’t fully describe.
When you adopt a pet, you’re not just bringing an animal into your home — you’re opening your life to a companion who listens in silence, comforts without judgment, and remains by your side through every season.
That rescued cat you hold in your arms may have come from uncertainty, but in your embrace, it finds peace, safety, and belonging.
This is more than ownership. It’s partnership.
It’s the promise that no matter what life brings, you won’t have to face it alone — because now you have each other."
          className="md:justify-end justify-start md:flex-row-reverse"
          data-aos="fade-left"
        />
        <CtaCard
          image={ctaImg3}
          title="Don’t Shop. Adopt Hope."
          description="Across shelters and rescue homes, thousands of lives wait. Some bark. Some purr. Some chirp softly from behind wire doors. But all of them share one thing — a desire to be seen, chosen, and loved.
These are not products. They are living souls with hearts full of love and eyes full of hope. When you adopt, you’re not making a transaction — you’re making a promise.
A promise that says: “You are wanted.” “You are safe.” “You have a home.”
Adoption is not just the kinder choice — it’s the wiser one. It teaches compassion, responsibility, and gratitude.
And every animal adopted creates space for another to be rescued. So don’t buy love when it’s already waiting behind the shelter doors. Adopt, and become someone’s forever hero.

"
          data-aos="fade-right"
        />
      </div>
    </Section>
  );
}

export default CallToAction;
