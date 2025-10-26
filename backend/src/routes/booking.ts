import { Request, Response } from 'express';
import { prisma } from '../db';

interface BookingRequest {
  leadId: string;
  hoursLost: string;
  priority: string;
  bringOutline: string;
}

export async function saveBooking(req: Request, res: Response) {
  try {
    const { leadId, hoursLost, priority, bringOutline } = req.body as BookingRequest;
    
    if (!leadId) {
      return res.status(400).json({ error: 'Lead ID is required' });
    }

    // Find the lead
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Create a new booking record
    const booking = await prisma.booking.create({
      data: {
        leadId,
        hoursLost,
        priority,
        bringOutline
      }
    });

    res.json({ 
      success: true, 
      message: 'Booking request submitted successfully',
      bookingId: booking.id,
      bookingDetails: {
        hoursLost,
        priority,
        bringOutline,
        leadEmail: lead.email,
        leadName: lead.fullName,
        dealPriority: lead.dealPriority
      }
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'Failed to save booking request' });
  }
}

