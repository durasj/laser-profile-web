window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js').default;
require('bootstrap-material-design');
require('bootstrap-datetimepicker/src/js/bootstrap-datetimepicker');
require('../../node_modules/material-kit/assets/js/material-kit');
$(document).ready(() => $('body').bootstrapMaterialDesign());
