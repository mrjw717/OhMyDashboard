"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import { GlassTabs, GlassTab } from "@/components/ui/glass-tabs"
import {
  SmartInput,
  SmartInputName,
  SmartInputFirstName,
  SmartInputLastName,
  SmartInputEmail,
  SmartInputPhone,
  SmartInputCurrency,
  SmartInputCreditCard,
  SmartInputZip,
  SmartInputDate,
} from "@/components/ui/smart-input"
import { SecureSSNInput } from "@/components/ui/secure-ssn-input"
import {
  SmartInputFieldFirstName,
  SmartInputFieldLastName,
  SmartInputFieldEmail,
  SmartInputFieldPhone,
  SmartInputFieldCurrency,
} from "@/components/ui/smart-input-field"
import { validators, CURRENCY_LIMITS } from "@/config/theme"
import { IconPhone, IconMail, IconUser, IconCreditCard, IconCurrencyDollar, IconShieldCheck } from "@tabler/icons-react"
import { toast } from "sonner"

/**
 * Schema for the showcase form.
 * Defines validation rules for first name, last name, email, phone, and salary fields.
 */
const showcaseSchema = z.object({
  firstName: validators.firstName,
  lastName: validators.lastName,
  email: validators.email,
  phone: validators.phoneUS,
  salary: validators.currencyOptional,
})

type ShowcaseFormData = z.infer<typeof showcaseSchema>

/**
 * List of countries with their codes, names, and phone number placeholder formats.
 */
const countries = [
  { code: "US", name: "United States", placeholder: "(555) 123-4567" },
  { code: "UK", name: "United Kingdom", placeholder: "07700 900 123" },
  { code: "CA", name: "Canada", placeholder: "(416) 555-0123" },
  { code: "DE", name: "Germany", placeholder: "030 123 4567" },
  { code: "FR", name: "France", placeholder: "06 12 34 56 78" },
  { code: "AU", name: "Australia", placeholder: "0412 345 678" },
]

/**
 * Inputs showcase page component.
 * Demonstrates various input components including smart inputs, secure inputs, and form integration.
 */
export default function InputsPage() {
  const [standaloneValues, setStandaloneValues] = React.useState<Record<string, string>>({})
  const [selectedCountry, setSelectedCountry] = React.useState<string>("US")
  const [activeTab, setActiveTab] = React.useState("standalone")

  const form = useForm<ShowcaseFormData>({
    resolver: zodResolver(showcaseSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      salary: "",
    },
  })

  /**
   * Handles form submission.
   * Displays a success toast with the submitted name.
   */
  const onFormSubmit = (data: ShowcaseFormData) => {
    toast.success("Form submitted successfully!", {
      description: `Welcome, ${data.firstName} ${data.lastName}!`,
    })
  }

  /**
   * Handles changes in standalone input components.
   * Updates the standaloneValues state with the new value.
   */
  const handleStandaloneChange = (name: string, value: string, _rawValue: string) => {
    setStandaloneValues((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--text-primary))]">
            Smart Input System
          </h1>
          <p className="text-[hsl(var(--text-secondary))] mt-1">
            Auto-formatting, validation, and seamless form integration.
          </p>
        </div>
        <GlassTabs value={activeTab} onValueChange={setActiveTab}>
          <GlassTab value="standalone">Standalone</GlassTab>
          <GlassTab value="form">Form Integration</GlassTab>
          <GlassTab value="variants">All Variants</GlassTab>
        </GlassTabs>
      </div>

      {activeTab === "standalone" && (
        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconUser className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Auto-capitalizes names while typing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SmartInputFirstName
                name="standalone-firstName"
                label="First Name"
                placeholder="type lowercase..."
                required
                onValueChange={(v, r) => handleStandaloneChange("firstName", v, r)}
              />
              <SmartInputLastName
                name="standalone-lastName"
                label="Last Name"
                placeholder="type lowercase..."
                required
                onValueChange={(v, r) => handleStandaloneChange("lastName", v, r)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconPhone className="h-5 w-5 text-primary" />
                Phone Numbers
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                6 countries with auto-formatting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {countries.map((country) => (
                  <Badge
                    key={country.code}
                    variant={selectedCountry === country.code ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCountry(country.code)}
                  >
                    {country.code}
                  </Badge>
                ))}
              </div>
              <SmartInputPhone
                name="standalone-phone"
                label="Phone Number"
                placeholder={countries.find((c) => c.code === selectedCountry)?.placeholder}
                country={selectedCountry as "US" | "UK" | "CA" | "DE" | "FR" | "AU"}
                onValueChange={(v, r) => handleStandaloneChange("phone", v, r)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconMail className="h-5 w-5 text-primary" />
                Email & Contact
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Auto-lowercases on blur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmartInputEmail
                name="standalone-email"
                label="Email Address"
                placeholder="JOHN.DOE@EXAMPLE.COM"
                onValueChange={(v, r) => handleStandaloneChange("email", v, r)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconCurrencyDollar className="h-5 w-5 text-primary" />
                Currency Input
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Max: {CURRENCY_LIMITS.maxFormatted}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmartInputCurrency
                name="standalone-salary"
                label="Annual Salary"
                placeholder="75000"
                onValueChange={(v, r) => handleStandaloneChange("salary", v, r)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconCreditCard className="h-5 w-5 text-primary" />
                Credit Card
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Auto-detects card type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmartInputCreditCard
                name="standalone-card"
                label="Card Number"
                onValueChange={(v, r) => handleStandaloneChange("card", v, r)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-6 xl:col-span-4 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconShieldCheck className="h-5 w-5 text-primary" />
                Secure SSN
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Shows last 4 only
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecureSSNInput
                name="standalone-ssn"
                label="Social Security Number"
                onValueChange={(v, m) => handleStandaloneChange("ssn", v, m)}
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-12 xl:col-span-6 card-themed bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[hsl(var(--text-primary))]">
                Current Values (Live)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-[hsl(var(--text-muted))] overflow-auto font-mono">
                {JSON.stringify(standaloneValues, null, 2)}
              </pre>
            </CardContent>
          </Card>

          <Card className="md:col-span-12 xl:col-span-6 card-themed">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[hsl(var(--text-primary))]">
                Size Variants
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SmartInput name="size-sm" label="Small" placeholder="Small input" size="sm" />
              <SmartInput name="size-default" label="Default" placeholder="Default input" size="default" />
              <SmartInput name="size-lg" label="Large" placeholder="Large input" size="lg" />
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "form" && (
        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-12 xl:col-span-8 card-themed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[hsl(var(--text-primary))]">
                <IconShieldCheck className="h-5 w-5 text-primary" />
                Form with Zod Validation
              </CardTitle>
              <CardDescription className="text-[hsl(var(--text-secondary))]">
                Validation triggers on blur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SmartInputFieldFirstName name="firstName" label="First Name" placeholder="John" required />
                    <SmartInputFieldLastName name="lastName" label="Last Name" placeholder="Doe" required />
                    <SmartInputFieldEmail name="email" label="Email Address" placeholder="john@example.com" required />
                    <SmartInputFieldPhone name="phone" label="Phone Number" placeholder="(555) 123-4567" country="US" required />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <SmartInputFieldCurrency name="salary" label="Expected Salary" placeholder="75000" helperText={`Max: ${CURRENCY_LIMITS.maxFormatted}`} />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit">Submit Form</Button>
                    <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="md:col-span-12 xl:col-span-4 card-themed bg-primary/5">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-[hsl(var(--text-primary))]">Form State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-[hsl(var(--text-secondary))]">Values:</span>
                  <pre className="text-xs text-[hsl(var(--text-muted))] mt-1 font-mono">{JSON.stringify(form.watch(), null, 2)}</pre>
                </div>
                <Separator />
                <div>
                  <span className="text-xs font-medium text-[hsl(var(--text-secondary))]">Errors:</span>
                  <pre className="text-xs text-[hsl(var(--text-muted))] mt-1 font-mono">{JSON.stringify(form.formState.errors, null, 2)}</pre>
                </div>
                <Separator />
                <div>
                  <span className="text-xs font-medium text-[hsl(var(--text-secondary))]">Touched:</span>
                  <pre className="text-xs text-[hsl(var(--text-muted))] mt-1 font-mono">{JSON.stringify(form.formState.touchedFields, null, 2)}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "variants" && (
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-12">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))]">Input Types</h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--color-success))] mr-1.5" />
                  Has Zod
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--text-muted))] mr-1.5" />
                  No Validation
                </Badge>
              </div>
            </div>
          </div>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputName name="demo-name" label="Full Name" placeholder="john doe" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: name</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputEmail name="demo-email" label="Email" placeholder="EMAIL@EXAMPLE.COM" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: email</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputPhone name="demo-phone" label="Phone (US)" country="US" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: phoneUS</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputCurrency name="demo-currency" label="Amount" placeholder="1234.56" />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: currency</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputCreditCard name="demo-card" label="Card Number" />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: creditCard + Luhn</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SecureSSNInput name="demo-ssn" label="SSN" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: ssn</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputZip name="demo-zip" label="ZIP Code" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: zipCode</Badge>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 xl:col-span-3 card-themed">
            <CardContent className="pt-6 space-y-2">
              <SmartInputDate name="demo-date" label="Date" required />
              <Badge variant="outline" className="text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--color-success))] mr-1" />Zod: date</Badge>
            </CardContent>
          </Card>

          <div className="md:col-span-12">
            <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))] mb-4">Style Variants</h2>
          </div>

          <Card className="md:col-span-4 card-themed">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[hsl(var(--text-primary))]">Default</CardTitle></CardHeader>
            <CardContent><SmartInput name="style-default" label="Label" placeholder="Default style" variant="default" /></CardContent>
          </Card>

          <Card className="md:col-span-4 card-themed">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[hsl(var(--text-primary))]">Ghost</CardTitle></CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4">
                <SmartInput name="style-ghost" label="Label" placeholder="Ghost style" variant="ghost" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-4 card-themed">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-[hsl(var(--text-primary))]">Filled</CardTitle></CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4">
                <SmartInput name="style-filled" label="Label" placeholder="Filled style" variant="filled" />
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-12">
            <h2 className="text-lg font-semibold text-[hsl(var(--text-primary))] mb-4">Validation States</h2>
          </div>

          <Card className="md:col-span-3 card-themed">
            <CardContent className="pt-6">
              <SmartInput name="state-required" label="Required" placeholder="Enter value" required />
              <p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Red * until valid</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 card-themed">
            <CardContent className="pt-6">
              <SmartInput name="state-required-valid" label="Required" placeholder="John Doe" value="John Doe" required validated />
              <p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Green * when validated</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 card-themed">
            <CardContent className="pt-6">
              <SmartInput name="state-optional-valid" label="Optional" placeholder="Any value" value="Some value" validated />
              <p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Green ✓ when validated (not required)</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-3 card-themed">
            <CardContent className="pt-6">
              <SmartInput name="state-error" label="Error" error="Invalid email format" value="bademail" readOnly />
              <p className="text-[10px] text-[hsl(var(--text-muted))] mt-2">Error in bottom-right</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
