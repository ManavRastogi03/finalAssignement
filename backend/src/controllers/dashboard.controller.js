import * as dashboardService from '../services/dashboard.service.js';

export const getDashboard = async (req, res, next) => {
  try {
    const metrics = await dashboardService.getDashboardMetrics();

    return res.status(200).json({
      success: true,
      message: 'Dashboard metrics fetched successfully',
      data:    metrics,
    });
  } catch (err) {
    next(err);
  }
};