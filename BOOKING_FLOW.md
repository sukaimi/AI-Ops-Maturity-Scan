# 📅 Booking Request Flow

## What Happens When You Submit the AI Ops Sprint Call Form?

When a user completes the scan and clicks "Request Your AI Ops Sprint" and fills out the booking form, here's what happens:

### 1. User Submits Form
- Hours lost per week to manual tasks
- Priority improvement (cost/speed/growth/risk)
- Agreement to bring a full automation outline

### 2. Data Storage
The booking information is saved to the database with the following structure:

**Database Model: `Booking`**
```typescript
{
  id: string              // Unique booking ID
  leadId: string          // Links to the Lead record
  hoursLost: string       // Hours per week lost
  priority: string        // What improves first
  bringOutline: string    // Agreement to bring automation outline
  createdAt: DateTime     // When booking was submitted
}
```

### 3. API Endpoint
- **Route**: `POST /api/booking`
- **Payload**: 
  ```json
  {
    "leadId": "clx...",
    "hoursLost": "20-40 hours",
    "priority": "cost",
    "bringOutline": "Yes"
  }
  ```
- **Response**: Booking confirmation with booking ID

### 4. Database Relations
The booking is linked to the Lead record through `leadId`, allowing you to:
- See all bookings for a specific lead
- View lead details when processing bookings
- Track the priority and deal status together

### 5. What You (Admin) Can Do

#### View in Database
```bash
# Query bookings
sqlite3 backend/prisma/dev.db "SELECT * FROM Booking;"

# Join with Lead data to see full context
sqlite3 backend/prisma/dev.db "
  SELECT 
    b.id as booking_id,
    l.fullName,
    l.email,
    l.dealPriority,
    b.hoursLost,
    b.priority,
    b.createdAt
  FROM Booking b
  JOIN Lead l ON b.leadId = l.id
  ORDER BY b.createdAt DESC;
"
```

#### View in Admin Dashboard
The admin dashboard at `/admin` shows all leads, and you can query bookings via the API:

```bash
# Get all bookings (you'd need to add this endpoint)
GET /api/bookings
```

### 6. Integration with Follow-Up Emails

The booking data can be used to:
1. **Personalize follow-up emails** with specific pain points
2. **Prioritize calls** based on hours lost and deal priority
3. **Prepare for the call** with automation outline template
4. **Track conversion** from booking to actual call

### 7. Current Flow

```
User completes scan → Enters details → Views report → Clicks "Request AI Ops Sprint" 
→ Fills booking form → Data saved to database → Confirmation shown
```

### Next Steps to Enhance

1. **Add booking endpoint to admin dashboard**:
   ```typescript
   app.get('/api/bookings', async (req, res) => {
     const bookings = await prisma.booking.findMany({
       include: { lead: true },
       orderBy: { createdAt: 'desc' }
     })
     res.json(bookings)
   })
   ```

2. **Add email notification** when a booking is submitted

3. **Integrate with calendar** (Calendly, etc.) to automatically schedule

4. **Add booking status tracking**: Pending, Scheduled, Completed, etc.

## Example Booking Data

```json
{
  "bookingId": "clx123abc",
  "leadName": "John Doe",
  "leadEmail": "john@company.com",
  "dealPriority": 85,
  "hoursLost": "20-40 hours per week",
  "priority": "cost",
  "bringOutline": "Yes",
  "createdAt": "2025-01-26T10:24:13.000Z"
}
```

This data helps you qualify leads, prepare for calls, and prioritize your sales outreach!

