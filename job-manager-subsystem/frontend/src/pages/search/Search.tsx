import { useState, useCallback } from 'react';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Applicant {
  _id: string;
  name: string;
  headline: string;
  skills: string[];
  summary: string;
  avatarUrl?: string;
}

export default function Search() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
      if (!query.trim()) return;
      setLoading(true);
      try {
          const data = await api.get<Applicant[]>(`/search/applicants?q=${encodeURIComponent(query)}`);
          setResults(data);
          setSearched(true);
      } catch (err) {
          console.error("Search failed", err);
      } finally {
          setLoading(false);
      }
  }, [query]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  }

  // Mock Favorite Function
  const toggleFavorite = (id: string) => {
      console.log('Toggle favorite for', id);
      // In real implementation, call Company Service to add to favorites
  }

  // Mock Warning Function (Req 5.3.2)
  const toggleWarning = (id: string) => {
    console.log('Toggle warning for', id);
   }

  return (
    <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
             <h1 className="text-3xl font-bold">Applicant Search</h1>
             {user?.role === 'company' && (
                 <Button variant="outline" onClick={() => navigate('/company/jobs')}>Back to Dashboard</Button>
             )}
        </div>

        <div className="flex gap-2 max-w-2xl mx-auto">
            <Input 
                placeholder="Search by skills, title, or keywords (e.g. React, Java)..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-lg py-6"
            />
            <Button size="lg" onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {searched && results.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                    No applicants found matching your criteria.
                </div>
            )}
            
            {results.map(applicant => (
                <Card key={applicant._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row gap-4 items-start pb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            <img 
                                src={applicant.avatarUrl || `https://ui-avatars.com/api/?name=${applicant.name}`} 
                                alt={applicant.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg truncate">{applicant.name}</CardTitle>
                            <CardDescription className="line-clamp-1">{applicant.headline}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3 h-14">
                            {applicant.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4 h-16 overflow-hidden content-start">
                            {applicant.skills.map(skill => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                        <div className="flex gap-2 pt-2 border-t mt-2">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex-1 text-xs"
                                onClick={() => toggleFavorite(applicant._id)}
                            >
                                Favorite
                            </Button>
                             <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex-1 text-xs text-yellow-600 hover:text-yellow-700"
                                onClick={() => toggleWarning(applicant._id)}
                            >
                                Warn
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                                View Profile
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
