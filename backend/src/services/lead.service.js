import pool from '../config/db.js';

export const createLead = async (data) => {
  const { full_name, phone, email, source, status, assigned_to } = data;

  const result = await pool.query(
    `INSERT INTO lead_master (full_name, phone, email, source, status, assigned_to)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [full_name, phone, email, source, status, assigned_to]
  );

  return result.rows[0];
};

export const getLeads = async ({ page, limit, search, status, source, sort_by, order }) => {
  const offset = (page - 1) * limit;

  const conditions = [];
  const values = [];
  let i = 1;

  if (search) {
    conditions.push(`(full_name ILIKE $${i} OR phone ILIKE $${i + 1})`);
    values.push(`%${search}%`, `%${search}%`);
    i += 2;
  }

  if (status) {
    conditions.push(`status = $${i}`);
    values.push(status);
    i++;
  }

  if (source) {
    conditions.push(`source = $${i}`);
    values.push(source);
    i++;
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const orderClause = `ORDER BY ${sort_by} ${order.toUpperCase()}`;

  const countResult = await pool.query(
    `SELECT COUNT(*) FROM lead_master ${where}`,
    values
  );
  const total = parseInt(countResult.rows[0].count);

  const leadsResult = await pool.query(
    `SELECT * FROM lead_master ${where} ${orderClause} LIMIT $${i} OFFSET $${i + 1}`,
    [...values, limit, offset]
  );

  return {
    data: leadsResult.rows,
    pagination: {
      total,
      page,
      limit,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const updateLeadStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE lead_master
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0]; 
};