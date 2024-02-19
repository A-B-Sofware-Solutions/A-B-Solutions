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

import { Form } from '@/components/ui/form';
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
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Label } from '@/components/ui/label';

import { getValues } from '@/lib/enum';
import generateCaptcha from '@/utils/generateCapcha';

async function loadCountries(): Promise<string[]> {
  const response = await fetch('https://restcountries.com/v2/all');
  const data = await response.json();
  return data.map((country: any) => country.name);
}

const schema = z.object({
  subject: z.string().min(1, { message: 'Too short' }),
  description: z.string().min(1, { message: 'Too short' }),
  company: z.string().optional(),
  inquiryType: z.enum([
    'General Inquiry',
    'Project Development',
    'Software Maintenance',
    'Technical Support',
    'Collaboration Opportunity',
    'Other',
  ]),
  relationship: z.enum([
    'Customer',
    'Partner',
    'Employee',
    'Consultant',
    'Other',
  ]),
  salutation: z.enum(['Mr.', 'Ms.']).optional(),
  firstName: z.string().min(1, { message: 'Too short' }),
  lastName: z.string().min(1, { message: 'Too short' }),
  email: z.string().email().trim().max(18).min(1),
  // check if phone number is valid
  phone: z
    .string()
    .min(10, { message: 'Too short' })
    .refine((value) => {
      return /^\d+$/.test(value);
    }),
  country: z.string(),
  city: z.string().optional(),
  communication: z.enum(['email', 'phone']),
  code: z.string(),
  newsletter: z.boolean().optional(),
  termsAndConditions: z.boolean().optional(),
});

type Inquiry = z.infer<typeof schema>;

interface SendInquiryProps {
  isHero?: boolean;
}

export default function SendInquiry({ isHero }: SendInquiryProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState<string>(generateCaptcha());

  useEffect(() => {
    loadCountries().then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    if (isHero) {
      form.setValue('email', localStorage.getItem('email'));
    }
  }, [isHero]);

  const form = useForm<Inquiry>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      newsletter: false,
      termsAndConditions: false,
    },
  });

  const onSubmit: SubmitHandler<Inquiry> = async (values) => {
    console.log(values);
    if (values.code !== captcha) {
      form.setError('code', {
        type: 'manual',
        message: 'Invalid code',
      });
      return;
    }

    console.log(values);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isHero ? (
          <Button
            id="getStartedButton"
            className="rounded-3xl py-6 px-4 sm:px-6"
          >
            <span className="hidden sm:block">Inquire now </span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block sm:hidden"
            >
              <path
                d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        ) : (
          <Button className={'w-full'}>Inquire Now</Button>
        )}
      </SheetTrigger>
      <SheetContent side={'top'} className="mx-auto w-full max-w-2xl">
        <SheetHeader>
          <SheetTitle>Inquiry</SheetTitle>
          <SheetDescription>
            Send us a message and we'll get back to you as soon as possible.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <div className="flex flex-col mt-4 p-2 gap-4 overflow-y-scroll h-screen pb-32">
              <div className="flex flex-col h-fit gap-2 w-full">
                <Label htmlFor="subject">
                  Subject: <span className="text-red-500">*</span>
                </Label>
                <Input {...form.register('subject')} />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="description">
                  Description: <span className="text-red-500">*</span>
                </Label>
                <Textarea {...form.register('description')} />
              </div>

              <div className="flex flex-wrap justify-between gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="inquiryType">
                    I am writing about: <span className="text-red-500">*</span>
                  </Label>
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
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company">Company/Academic Institution</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-56"
                    {...form.register('company')}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="relationship">
                    Relationship to us: <span className="text-red-500">*</span>
                  </Label>
                  <Select {...form.register('relationship')}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="- Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Consultant">Consultant</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">
                    First Name: <span className="text-red-500">*</span>
                  </Label>

                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-56"
                    {...form.register('firstName')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">
                    Last Name: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-56"
                    {...form.register('lastName')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between  gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">
                    Email: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-60"
                    {...form.register('email')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">
                    Phone Number: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-56"
                    {...form.register('phone')}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between  gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="min-w-56"
                    {...form.register('city')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="country">
                    Country: <span className="text-red-500">*</span>
                  </Label>
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
                </div>
              </div>
              <div className="flex flex-wrap justify-between gap-2 w-full">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="communication">
                    Preferred Communication:{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select {...form.register('communication')}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="- Please Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="communication">
                    Please type the code below:{' '}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Code"
                        readOnly
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        className="min-w-44"
                        value={captcha}
                      />
                      <Button
                        type="button"
                        onClick={() => setCaptcha(generateCaptcha())}
                      >
                        <span className="hidden sm:block">Refresh</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="block sm:hidden"
                        >
                          <path
                            d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </Button>
                    </div>
                    <Input
                      type="text"
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="min-w-56"
                      {...form.register('code')}
                    />
                  </div>
                </div>
              </div>
              <SheetFooter>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button type="submit" onSubmit={form.handleSubmit(onSubmit)}>
                    Submit
                  </Button>
                  <SheetClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
