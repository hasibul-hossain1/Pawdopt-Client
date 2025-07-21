import { useAuth } from '@/hooks/Auth';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableSkeleton from "./TableSkeleton";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const MyDonations = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: donations, isLoading, isError,refetch } = useQuery({
    queryKey: ['my-donations', email],
    queryFn: async () => {
      if (!email) return [];
      const res = await api.get(`/donate?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

const handleRefund=async(paymentIntentId,id)=>{
  console.log(paymentIntentId);
  const res=await api.post('refund',{paymentIntentId})
  if (res.data.success) {
    api.patch(`/updateRefund/${id}`,{refund:true})
    toast.success("Refund successful");
    refetch()
  }else{
    toast.error('Refund failed');
  }
}

  const columns = [
    {
      accessorKey: 'serialNumber',
      header: 'SL',
      cell: (info) => info.row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: 'petImage',
      header: 'Pet image',
      cell:({row})=>(<Avatar className='rounded-full'>
          <AvatarImage src={row.original.petImage} alt={row.original.petName} />
          <AvatarFallback>{row.original.campaignName.charAt(0)}</AvatarFallback>
        </Avatar>)
    },
    {
      accessorKey: 'petName',
      header: 'Pet name',
      cell:({row})=>row.original.campaignName
    },
    {
      accessorKey: 'donatedAmount',
      header: 'Donated Amount',
      cell:({row})=>row.original.amount
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell:({row})=>(<Dialog>
          <DialogTrigger asChild>
            <Button disabled={row.original.refund} variant="outline">
              {row.original.refund ? "refunded" : "refund"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Refund</DialogTitle>
              <DialogDescription>
                Are you sure you want to refund this donation? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                onClick={() => handleRefund(row.original.paymentIntentId, row.original._id)}
              >
                Confirm Refund
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>)
    },
  ];

  const table = useReactTable({
    data: donations || [],
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
  if (isError) return <div>Error loading donations.</div>;

  return (
    <div className="container mx-auto py-10" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4">My Donations</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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

export default MyDonations;