const express = require('express');
const OrgService = require('../services/orgService');

const router = express.Router();

router.route('/')
    .get(OrgService.getOrgList)
    .post(OrgService.createOrg);
router.route('/:orgId')
    .get(OrgService.getOrg)
    .put(OrgService.updateOrg)
    .delete(OrgService.deleteOrg);


module.exports = router;
