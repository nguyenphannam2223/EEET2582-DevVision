import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
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
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().min(10, "Description too short"),
  requirements: z.string().min(10, "Requirements too short"),
  salaryRange: z.string().optional(),
});

export default function CreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salaryRange: ""
    },
  });

  const handleAddSkill = () => {
      if (skillInput.trim() && !skills.includes(skillInput.trim())) {
          setSkills([...skills, skillInput.trim()]);
          setSkillInput("");
      }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
      setSkills(skills.filter(s => s !== skillToRemove));
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const companyId = user?.id || user?._id;
    if (!companyId) return;

    try {
      await api.post('/jobs/jobs', {
          ...values,
          skills,
        companyId: companyId
      });
      navigate('/company/jobs');
    } catch (err) {
      console.error("Failed to create job", err);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior React Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                       {/* Ideally Textarea but Input for now as we didn't add textarea component */}
                      <Input placeholder="Job details..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <Input placeholder="Tech stack, experience..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="$2000 - $3000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills */}
              <div className="space-y-2">
                  <FormLabel>Skills</FormLabel>
                  <div className="flex gap-2">
                      <Input 
                        value={skillInput} 
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add skill (e.g. React)"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddSkill();
                            }
                        }}
                      />
                      <Button type="button" onClick={handleAddSkill}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                      {skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveSkill(skill)}>
                              {skill} ×
                          </Badge>
                      ))}
                  </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                 <Button type="button" variant="outline" onClick={() => navigate('/company/jobs')}>Cancel</Button>
                 <Button type="submit">Post Job</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
