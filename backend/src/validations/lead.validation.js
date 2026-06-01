import Joi from 'joi';

export const createLeadSchema = Joi.object({
  full_name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Full name is required',
    'string.min':   'Full name must be at least 2 characters',
    'string.max':   'Full name must be at most 100 characters',
  }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty':   'Phone number is required',
      'string.pattern.base': 'Phone must be a valid 10-digit number',
    }),

  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address',
  }),

  source: Joi.string()
    .valid('website', 'referral', 'walk_in', 'social_media', 'other')
    .optional()
    .messages({
      'any.only': 'Source must be one of: website, referral, walk_in, social_media, other',
    }),

  status: Joi.string()
    .valid('new', 'contacted', 'visit_scheduled', 'closed', 'lost')
    .default('new'),

  assigned_to: Joi.string().max(100).optional(),
});

export const updateLeadStatusSchema = Joi.object({
  status: Joi.string()
    .valid('new', 'contacted', 'visit_scheduled', 'closed', 'lost')
    .required()
    .messages({
      'any.only': 'Status must be one of: new, contacted, visit_scheduled, closed, lost',
      'string.empty': 'Status is required',
    }),
});

export const leadQuerySchema = Joi.object({
  page:    Joi.number().integer().min(1).default(1),
  limit:   Joi.number().integer().min(1).max(100).default(10),
  search:  Joi.string().optional().allow(''),
  status:  Joi.string().valid('new', 'contacted', 'visit_scheduled', 'closed', 'lost').optional(),
  source:  Joi.string().valid('website', 'referral', 'walk_in', 'social_media', 'other').optional(),
  sort_by: Joi.string().valid('created_at', 'full_name', 'status').default('created_at'),
  order:   Joi.string().valid('asc', 'desc').default('desc'),
});