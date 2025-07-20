import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import DonationCard from "./DonationCard";
import DonationCardSkeleton from "./DonationCardSkeleton";
import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

const LIMIT = 10;

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [, search] = queryKey;
  const res = await api.get(`/all-donation-campaigns?search=${search}&page=${pageParam}&limit=${LIMIT}`);
  return {
    pets: res.data.data,
    nextPage: res.data.nextPage,
  };
};

const DonationCampaign = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isPending,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["donations", debouncedSearch],
    queryFn: fetchPets,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    keepPreviousData: true,
  });


  const { ref: sentinelRef } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  const pets = data?.pages.flatMap((page) => page.pets) || [];
  
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <section className="mt-4">
      <h2 data-aos="slide-right">Support a Life, Make a Difference</h2>
     <p className="-mt-2" data-aos="slide-right">Your donation helps give pets a second chance at life, love, and a forever home.</p>
      <Separator className="mb-4" />

      {/* Search Input */}
      <div className="flex w-full mb-4 justify-center items-center gap-2" data-aos="fade-in">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          type="text"
          placeholder="🔍 Search pets"
        />
      </div>

      {/* Loading & Error */}
      {status === "error" && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}

      {/* Pet cards */}
      {isLoading || isPending ? (
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <DonationCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${
              isFetching && !isFetchingNextPage ? "opacity-50" : "opacity-100"
            }`}
          >
            {pets.map((pet) => (
              <DonationCard campaign={pet} />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={sentinelRef} className="h-10 mt-5">
            {isFetchingNextPage && (
              <h4 className="text-center text-sm text-gray-500">Loading more...</h4>
            )}
            {!hasNextPage && pets.length > 0 && (
              <h4 className="text-center text-sm text-gray-400">No more pets to show.</h4>
            )}
          </div>

          {/* No Results */}
          {pets.length === 0 && !isFetching && (
            <h4 className="text-center mt-4 text-gray-400">No pets found.</h4>
          )}
        </>
      )}
    </section>
  );
};

export default DonationCampaign;
