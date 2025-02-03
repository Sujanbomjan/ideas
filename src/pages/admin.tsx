"use client";

import { useEffect, useState } from "react";
import { Table } from "rizzui";
import { Button } from "rizzui";
import { Trash2 } from "lucide-react";
import "../app/globals.css";

interface SubmissionData {
  _id: string;
  name: string;
  message: string;
}

const AdminPage = () => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await fetch("/api/submissions");
        if (!res.ok) throw new Error("Failed to fetch submissions");
        const data = await res.json();
        setSubmissions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      const res = await fetch(`/api/submissions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete submission");
  
      // Update the state to reflect the deletion
      setSubmissions((prev) => prev.filter((submission) => submission._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold text-indigo-600">Loading...</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-700">Admin Panel</h1>
      {submissions.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No submissions found.</p>
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <Table className="w-full">
            <Table.Header className="text-black bg-gray-300 p-4">
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Message</Table.Head>
                <Table.Head>Action</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {submissions.map((submission) => (
                <Table.Row key={submission._id} className="text-black p-4 text-center">
                  <Table.Cell>{submission.name}</Table.Cell>
                  <Table.Cell>{submission.message}</Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="solid"
                      className="text-red-600 hover:bg-red-100 rounded-full p-2"
                      onClick={() => handleDelete(submission._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
