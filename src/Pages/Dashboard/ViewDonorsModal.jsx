import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaUsers } from 'react-icons/fa';

const ViewDonorsModal = ({ campaignId }) => {
  const { data: donors, isLoading, isError } = useQuery({
    queryKey: ['donors', campaignId],
    queryFn: async () => {
      const res = await api.get(`/my-donors/${campaignId}`);
      return res.data;
    },
    enabled: !!campaignId,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FaUsers />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Donors</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching donors.</div>
        ) : donors.length?<Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donated By</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Refunded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor._id}>
                  <TableCell>{donor.donatedBy}</TableCell>
                  <TableCell>${donor.amount}</TableCell>
                  <TableCell>{donor.refund ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>:<p className='text-center'>No donors found</p>}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDonorsModal;