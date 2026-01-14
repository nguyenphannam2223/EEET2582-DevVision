import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types
interface CompanyProfile {
    _id: string;
    companyId: string;
    name: string;
    email: string;
    country: string;
    city?: string;
    address?: string;
    phoneNumber?: string;
    logoUrl?: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        country: "",
        city: "",
        address: "",
        phoneNumber: ""
    }
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      // Create a proxy endpoint or call company service directly via gateway
      // Since user.id matches companyId
      const data = await api.get<CompanyProfile>(`/companies/${user?.id}`);
      setProfile(data);
      form.reset({
          name: data.name,
          country: data.country,
          city: data.city || "",
          address: data.address || "",
          phoneNumber: data.phoneNumber || ""
      });
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
          const updatedProfile = await api.put<CompanyProfile>(`/companies/${user?.id}`, values);
          setProfile(updatedProfile);
          setIsEditing(false);
      } catch (err) {
          console.error("Failed to update profile", err);
      }
  }

  const handleLogoUpload = async () => {
      if (!logoFile) return;
      try {
          setUploading(true);
          const formData = new FormData();
          formData.append('logo', logoFile);
          
          const updatedProfile = await api.postMultipart<CompanyProfile>(`/companies/${user?.id}/logo`, formData);
          setProfile(updatedProfile);
          setLogoFile(null);
          setUploading(false);
      } catch (err) {
          console.error("Failed to upload logo", err);
          setUploading(false);
      }
  }

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Company Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Card */}
            <Card className="md:col-span-1">
                <CardHeader>
                    <CardTitle>Logo</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 rounded-full border-2 border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50">
                        {profile.logoUrl ? (
                            <img src={`http://localhost:3000${profile.logoUrl}`} alt="Company Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">No Logo</span>
                        )}
                    </div>
                    <div className="w-full space-y-2">
                        <Input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setLogoFile(e.target.files?.[0] || null)} 
                        />
                        <Button 
                            className="w-full" 
                            disabled={!logoFile || uploading}
                            onClick={handleLogoUpload}
                        >
                            {uploading ? 'Uploading...' : 'Update Logo'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Details Card */}
            <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Company Details</CardTitle>
                    {!isEditing && (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button> 
                    )}
                </CardHeader>
                <CardContent>
                    {isEditing ? (
                         <Form {...form}>
                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                           <FormField
                             control={form.control}
                             name="name"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Company Name</FormLabel>
                                 <FormControl>
                                   <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Vietnam">Vietnam</SelectItem>
                                            <SelectItem value="Singapore">Singapore</SelectItem>
                                            <SelectItem value="USA">USA</SelectItem>
                                            <SelectItem value="Australia">Australia</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                           <FormField
                             control={form.control}
                             name="address"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Address</FormLabel>
                                 <FormControl>
                                   <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                            <FormField
                             control={form.control}
                             name="phoneNumber"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Phone Number</FormLabel>
                                 <FormControl>
                                   <Input {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
             
                           <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button type="submit">Save Changes</Button>
                           </div>
                         </form>
                       </Form>
                    ) : (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Name</h4>
                                    <p>{profile.name}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Email</h4>
                                    <p>{profile.email}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Country</h4>
                                    <p>{profile.country}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">City</h4>
                                    <p>{profile.city || '-'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Address</h4>
                                    <p>{profile.address || '-'}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm text-gray-500">Phone</h4>
                                    <p>{profile.phoneNumber || '-'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
