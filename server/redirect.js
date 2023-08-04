const path = require('path');

function redirectToCompany(res, domain) {
    const companyPages = {
        'cumminscollege.in': 'cummins.html',
        'ubs.org': 'ubs.html',
        'givetastic.org': 'givetastic.html'
        // Add more domains and company pages as needed
    };

    const companyPage = companyPages[domain];

    if (companyPage) {
        return res.sendFile(path.join(__dirname, `../public/${companyPage}`));
    } else {
        return res.status(404).json({ error: 'Company domain not recognized' });
    }
}

module.exports = redirectToCompany;
