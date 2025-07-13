import { useAuth } from '@/hooks/Auth';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
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

const AdoptionRequest = () => {
  const currentUser = useAuth();
  const email = currentUser.data?.email;
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['adoption-request', email],
    queryFn: async () => {
      if (!email) return []; // Return empty if email is not available yet
      const res = await api.get(`/pet-request?email=${email}`);
      return res.data;
    },
    enabled: !!email, // Only run query if email is available
  });
  console.log(data);

  const updateRequestStatus = useMutation({
    mutationFn: async ({ id, status }) => {
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

  if (isLoading) return <div>Loading adoption requests...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Adoption Requests</h2>
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet Name</TableHead>
                <TableHead>Adopter Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((request) => (
                
                <TableRow key={request._id}>
                  <TableCell>{request.petName}</TableCell>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.userEmail}</TableCell>
                  <TableCell>{request.phoneNumber}</TableCell>
                  <TableCell>{request.address}</TableCell>
                  <TableCell>{request.accepted?"accepted":"pending"}</TableCell>
                  <TableCell>
                    {request.accepted === false && (
                      <>
                        <Button
                          variant="outline"
                          className=" mr-2"
                          onClick={() => handleAccept(request._id)}
                        >
                        <BiSolidCheckCircle />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReject(request._id)}
                        >
                          <BiSolidNoEntry/>
                        </Button>
                      </>
                    )}
                    {console.log(request)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p>No adoption requests found.</p>
      )}
    </div>
  );
};

export default AdoptionRequest;
