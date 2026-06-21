import { redirect } from 'next/navigation';

// Legacy alias. The canonical zodiac tool lives at /zodiac-compatibility-calculator
// (served per-locale via the [locale] segment). Redirect so the old URL keeps
// working without rendering under the html/body-less root layout.
export default function ZodiacCalculatorRedirect() {
  redirect('/zodiac-compatibility-calculator');
}
