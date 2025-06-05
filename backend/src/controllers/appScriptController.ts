import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '../../generated/prisma/index.js';
const prisma = new PrismaClient();

import { InquiryBodyInput } from '../types/appScriptTypes.js';

const submitHandler = async (req: Request<{}, {}, InquiryBodyInput>, res: Response) => {
  const body = req.body;

  try {
    const data: Prisma.inquiriesCreateInput = {
      full_name: body["Full Name"],
      phone_number: new Prisma.Decimal(body["Phone Number"]),
      date_of_birth: new Date(body["Date of Birth"]),
      gender: body["Gender"],
      email: body["Email"] || body["Email Address"] || null,
      reference: body["Reference"],
      current_address: body["Current Address"] || null,
      permanent_address: body["Permanent Address"] || null,
      course_selection: body["Which course are you looking for?"] || null,
      course_duration: body["Course Duration"] || null,
      user_availability: body["How many hours can you invest daily / monthly?"] || null,
      job_guarentee: body["Are you looking for 100% Job guarantee?"] || null,
      job_assistance: body["Are you interested in Job Assistance?"] || null,
      job_location: body["Preferred Job Location"] || null,
      expected_package: body["How much package do you wish to have?"] || null,
      future_goal: body["Where do you want to see yourself after 5 years?"] || null,
      career_transition_reason: body["Why do you want to shift into IT from any other field? (For Non - Technical)"] || null,
      recent_education: body["Last Education"] || null,
      passing_year:
        body["Passing Year"] && !isNaN(Number(body["Passing Year"]))
          ? new Prisma.Decimal(Number(body["Passing Year"]))
          : null,
      cgpa: body["CGPA"] && !isNaN(Number(body["CGPA"])) ? parseFloat(body["CGPA"]) : null,
    };

    const inquiry = await prisma.inquiries.create({ data });

    res.status(200);
  } catch (err) {
    console.error('Error saving to Supabase:', err);
    res.status(500);
  }
};

export default submitHandler;