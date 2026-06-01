import * as leadService from '../services/lead.service.js';

export const createLead = async (req, res, next) => {
  try {
    const lead = await leadService.createLead(req.body);

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data:    lead,
    });
  } catch (err) {
    next(err);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    // ✅ use validatedQuery instead of req.query
    const result = await leadService.getLeads(req.validatedQuery);

    return res.status(200).json({
      success:    true,
      message:    'Leads fetched successfully',
      data:       result.data,
      pagination: result.pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const lead = await leadService.updateLeadStatus(id, req.body.status);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead status updated successfully',
      data:    lead,
    });
  } catch (err) {
    next(err);
  }
};