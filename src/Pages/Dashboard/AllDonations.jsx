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
  FaTrash
} from "react-icons/fa";
import { Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from "@/components/ui/dialog";
import ViewDonorsModal from "./ViewDonorsModal";

const AllDonations = () => {
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
    queryKey: ["all-donation-campaigns", pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      const res = await api.get(`/all-donation-campaigns?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const pauseCampaignMutation = useMutation({
    mutationFn: async (id) => {
      const res=await api.patch(`/campaign-pause/${id}`)
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donation-campaigns"]);
      toast.success("Donation campaign Paused Update successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update donation campaign pause status.", error.message);
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/donation-campaigns/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-donation-campaigns"]);
      toast.success("Donation campaign deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete donation campaign.", error.message);
    },
  });

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "SL",
      cell: (info) => pagination.pageIndex * pagination.pageSize + info.row.index + 1,
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <FaTrash />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete this donation campaign.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => deleteCampaignMutation.mutate(row.original._id)}
                >
                  Yes, delete campaign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ViewDonorsModal campaignId={row.original._id} />
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: campaigns?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: campaigns?.total ? Math.ceil(campaigns.total / pagination.pageSize) : -1,
    state: {
      sorting,
      pagination,
    },
  });

  if (isLoading) return <TableSkeleton columns={columns} />;
  if (isError) return <div>Error loading donation campaigns.</div>;

  return (
    <div className="container mx-auto py-10" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4">All Donation Campaigns</h2>
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

export default AllDonations;