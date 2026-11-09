(function () {
    'use strict';

    var form = document.querySelector('[data-static-contact-form]');

    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        var button = form.querySelector('button[type="submit"]');
        var formData = new FormData(form);
        var recipient = 'aprilmayfield93@gmail.com';
        var subject = String(formData.get('contact_subject') || '').trim();
        var body = [
            'Name: ' + String(formData.get('contact_name') || '').trim(),
            'Email: ' + String(formData.get('contact_email') || '').trim(),
            '',
            String(formData.get('contact_message') || '').trim()
        ].join('\n');

        event.preventDefault();

        if (formData.get('contact_website')) {
            return;
        }

        if (button) {
            button.disabled = true;
        }

        window.location.href = 'mailto:' + recipient
            + '?subject=' + encodeURIComponent(subject)
            + '&body=' + encodeURIComponent(body);

        if (button) {
            button.disabled = false;
        }
    });
}());
