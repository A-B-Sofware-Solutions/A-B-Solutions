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

import { ScrollArea } from '../ui/scroll-area';

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

import generateCaptcha from '@/utils/generateCapcha';

async function loadCountries(): Promise<string[]> {
  const response = await fetch('https://restcountries.com/v2/all');
  const data = await response.json();
  return data.map((country: any) => country.name);
}

const inquiryTypeOptions = [
  'General Inquiry',
  'Project Development',
  'Software Maintenance',
  'Technical Support',
  'Collaboration Opportunity',
  'Other',
] as const;

const relationshipOptions = [
  'Customer',
  'Partner',
  'Employee',
  'Consultant',
  'Other',
] as const;

const salutationOptions = ['Mr.', 'Ms.'] as const;

const communicationOptions = ['email', 'phone'] as const;
const schema = z.object({
  subject: z.string(),
  description: z.string(),
  company: z.string().optional(),
  inquiryType: z.enum(inquiryTypeOptions),
  relationship: z.enum(relationshipOptions),
  salutation: z.enum(salutationOptions).optional(),
  firstName: z.string().min(1, { message: 'Too short' }),
  lastName: z.string().min(1, { message: 'Too short' }),
  email: z.string().email(),
  phone: z.string().min(10, { message: 'Too short' }),
  country: z.string(),
  city: z.string().optional(),
  communication: z.enum(communicationOptions),
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
            <ScrollArea className="h-[1000px] whitespace-nowrap">
              <div className="flex flex-col gap-4 mt-4 p-2">
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="subject">
                    Subject: <span className="text-red-500">*</span>
                  </Label>
                  <Input {...form.register('subject')} />
                </div>
                <div className="flex flex-col gap-2 w-full min-w-[280px]">
                  <Label htmlFor="description">
                    Description: <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    className="w-[280px] has-[300px]:w-full"
                    {...form.register('description')}
                  />
                </div>

                <div className="flex flex-wrap justify-between gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="inquiryType">
                      I am writing about:{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select {...form.register('inquiryType')}>
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="- Please Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypeOptions.map((inquiryType, idx) => (
                          <SelectItem key={idx} value={inquiryType}>
                            {inquiryType}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company">
                      Company/Academic Institution
                    </Label>
                    <Input
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="w-[280px]"
                      {...form.register('company')}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap justify-between  gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="relationship">
                      Relationship to us:{' '}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select {...form.register('relationship')}>
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="- Please Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {relationshipOptions.map((relationship, idx) => (
                          <SelectItem key={idx} value={relationship}>
                            {relationship}
                          </SelectItem>
                        ))}
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
                        {salutationOptions.map((salutation, idx) => (
                          <SelectItem key={idx} value={salutation}>
                            {salutation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between  gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">
                      First Name: <span className="text-red-500">*</span>
                    </Label>

                    <Input
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      className="w-[280px]"
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
                      className="w-[280px]"
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
                      className="w-[280px]"
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
                      className="w-[280px]"
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
                      className="w-[280px]"
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
                <div className="flex flex-wrap justify-between  gap-2 w-full">
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
                        {communicationOptions.map((communication, idx) => (
                          <SelectItem key={idx} value={communication}>
                            {communication}
                          </SelectItem>
                        ))}
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
                          className="w-[280px]"
                          value={captcha}
                        />
                        <Button
                          type="button"
                          onClick={() => setCaptcha(generateCaptcha())}
                        >
                          Refresh
                        </Button>
                      </div>
                      <Input
                        type="text"
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        className="w-[280px]"
                        {...form.register('code')}
                      />
                    </div>
                  </div>
                </div>

                <SheetFooter>
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
                </SheetFooter>
              </div>
            </ScrollArea>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
