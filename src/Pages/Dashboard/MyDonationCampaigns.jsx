import { useAuth } from "@/hooks/Auth";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "./TableSkeleton";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { toast } from "sonner";
import {
  FaEdit,
  FaRegPauseCircle,
  FaRegPlayCircle,
} from "react-icons/fa";
import ViewDonorsModal from "./ViewDonorsModal";

const MyDonationCampaigns = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;
  const queryClient = useQueryClient();

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: campaigns,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-donation-campaigns", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await api.get(`/my-donation-campaigns?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });
  

  const pauseCampaignMutation = useMutation({
    mutationFn: async (id) => {
      const res=await api.patch(`/campaign-pause/${id}`)
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-donation-campaigns"]);
      toast.success("Donation campaign Paused Update successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete donation campaign.", error.message);
    },
  });

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "SL",
      cell: (info) => info.row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: "petName",
      header: "Pet Name",
      cell: ({ row }) => row.original.petName,
    },
    {
      accessorKey: "maxDonationAmount",
      header: "Max Donation Amount",
    },
    {
      accessorKey: "lastDateOfDonation",
      header: "Last Date of Donation",
      cell: ({ row }) => new Date(row.original.lastDate).toLocaleDateString(),
    },
    {
      accessorKey: "donationRaised",
      header: "DonationRaised",
      cell: ({ row }) => row.original.donationRaised,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.donatedAmount >= row.original.maxDonationAmount ||
        new Date(row.original.lastDate) < new Date()
          ? "Closed"
          : "Running",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/dashboard/edit-campaign/${row.original._id}`}>
            <Button variant="outline" size="sm">
              <FaEdit />
            </Button>
          </Link>
          <Button onClick={()=>pauseCampaignMutation.mutate(row.original._id)} variant="outline" size="sm">
            {row.original?.paused ? <FaRegPlayCircle /> : <FaRegPauseCircle/>}
          </Button>
          <ViewDonorsModal campaignId={row.original._id} />
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: campaigns || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  if (isLoading) return <TableSkeleton columns={columns} />;
  if (isError) return <div>Error loading donation campaigns.</div>;

  return (
    <div className="container mx-auto py-10" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4">My Donation Campaigns</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaigns;
