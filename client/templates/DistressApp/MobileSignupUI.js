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

    Accounts.createUserWithPhone({
      phone: indianPhone,
      password: indianPhone,
      profile: {
        name: fullName,
        verified: false
      }
    }, function () {
      Session.set('phone-verification-sent', true);
      Session.set('phone-supplied', indianPhone);
    });
  },
  'click #mobileVerifyBtn'(ev) {
    ev.preventDefault();
    Session.set('force-login')
  }
});

Template.MobileSignupUI.helpers({
  'phoneVerificationSent': () => {return Session.get('phone-verification-sent')}
});
