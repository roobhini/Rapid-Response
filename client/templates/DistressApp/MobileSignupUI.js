Template.MobileSignupUI.events({
  'click #mobileSignupBtn'(ev, tmpl) {
    ev.preventDefault();
    var phone = $("input[name=mobileNumber]").val(),
        fullName = $("input[name=fullName]").val(),
        indianPhone = '+91'.concat(phone);

    // unsophisticated validation
    if (!phone || !fullName || phone.length !== 10 || !fullName.length) {
      return false;
    }

    Session.set('phoneVerificationSent', true);
    Session.set('mobileNumber', indianPhone);
    Session.set('fullName', fullName);
  },
  'click #mobileVerifyBtn'(ev) {
    ev.preventDefault();
    Session.set('forceLogin', true);
  }
});

Template.MobileSignupUI.helpers({
  'phoneVerificationSent': () => {return Session.get('phoneVerificationSent')}
});
