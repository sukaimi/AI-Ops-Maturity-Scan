import { Request, Response } from 'express';
import { prisma } from '../db';

export async function getAllBookings(req: Request, res: Response) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        lead: {
          select: {
            id: true,
            fullName: true,
            email: true,
            dealPriority: true,
            aiReadinessScore: true,
            automationGapPercent: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const stats = {
      totalBookings: bookings.length,
      pendingBookings: bookings.length, // All are pending until scheduled
      highPriorityBookings: bookings.filter(b => b.lead.dealPriority >= 70).length
    };

    res.json({ bookings, stats });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}

