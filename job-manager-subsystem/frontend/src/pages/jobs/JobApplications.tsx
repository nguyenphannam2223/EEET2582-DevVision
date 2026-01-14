import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Application {
    _id: string;
    applicantName: string;
    applicantEmail: string;
    status: string;
    resumeUrl: string;
    coverLetter: string;
    createdAt: string;
}

export default function JobApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    if (jobId) {
        api.get<Application[]>(`/jobs/applications/job/${jobId}`)
           .then(setApplications)
           .catch(console.error);
    }
  }, [jobId]);

  return (
    <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* List */}
            <div className="md:col-span-1 space-y-4">
                 {applications.length === 0 && <p>No applications yet.</p>}
                 {applications.map(app => (
                     <Card 
                        key={app._id} 
                        className={`cursor-pointer transition-colors hover:bg-gray-50 ${selectedApp?._id === app._id ? 'border-primary' : ''}`}
                        onClick={() => setSelectedApp(app)}
                     >
                         <CardHeader className="p-4">
                             <div className="flex justify-between">
                                <CardTitle className="text-base">{app.applicantName}</CardTitle>
                                <Badge variant="outline">{app.status}</Badge>
                             </div>
                             <p className="text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                         </CardHeader>
                     </Card>
                 ))}
            </div>

            {/* Detail View */}
            <div className="md:col-span-2">
                {selectedApp ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{selectedApp.applicantName}</CardTitle>
                            <p className="text-gray-500">{selectedApp.applicantEmail}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                 <h4 className="font-semibold mb-2">Cover Letter</h4>
                                 <div className="p-4 bg-gray-50 rounded-md text-sm whitespace-pre-wrap">
                                     {selectedApp.coverLetter || "No cover letter provided."}
                                 </div>
                             </div>
                             <div>
                                 <h4 className="font-semibold mb-2">Resume</h4>
                                 <Button variant="outline" asChild>
                                     <a href={selectedApp.resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume</a>
                                 </Button>
                             </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed rounded-lg">
                        Select an application to view details
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
