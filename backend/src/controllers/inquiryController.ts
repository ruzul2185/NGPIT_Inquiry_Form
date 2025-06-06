import { Request, Response } from 'express';
import prisma from '../client/prismaClient';
import calculateAge from '../utils/inquiryUtils';

import { Prisma } from '../../generated/prisma/index';

import { InquiryBodyInput } from '../types/appScriptTypes';

const getAllInquiries = async (req: Request, res: Response) => {
    try {
        const inquiries = await prisma.inquiries.findMany({
            select: {
                id: true,
                full_name: true,
                phone_number: true,
                date_of_birth: true,
                gender: true,
                email: true,
                reference: true,
                created_at: true,
            },
             orderBy: {
                created_at: 'desc',  // Sort by created_at descending
          },
        });

        if (!inquiries || inquiries.length === 0) {
            res.status(404).json({ message: 'No inquiries found' });
            return;
        }

        // Convert BigInt fields to strings
        const sanitized = inquiries.map(inquiry => {
            // Convert BigInt fields to string and compute age
            const sanitizedInquiry: any = {};

            for (const key in inquiry) {
                const value = inquiry[key as keyof typeof inquiry];
                sanitizedInquiry[key] = typeof value === 'bigint' ? value.toString() : value;
            }

            // Add age field
            sanitizedInquiry.age = calculateAge(sanitizedInquiry.date_of_birth);

            return sanitizedInquiry;
        });

        res.status(200).json(sanitized);
        return;
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

const getSelectedInquiry = async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    try {
        const id = BigInt(req.params.id);

        if (!id) {
            res.status(400).json({ error: 'Invalid inquiry ID' });
            return;
        }

        const inquiry = await prisma.inquiries.findUnique({where: { id }});

        if (!inquiry) {
            res.status(404).json({ message: 'Inquiry not found' });
            return;
        }

        const sanitizedInquiry = {
            ...inquiry,
            id: inquiry.id.toString(), // or any other BigInt field
            passing_year: inquiry.passing_year ? inquiry.passing_year.toString() : null,
            cgpa: inquiry.cgpa ? inquiry.cgpa.toString() : null,
            age: calculateAge(inquiry.date_of_birth)
        };
        
        res.json(sanitizedInquiry);
        return;
        
    } catch (error) {
        console.error('Error fetching inquiry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

const createInquiry = async (req: Request<{}, {}, InquiryBodyInput>, res: Response) => {
    try {
        const body = req.body;

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
                    ? BigInt(body["Passing Year"])  // Changed from Prisma.Decimal to BigInt
                    : null,
            cgpa: body["CGPA"] && !isNaN(Number(body["CGPA"])) 
                ? BigInt(Math.round(Number(body["CGPA"])))  // Changed to BigInt with rounding
                : null,
            };

        const inquiry = await prisma.inquiries.create({ data });
        res.status(200).json({
            message: 'Inquiry added successfully'
        });
        return; 

    } catch (error) {
        console.error('Error adding inquiry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
};

const patchInquiry = async (req: Request<{ id: string }, {}, Partial<InquiryBodyInput>>, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const inquiryId = BigInt(id);

    const existingInquiry = await prisma.inquiries.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry) {
        res.status(404).json({ message: 'Inquiry not found' });
        return
    }

    // Build data object only with fields present in request body
    const data: Prisma.inquiriesUpdateInput = {};

    if (body["Full Name"] !== undefined) data.full_name = body["Full Name"];
    if (body["Phone Number"] !== undefined) data.phone_number = new Prisma.Decimal(body["Phone Number"]);
    if (body["Date of Birth"] !== undefined) data.date_of_birth = new Date(body["Date of Birth"]);
    if (body["Gender"] !== undefined) data.gender = body["Gender"];
    if (body["Email"] !== undefined || body["Email Address"] !== undefined) 
      data.email = body["Email"] ?? body["Email Address"] ?? null;
    if (body["Reference"] !== undefined) data.reference = body["Reference"];
    if (body["Current Address"] !== undefined) data.current_address = body["Current Address"] || null;
    if (body["Permanent Address"] !== undefined) data.permanent_address = body["Permanent Address"] || null;
    if (body["Which course are you looking for?"] !== undefined) data.course_selection = body["Which course are you looking for?"] || null;
    if (body["Course Duration"] !== undefined) data.course_duration = body["Course Duration"] || null;
    if (body["How many hours can you invest daily / monthly?"] !== undefined) data.user_availability = body["How many hours can you invest daily / monthly?"] || null;
    if (body["Are you looking for 100% Job guarantee?"] !== undefined) data.job_guarentee = body["Are you looking for 100% Job guarantee?"] || null;
    if (body["Are you interested in Job Assistance?"] !== undefined) data.job_assistance = body["Are you interested in Job Assistance?"] || null;
    if (body["Preferred Job Location"] !== undefined) data.job_location = body["Preferred Job Location"] || null;
    if (body["How much package do you wish to have?"] !== undefined) data.expected_package = body["How much package do you wish to have?"] || null;
    if (body["Where do you want to see yourself after 5 years?"] !== undefined) data.future_goal = body["Where do you want to see yourself after 5 years?"] || null;
    if (body["Why do you want to shift into IT from any other field? (For Non - Technical)"] !== undefined)
      data.career_transition_reason = body["Why do you want to shift into IT from any other field? (For Non - Technical)"] || null;
    if (body["Last Education"] !== undefined) data.recent_education = body["Last Education"] || null;
    if (body["Passing Year"] !== undefined) {
      if (!isNaN(Number(body["Passing Year"]))) {
        data.passing_year = BigInt(body["Passing Year"]);  // Changed from Prisma.Decimal to BigInt
      } else {
        data.passing_year = null;
      }
    }
    if (body["CGPA"] !== undefined) {
      if (!isNaN(Number(body["CGPA"]))) {
        data.cgpa = BigInt(Math.round(Number(body["CGPA"])));  // Changed to BigInt with rounding
      } else {
        data.cgpa = null;
      }
    }

    const result = await prisma.inquiries.update({
      where: { id: inquiryId },
      data,
    });

    if (!result) {
      res.status(404).json({ message: 'Inquiry not found' });
      return;
    }

    res.status(200).json({ message: 'Inquiry patched successfully' });
    return;

  } catch (error) {
    console.error('Error patching inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
};

const deleteInquiry = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const inquiryId = BigInt(id); // assuming `id` is BigInt in DB

    const existingInquiry = await prisma.inquiries.findUnique({
      where: { id: inquiryId },
    });

    if (!existingInquiry) {
        res.status(404).json({ message: 'Inquiry not found' });
        return;
    }

    await prisma.inquiries.delete({
      where: { id: inquiryId },
    });

    res.status(200).json({ message: 'Inquiry deleted successfully' });
    return;

  } catch (error) {
    console.error('Error deleting inquiry:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    return;
  }
};


export default { getAllInquiries, getSelectedInquiry, createInquiry, patchInquiry, deleteInquiry };
