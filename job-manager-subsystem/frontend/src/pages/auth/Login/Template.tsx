import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { UseFormReturn } from 'react-hook-form';
import type { LoginFormValues } from './schema';

interface TemplateProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (values: LoginFormValues) => Promise<void>;
  error: string | null;
}

export function Template({ form, onSubmit, error }: TemplateProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Company Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="hr@acme.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

              <Button type="submit" className="w-full">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
                Don't have an account? <Link to="/auth/register" className="text-primary hover:underline">Register</Link>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
