import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

async function loadCountries(): Promise<string[]> {
  const response = await fetch('https://restcountries.com/v2/all');
  const data = await response.json();
  return data.map((country: any) => country.name);
}

const schema = z.object({
  subject: z.string(),
  description: z.string(),
  company: z.string().optional(),
  inquiryType: z.enum([
    'General Inquiry',
    'Project Development',
    'Software Maintenance',
    'Technical Support',
    'Collaboration Opportunity',
    'Other',
  ]),
  salutation: z.enum(['Mr.', 'Ms.']).optional(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  country: z.string(),
  city: z.string().optional(),
  communication: z.enum(['email', 'phone']),
  code: z.string(),
  newsletter: z.boolean().optional(),
  termsAndConditions: z.boolean(),
});

type Inquiry = z.infer<typeof schema>;

interface SendInquiryProps {
  children?: React.ReactNode;
}

export default function SendInquiry({ children }: SendInquiryProps) {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    loadCountries().then((countries) => setCountries(countries));
  }, []);

  const form = useForm<Inquiry>({
    resolver: zodResolver(schema),
    defaultValues: {
      newsletter: false,
      termsAndConditions: false,
    },
  });

  function onSubmit(values: Inquiry) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild onClick={() => console.log('pressed')}>
        {children}
      </SheetTrigger>
      <SheetContent side={'top'} className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Inquiry</SheetTitle>
          <SheetDescription>
            <p>
              Send us a message and we'll get back to you as soon as possible.
            </p>
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <FormLabel htmlFor="subject">Subject</FormLabel>
                    <Input {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex sm:flex-col gap-2">
              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="inquiryType">Inquiry Type</FormLabel>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="- Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="General Inquiry">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="Project Development">
                            Project Development
                          </SelectItem>
                          <SelectItem value="Software Maintenance">
                            Software Maintenance
                          </SelectItem>
                          <SelectItem value="Technical Support">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="Collaboration Opportunity">
                            Collaboration Opportunity
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="company">Company</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex sm:flex-col gap-2">
              <FormField
                control={form.control}
                name="salutation"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="salutation">Salutation</FormLabel>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="- Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:flex-col gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:flex-col gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <FormLabel htmlFor="country">Country</FormLabel>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="- Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country: any) => (
                            <SelectItem value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:flex-col gap-2">
              <FormField
                control={form.control}
                name="communication"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="communication">
                        Preferred Communication
                      </FormLabel>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="- Please Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FormLabel htmlFor="communication">
                        Please type the code below{' '}
                      </FormLabel>
                      <div className="flex flex-col w-full max-w-sm items-center space-x-2">
                        <div className="flex w-full max-w-sm items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Code"
                            readOnly
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck="false"
                          />
                          <Button type="submit">Refresh</Button>
                        </div>
                        <Input {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
