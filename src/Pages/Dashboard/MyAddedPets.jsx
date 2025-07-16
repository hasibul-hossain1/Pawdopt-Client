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

const MyAddedPets = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;
  const queryClient = useQueryClient();

  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: pets, isLoading, isError,error } = useQuery({
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
      accessorKey: 'petCategory',
      header: 'Pet Category',
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
      cell: ({ row }) => (row.original.adopted ? 'Adopted' : 'Not Adopted'),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
           <Link to={`/pets/${row.original._id}`}>
           <Button
              variant="outline"
              size="sm"
            >
              <FaEye />
            </Button>
           </Link>
          
          <Link to={`/dashboard/update-pet/${row.original._id}`}>
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
                  This action cannot be undone. This will permanently delete your
                  pet entry.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => deletePetMutation.mutate(row.original._id)}>
                  Yes, delete pet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
         
           
        </div>
      ),
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: pets || [],
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

  if (isLoading) return <div>Loading pets...</div>;
  console.log(error);
  if (isError) return <div>Error loading pets.</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>
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

export default MyAddedPets;