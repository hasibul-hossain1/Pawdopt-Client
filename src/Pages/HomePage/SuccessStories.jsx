import Divider from "@/Shared/Divider";
import Section from "@/Shared/Section";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SuccessStories() {
  const stories = [
    {
      title: "From Forgotten to Forever",
      text: "When we first met Max, he was barely surviving — underweight, scared, and alone in the pouring rain. His eyes held stories of neglect and hardship, and he flinched at every sound. Trust was broken, and hope was fading. But rescue changes everything. With love, time, and care, Max slowly began to heal. A warm bed replaced the cold street. Gentle hands replaced fear. And day by day, his spirit returned. Now? Max is unrecognizable. He runs with joy, greets everyone with tail wags, and sleeps peacefully curled up in his forever home — surrounded by the love he always deserved. This is what adoption does. It turns pain into purpose and fear into family.",
      callToAction: "There are more Maxes waiting. Be their rescue story.",
      image: "/public/story/story1.jpg",
    },
    {
      title: "She Didn’t Purr… Until She Felt Safe",
      text: "When Luna was found, she was hiding under an abandoned porch — soaked, starving, and silent. Her fur was matted, her body frail, and her eyes wide with fear. She didn’t trust hands. She didn’t purr. She barely moved. It took patience, a quiet corner, and gentle care. At first, she only came out at night to eat. Then slowly, a paw peeked out. A quiet meow. A glance that said, “Maybe… I can trust again.” Weeks passed, and something beautiful happened: Luna purred. Softly at first, then like music. Now she spends her days chasing sunbeams, curling up in laps, and purring like a little engine. She’s not just rescued — she’s reborn.",
      callToAction: "Luna’s story isn’t rare. It’s just waiting to be written — by someone like you.",
      image: "/public/story/story2.jpg",
    },
  ];

  return (
    <Section>
      <h2 data-aos="slide-right">Success Stories</h2>
      <Divider />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story, index) => (
          <Card key={index} className="flex flex-col mt-10">
            <CardHeader>
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-contain rounded-t-lg mb-4"
              />
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{story.text}</CardDescription>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">{story.callToAction}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default SuccessStories;
