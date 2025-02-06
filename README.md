This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
"# hackaton" 
"# Hackathon-Figma" 
"# Hackathon-Figma" 

## Test Cases

Below is the list of test cases for the application:

| Test Case ID | Description | Steps | Expected Result | Actual Result | Status | Remarks |
|--------------|---------------------------------|---------------------------------------------------|-------------------------------|-----------------------------|---------|---------------------------|
| TC001 | Validate chef listing | Open "Our Chef" page > Verify chef profiles | Chef profiles displayed | Chef profiles displayed | Passed | No issues found |
| TC002 | Test product page functionality| Navigate to product page > Verify products loaded| Products displayed correctly | Products displayed correctly| Passed | Works as expected |
| TC003 | Validate cart addition | Add item to cart > Check cart icon | Cart updates with item count | Cart updates with item count| Passed | Cart functionality verified|
| TC004 | Test search functionality | Use search bar > Enter valid/invalid queries | Shows relevant/no results | Displays correct results | Passed | Works as expected |
| TC005 | Check header navigation links | Click each header link > Verify navigation | Correct pages open | Correct pages open | Passed | Navigation functional |
| TC006 | Test mobile responsiveness | Resize browser window > Check layout behavior | Layout adjusts for mobile view| Layout adjusts correctly | Passed | Responsive verified |
| TC007 | API error handling on discounts| Trigger discount API > Verify fallback handling | Shows fallback message | Fallback message shown | Passed | Error handled gracefully |
| TC008 | Validate chef profile details | Click on chef > Verify profile details | Details load correctly | Details load correctly | Passed | No issues found |
| TC009 | Test footer navigation links | Click each footer link > Verify navigation | Footer links work correctly | Footer links work correctly | Passed | Footer functional
