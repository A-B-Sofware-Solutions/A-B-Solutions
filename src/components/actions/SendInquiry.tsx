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
import { Label } from '@/components/ui/label';

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

// interface SendInquiryProps {
//   children?: React.ReactNode;
// }

export default function SendInquiry() {
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
      <SheetTrigger asChild>
        <Button className={'w-full'}>Get Started</Button>
      </SheetTrigger>
      <SheetContent side={'top'} className="w-screen max-w-2xl p-4">
        <SheetHeader>
          <SheetTitle>Inquiry</SheetTitle>
          <SheetDescription>
            Send us a message and we'll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="subject">Subject</Label>
                <Input {...form.register('subject')} />
                <FormMessage />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="description">Description</Label>
                <Textarea {...form.register('description')} />
                <FormMessage />
              </div>

              <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="inquiryType">Inquiry Type</Label>
                  <Select {...form.register('inquiryType')}>
                    <SelectTrigger className="w-[220px]">
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
                  <FormMessage />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company/Academic Institution</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('company')}
                  />
                  <FormMessage />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="salutation">Salutation</Label>
                <Select {...form.register('salutation')}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="- Please Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>

              <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First Name</Label>

                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('firstName')}
                  />
                  <FormMessage />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('lastName')}
                  />
                  <FormMessage />
                </div>
              </div>
              <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('email')}
                  />
                  <FormMessage />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('phone')}
                  />
                  <FormMessage />
                </div>
              </div>
              <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="max-w-sm"
                    {...form.register('city')}
                  />
                  <FormMessage />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="country">Country</Label>
                  <Select {...form.register('country')}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="- Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: any, idx) => (
                        <SelectItem key={idx} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </div>
              <div className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="communication">Preferred Communication</Label>
                  <Select {...form.register('communication')}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="- Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="communication">
                    Please type the code below{' '}
                  </Label>
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
                    <Input
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="max-w-sm"
                      {...form.register('code')}
                    />
                  </div>
                  <FormMessage />
                </div>
              </div>
              <SheetFooter>
                <Button type="submit">Submit</Button>

                <SheetClose>Close</SheetClose>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
