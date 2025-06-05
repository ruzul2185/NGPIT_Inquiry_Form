1. npm install

2. npx prisma init

3. npx prisma db pull

4. npx prisma generate

5. npm run dev

note: the import used in appScriptController.ts file should be imported from the "../generate/prisma" not the "@/prisma/client" as it would not have the schema design and will throw that error.