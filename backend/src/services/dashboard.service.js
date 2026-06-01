import pool from '../config/db.js';

export const getDashboardMetrics = async () => {
  const [totalResult, byStatusResult, todayResult, bySourceResult] = await Promise.all([
    pool.query(`
      SELECT COUNT(*) AS total
      FROM lead_master
    `),
    pool.query(`
      SELECT status, COUNT(*) AS count
      FROM lead_master
      GROUP BY status
      ORDER BY count DESC
    `),

    pool.query(`
      SELECT COUNT(*) AS today
      FROM lead_master
      WHERE created_at::date = CURRENT_DATE
    `),

    pool.query(`
      SELECT source, COUNT(*) AS count
      FROM lead_master
      WHERE source IS NOT NULL
      GROUP BY source
      ORDER BY count DESC
    `),

  ]);

  return {
    total_leads:      parseInt(totalResult.rows[0].total),
    today_leads:      parseInt(todayResult.rows[0].today),
    leads_by_status:  byStatusResult.rows.map((row) => ({
      status: row.status,
      count:  parseInt(row.count),
    })),
    leads_by_source:  bySourceResult.rows.map((row) => ({
      source: row.source,
      count:  parseInt(row.count),
    })),
  };
};