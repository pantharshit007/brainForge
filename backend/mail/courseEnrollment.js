exports.courseEnrollmentEmail = (courses, name, totalPrice, date) => {
    // Generate the rows for each course
    const courseRows = courses.map(course => `
        <tr>
            <td>${course.courseName}</td>
            <td>${course.coursePrice.toFixed(2)}</td>
        </tr>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            background-image: url('https://dashboardassets.eb-pages.com/uploads/5049823246942208/egterd__1_.png');
            background-position: top center;
            background-repeat: repeat;
            background-size: cover;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            font-size: 2.5rem;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            color: #333;
            margin-bottom: 15px;
        }

        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            max-width: 200px;
        }

        .invoice-details {
            width: 100%;
            margin-bottom: 20px;
        }

        .invoice-details td {
            padding: 5px 0;
        }

        .info {
            margin-top: -15px !important;
        }

        .invoice-table {
            width: 80%;
            border-collapse: collapse;
            margin-bottom: 20px;
            margin: 0 auto;
        }

        .invoice-table th,
        .invoice-table td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            text-align: left;
        }
        .invoice-table th{
          background-color:rgb(129, 179, 235);
        }
        .invoice-table td{
          background-color:aliceblue;
        }

        .total {
            width: 80%;
            border-collapse: collapse;
            margin-bottom: 20px;
            margin: 0 auto;
        }

        .total th {
            padding: 10px;
            text-align: left;
            width: 240px;
        }
        .totalPrice{
          padding-left: 30px !important;
        }

        .dashboard {
            width: 100%;
            text-align: center;
        }

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #c5c7d4;
            color:#000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        .cta a[href] {
             color: #000000;
        }

        .terms-conditions {
            margin-bottom: 20px;
        }

        .terms {
            font-size: 14px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .social-icons {
            text-align: center;
            margin-bottom: 20px;
        }

        .social-icons a {
            margin: 0 10px;
            color: #333;
        }

        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 13px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>INVOICE</h1>
        <div class="invoice-header">
            <img src="https://i.ibb.co/G5cKnxf/logo.png" alt="BrainForge logo" class="logo">
        </div>
        <table class="invoice-details">
            <tr>
                <td>
                    <h3>To: ${name}</h3>
                    <p>4702 Upton Avenue New York(NY), 12207</p>
                    <p class="info">207-479-9213</p>
                </td>
                <td>
                    <h4>Invoice Date</h4>
                    <p class="info">${date}</p>
                    <h4>Invoice No.</h4>
                    <p class="info">#00060005</p>
                </td>
            </tr>
        </table>
        <table class="invoice-table">
            <thead>
                <tr>
                    <th>COURSE</th>
                    <th>PRICE</th>
                </tr>
            </thead>
            <tbody>
                ${courseRows}
            </tbody>
        </table>
        <table class="total">
          <thead>
            <tr>
                <th>TOTAL</th>
                <th class="totalPrice">₹${totalPrice}</th>
            </tr>
          </thead>
            
        </table>
        <div class="dashboard">
            <p>Please log in to your learning dashboard to access the course materials and start your learning journey.</p>
            <a class="cta" href="https://BrainForge-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
        </div>
        <div class="terms-conditions">
            <h4>Terms & Conditions</h4>
            <p class="terms">BrainForge's mission is to improve lives through learning. We enable anyone anywhere to create and share educational content (instructors) and to access that educational content to learn (students). We consider our marketplace model the best way to offer valuable educational content to our users. We need rules to keep our platform and services safe for you, us, and our student and instructor community.</p>
        </div>
        <div class="social-icons">
            <a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="30" width="30" src="https://d2p078bqz5urf7.cloudfront.net/cloud/email-builder/email-builder-icons/social-icons/facebook.png" /></a>
            <a href="https://twitter.com/" target="_blank"><img alt="Twitter" height="30" width="30" src="https://d2p078bqz5urf7.cloudfront.net/cloud/email-builder/email-builder-icons/social-icons/twitter.png" /></a>
            <a href="https://www.linkedin.com/" target="_blank"><img alt="LinkedIn" height="30" width="30" src="https://d2p078bqz5urf7.cloudfront.net/cloud/email-builder/email-builder-icons/social-icons/linkedin.png" /></a>
            <a href="https://www.instagram.com/" target="_blank"><img alt="Instagram" height="30" width="30" src="https://d2p078bqz5urf7.cloudfront.net/cloud/email-builder/email-builder-icons/social-icons/insta.png" /></a>
        </div>
        <div class="footer">
            <p>Don't want to get emails like this? <a href="https://www.google.com/">Unsubscribe</a> from our emails</p>
            <p>Contact <span style="font-size: 12px; color: blue;">info@brainforge.com</span></p>
        </div>
    </div>
  </body>
</html>
`;
};
