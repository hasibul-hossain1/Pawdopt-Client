import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import PetCard from "./PetCard";
import { api } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { LoaderOne } from "@/components/ui/loader";
import { useState } from "react";

const LIMIT = 10;

const fetchPets = async ({ pageParam = 1, queryKey }) => {
  const [, search] = queryKey;
  const res = await api.get(`/pets?search=${search}&page=${pageParam}&limit=${LIMIT}`);
  return {
    pets: res.data.data,
    nextPage: res.data.nextPage,
  };
};

const PetList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["pets", debouncedSearch],
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
  
  return (
    <section className="mt-4">
      <h2>Available Pets</h2>
     <p className="-mt-2">Find your perfect furry (or feathery) companion</p>
      <Separator className="mb-4" />

      {/* Search Input */}
      <div className="flex w-full mb-4 justify-center items-center gap-2">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
          type="text"
          placeholder="🔍 Search pets"
        />
      </div>

      {/* Loading & Error */}
      {status === "loading" && <p className="text-center">Loading pets...</p>}
      {status === "error" && (
        <p className="text-center text-red-500">Error: {error.message}</p>
      )}

      {/* Pet cards */}
      <div
        className={`grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-300 ${
          isFetching && !isFetchingNextPage ? "opacity-50" : "opacity-100"
        }`}
      >
        {pets.map((pet) => (
          <PetCard
            key={pet._id}
            _id={pet._id}
            age={pet.petAge}
            location={pet.petLocation}
            name={pet.petName}
            image={pet.petImage}
          />
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
    </section>
  );
};

export default PetList;
