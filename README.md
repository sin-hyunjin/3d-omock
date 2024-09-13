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

# 3d-omock

## ERROR

mesh : 불필요한 주석 제거

- `mesh`와 `primitive` 컴포넌트에서 불필요한 텍스트와 공백 제거
- `Text is not allowed in the R3F tree` 오류를 해결하기 위해 JSX 문법을 정리
  ![alt text](./public/images/error//R3F.png)

```javascript
<mesh>
  <cylinderGeometry args={[0.44, 0.45, 0.1, 32]} />
  {/* roughness: 0.3 - 약간의 거칠기 추가, metalness: 0.2 - 금속성 추가 */}
  <meshStandardMaterial color={color} roughness={0} metalness={2} />
</mesh>
```
