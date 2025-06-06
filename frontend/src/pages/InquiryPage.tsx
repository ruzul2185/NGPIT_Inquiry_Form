import { useState, useEffect } from 'react';

import type { InquiryListEntry } from '../types/InquiryTypes';

import Entry from '../components/Entry';

import { INQUIRY_ENDPOINT } from '../constants/UrlConstant';

const InquiryPage = () => {
  const [data, setData] = useState<InquiryListEntry[]>([]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(INQUIRY_ENDPOINT);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const inquiries: InquiryListEntry[] = await response.json();
      setData(inquiries);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div>
      <h1>Inquiry Page</h1>
      <p>This is the inquiry page where users can submit their inquiries.</p>

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 && data.map((inquiry) => (
            <Entry key={inquiry.id} data={inquiry} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryPage;
