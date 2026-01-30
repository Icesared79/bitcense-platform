// Email notification functions
export {
  // Admin notifications
  sendLeadNotification,
  sendAssetSubmittedNotification,
  sendAdminWeeklyDigest,

  // Client notifications
  sendPortalInvite,
  sendStatusUpdate,
  sendQualificationComplete,
  sendDocumentRequest,
  sendDistributionUpdate,
  sendWelcomeEmail,
} from './notifications'

// Template components (for custom emails)
export {
  emailWrapper,
  emailHeader,
  emailBody,
  emailFooter,
  primaryButton,
  secondaryButton,
  infoBox,
  statusBadge,
  dataTable,
  tableRow,
  scoreDisplay,
  bulletList,
  heading,
  paragraph,
  divider,
  link,
} from './templates'
