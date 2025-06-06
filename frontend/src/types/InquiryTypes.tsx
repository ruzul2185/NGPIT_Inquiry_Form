export interface InquiryListEntry {
  id: string;                // BigInt in Prisma, usually mapped to number in TS
  full_name: string;
  phone_number: number;      // Decimal mapped to number, or string if very large
  date_of_birth: string;     // DateTime usually handled as ISO string in frontend
  gender: string;
  email?: string | null;     // email is optional in schema
  reference: string;
  created_at: string;        // DateTime handled as ISO string
}

export interface SingleEntry {
  data: InquiryListEntry;
}