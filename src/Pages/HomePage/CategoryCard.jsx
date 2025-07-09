import { Card } from "@/components/ui/card";
import { Dog } from "lucide-react";
import React from "react";

function CategoryCard({icon="", iconName=''}) {
  return (
    <Card className="bg-card p-10 w-3xs">
      <div className="flex justify-around gap-4 items-center">
        <div className="bg-secondary rounded-full p-5 flex justify-center items-center">
          {icon}
        </div>
        <h4>{iconName}</h4>
      </div>
    </Card>
  );
}

export default CategoryCard;
