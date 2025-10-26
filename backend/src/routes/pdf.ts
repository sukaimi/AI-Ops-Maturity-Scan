import { Request, Response } from 'express';
import { prisma } from '../db';
import PDFDocument from 'pdfkit';
import { generateReportSections } from '../services/reportGenerator';

export async function generatePDF(req: Request, res: Response) {
  try {
    const { leadId } = req.params;
    
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    const answers = JSON.parse(lead.answers);
    const scores = {
      aiReadinessScore: lead.aiReadinessScore,
      automationGapPercent: lead.automationGapPercent,
      roiPotentialPercent: lead.roiPotentialPercent,
      dealPriority: lead.dealPriority
    };

    const report = generateReportSections(answers, scores);

    // Create PDF
    const doc = new PDFDocument();
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ai-ops-plan-${leadId}.pdf`);
    
    // Pipe PDF to response
    doc.pipe(res);

    // Header
    doc.fontSize(24).fillColor('#00ffff').text('AI OPS UPLIFT PLAN™', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).fillColor('#ffffff').text(`${lead.fullName} - ${lead.email}`, { align: 'center' });
    doc.moveDown(2);

    // Executive Summary
    doc.fontSize(18).fillColor('#ff00ff').text('EXECUTIVE SUMMARY');
    doc.fontSize(12).fillColor('#000000').text(report.executiveSummary);
    doc.moveDown();

    // KPIs
    doc.fontSize(18).fillColor('#ff00ff').text('KEY METRICS');
    doc.fontSize(10);
    doc.text(`AI Readiness Score: ${Math.round(scores.aiReadinessScore)}%`);
    doc.text(`Automation Gap: ${Math.round(scores.automationGapPercent)}%`);
    doc.text(`ROI Potential: ${Math.round(scores.roiPotentialPercent)}%`);
    doc.moveDown();

    // Performance Gaps
    doc.fontSize(18).fillColor('#ff00ff').text('PERFORMANCE GAPS');
    report.performanceGaps.forEach(gap => {
      doc.fontSize(10).fillColor('#000000');
      doc.text(`${gap.area} (${gap.severity}): ${gap.impact}`);
    });
    doc.moveDown();

    // Fast Wins
    doc.fontSize(18).fillColor('#ff00ff').text('FAST WINS');
    report.fastWins.forEach((win, i) => {
      doc.fontSize(12).fillColor('#000000').text(`${i + 1}. ${win.title}`);
      doc.fontSize(10).text(`Impact: ${win.impact}`);
      doc.text(`Timeline: ${win.timeline}`);
      doc.text(`ROI: ${win.roi}`);
      doc.moveDown(0.5);
    });

    // 90-Day Roadmap
    doc.fontSize(18).fillColor('#ff00ff').text('90-DAY ROADMAP');
    report.roadmap90Days.forEach(phase => {
      doc.fontSize(12).fillColor('#000000').text(phase.phase);
      doc.fontSize(10).text(`Focus: ${phase.focus}`);
      doc.text(`Timeline: ${phase.timeline}`);
      doc.text(`Deliverables: ${phase.deliverables}`);
      doc.moveDown(0.5);
    });

    // Finalize PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}

