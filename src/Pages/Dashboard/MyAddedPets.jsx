import { useAuth } from '@/hooks/Auth';
import { api } from '@/lib/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';

const MyAddedPets = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;
  const queryClient = useQueryClient();

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: pets, isLoading, isError, error } = useQuery({
    queryKey: ['my-added-pets', email],
    queryFn: async () => {
      if (!email) return [];
      const res = await api.get(`/my-pets?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  const deletePetMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/pets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-added-pets']);
      toast.success('Pet deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete pet.', error.message);
    },
  });

  const adoptPetMutation = useMutation({
    mutationFn: async (id) => {
      await api.patch(`/pets/adopt/${id}`, { adopted: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['my-added-pets']);
      toast.success('Pet marked as adopted!');
    },
    onError: (error) => {
      toast.error('Failed to mark as adopted.', error.message);
    },
  });

  const columns = [
    {
      accessorKey: 'serialNumber',
      header: 'SL',
      cell: (info) => info.row.index + 1 + pagination.pageIndex * pagination.pageSize,
      enableSorting: false,
    },
    {
      accessorKey: 'petName',
      header: () => <span className="cursor-pointer">Pet Name</span>,
    },
    {
      accessorKey: 'petCategory',
      header: () => <span className="cursor-pointer">Pet Category</span>,
    },
    {
      accessorKey: 'petImage',
      header: 'Pet Image',
      cell: ({ row }) => (
        <Avatar>
          <AvatarImage src={row.original.petImage} alt={row.original.petName} />
          <AvatarFallback>{row.original.petName.charAt(0)}</AvatarFallback>
        </Avatar>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'adopted',
      header: 'Adoption Status',
      cell: ({ row }) => (
        <span className={row.original.adopted ? 'text-green-600' : 'text-red-600'}>
          {row.original.adopted ? 'Adopted' : 'Not Adopted'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          <Link state={row.original} to={`/dashboard/update-pet/${row.original._id}`}>
            <Button variant="outline" size="sm">
              <FaEdit />
            </Button>
          </Link>

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
                  This action cannot be undone. This will permanently delete your pet entry.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => deletePetMutation.mutate(row.original._id)}
                >
                  Yes, delete pet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            variant="outline"
            disabled={row.original.adopted}
            onClick={() => adoptPetMutation.mutate(row.original._id)}
          >
            <MdOutlinePets />
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: pets || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  });

  if (isLoading) return <div>Loading pets...</div>;
  if (isError) return <div>Error loading pets: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
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

export default MyAddedPets;
