import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Card, CardHeader, CardDescription, CardAction } from "@/components/ui/card";

function DonationCardSkeleton() {
  return (
    <Card className="w-full bg-secondary hover:scale-105 duration-400 xs:w-xs">
      <div className="px-6 pt-6">
        <Skeleton height={192} className="w-full rounded-xl" />
      </div>
      <CardHeader>
        <Skeleton height={36} width="75%" />
      </CardHeader>
      <CardDescription className="px-6">
        <Skeleton count={3} />
      </CardDescription>
      <CardAction className="px-6 flex justify-end w-full pb-6">
        <Skeleton height={40} width={110} />
      </CardAction>
    </Card>
  );
}

export default DonationCardSkeleton;
