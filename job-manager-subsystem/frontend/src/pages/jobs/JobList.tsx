import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Job {
    _id: string;
    title: string;
    description: string;
    status: 'open' | 'closed' | 'archived';
    skills: string[];
    createdAt: string;
}

export default function JobList() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (user?.id) {
       api.get<Job[]>(`/jobs/jobs/company/${user.id}`)
          .then(setJobs)
          .catch(console.error);
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Jobs</h1>
            <Button asChild>
                <Link to="/company/jobs/create">Post New Job</Link>
            </Button>
        </div>

        <div className="grid gap-4">
            {jobs.length === 0 && <p className="text-gray-500">No jobs posted yet.</p>}
            {jobs.map(job => (
                <Card key={job._id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="mt-1">
                                    Posted on {new Date(job.createdAt).toLocaleDateString()}
                                </CardDescription>
                             </div>
                             <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>{job.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {job.skills.map(skill => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <Link to={`/company/jobs/${job._id}/applications`}>View Applications</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
