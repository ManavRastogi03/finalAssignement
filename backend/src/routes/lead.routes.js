import { Router } from 'express';
import * as leadController from '../controllers/lead.controller.js';
import validate from '../middlewares/validate.js';
import {
  createLeadSchema,
  updateLeadStatusSchema,
  leadQuerySchema,
} from '../validations/lead.validation.js';

const router = Router();

router.post(
  '/',
  validate(createLeadSchema),
  leadController.createLead
);

router.get(
  '/',
  validate(leadQuerySchema, 'query'),
  leadController.getLeads
);

router.put(
  '/:id/status',
  validate(updateLeadStatusSchema),
  leadController.updateLeadStatus
);

export default router;