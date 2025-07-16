import { useAuth } from '@/hooks/Auth';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BiSolidNoEntry ,BiSolidCheckCircle } from "react-icons/bi";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

const AdoptionRequest = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;
  const queryClient = useQueryClient();

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: requests, isLoading, error, isError } = useQuery({
    queryKey: ['adoption-request', email],
    queryFn: async () => {
      if (!email) return [];
      const res = await api.get(`/pet-request?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const updateRequestStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      console.log(id);
      const res = await api.patch(`/adoption-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adoption-request', email]);
      toast.success('Adoption request updated successfully!');
    },
    onError: (err) => {
      toast.error('Failed to update adoption request: ' + err.message);
    },
  });

  const handleAccept = (id) => {
    updateRequestStatus.mutate({ id, status: 'accepted' });
  };

  const handleReject = (id) => {
    updateRequestStatus.mutate({ id, status: 'rejected' });
  };

  const columns = [
    {
      accessorKey: 'serialNumber',
      header: 'SL',
      cell: (info) => info.row.index + 1,
      enableSorting: false,
    },
    {
      accessorKey: 'petName',
      header: 'Pet Name',
    },
    {
      accessorKey: 'userName',
      header: 'Adopter Name',
    },
    {
      accessorKey: 'userEmail',
      header: 'Email',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone',
    },
    {
      accessorKey: 'address',
      header: 'Location',
    },
    {
      accessorKey: 'accepted',
      header: 'Status',
      cell: ({ row }) => (row.original.status),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <TableCell>
          
            <>
              <Button
                variant="outline"
                className=" mr-2"
                disabled={row.original.status==='accepted'}
                onClick={() => handleAccept(row.original._id)}
              >
                <BiSolidCheckCircle />
              </Button>
              <Button
              disabled={row.original.status==='rejected'}
                variant="outline"
                onClick={() => handleReject(row.original._id)}
              >
                <BiSolidNoEntry/>
              </Button>
            </>
          
        </TableCell>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: requests || [],
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

  if (isLoading) return <div>Loading adoption requests...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      {requests && requests.length > 0 ? (
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
      ) : (
        <p>No adoption requests found.</p>
      )}
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

export default AdoptionRequest;
