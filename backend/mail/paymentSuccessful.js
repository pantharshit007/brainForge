exports.paymentSuccessEmail = (name, amount, orderId, paymentId, transactionTime) => {
    return `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
   <head>
      <title></title>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
      <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
      <!--[if mso]>
      <xml>
         <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
         </o:OfficeDocumentSettings>
      </xml>
      <![endif]--><!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
      <!--<![endif]-->
      <style>
         * {
         box-sizing: border-box;
         }
         body {
         margin: 0;
         padding: 0;
         }
         a[x-apple-data-detectors] {
         color: inherit !important;
         text-decoration: inherit !important;
         }
         #MessageViewBody a {
         color: inherit;
         text-decoration: none;
         }
         p {
         line-height: inherit
         }
         .desktop_hide,
         .desktop_hide table {
         mso-hide: all;
         display: none;
         max-height: 0px;
         overflow: hidden;
         }
         .image_block img+div {
         display: none;
         }
         @media (max-width:700px) {
         .desktop_hide table.icons-inner,
         .social_block.desktop_hide .social-table {
         display: inline-block !important;
         }
         .icons-inner {
         text-align: center;
         }
         .icons-inner td {
         margin: 0 auto;
         }
         .image_block div.fullWidth {
         max-width: 100% !important;
         }
         .mobile_hide {
         display: none;
         }
         .row-content {
         width: 100% !important;
         }
         .stack .column {
         width: 100%;
         display: block;
         }
         .mobile_hide {
         min-height: 0;
         max-height: 0;
         max-width: 0;
         overflow: hidden;
         font-size: 0px;
         }
         .desktop_hide,
         .desktop_hide table {
         display: table !important;
         max-height: none !important;
         }
         }
      </style>
   </head>
   <body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9;" width="100%">
      <tbody>
         <tr>
            <td>
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                       <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:10px;padding-top:10px;width:100%;">
                                                <div align="center" class="alignment" style="line-height:10px">
                                                   <div style="max-width: 268px;"><img alt="BrainForge Logo" height="auto" src="https://i.ibb.co/fYCv9P0/New-Project-removebg-preview.png" style="display: block; height: auto; border: 0; width: 100%;" title="BrainForge Logo" width="268"/></div>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cbdbef; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                       <div class="spacer_block block-1" style="height:70px;line-height:70px;font-size:1px;"> </div>
                                       <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                          <tr>
                                             <td class="pad" style="width:100%;">
                                                <div align="center" class="alignment" style="line-height:10px">
                                                   <div style="max-width: 93px;"><img alt="Check Icon" height="auto" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4971/check-icon.png" style="display: block; height: auto; border: 0; width: 100%;" title="Check Icon" width="93"/></div>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:25px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                <div style="color:#2f2f2f;font-family:Georgia,Times,'Times New Roman',serif;font-size:42px;line-height:120%;text-align:center;mso-line-height-alt:50.4px;">
                                                   <p style="margin: 0; word-break: break-word;"><span>Payment received</span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-left:30px;padding-right:30px;padding-top:10px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                   <p style="margin: 0; word-break: break-word;"><span>Hi <strong><u>${name}</u></strong>,</span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-5" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-left:30px;padding-right:30px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                   <p style="margin: 0; word-break: break-word;"> </p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-6" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-left:30px;padding-right:30px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                                   <p style="margin: 0; word-break: break-word;"><span>Thank you for your payment of <strong><span>₹${amount}</span></strong> on <strong><span>${transactionTime}</span></strong></span></p>
                                                   <p style="margin: 0; word-break: break-word;"><span>using <strong><span>Bank Account ****9876</span></strong></span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:10px;padding-left:30px;padding-right:30px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:150%;text-align:center;mso-line-height-alt:21px;">
                                                   <p style="margin: 20px 0; word-break: break-word;"> </p>
                                                   <p style="margin: 0; word-break: break-word;"><span style="color:#000000;">Your transaction has been completed </span></p>
                                                   <p style="margin: 0; word-break: break-word;"><span style="color:#000000;">You may log into your account to view courses.</span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <div class="spacer_block block-8" style="height:70px;line-height:70px;font-size:1px;"> </div>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:20px;padding-left:20px;padding-right:20px;padding-top:50px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:18px;letter-spacing:1px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                                   <p style="margin: 0; word-break: break-word;"><strong><span>PAYMENT DETAILS</span></strong></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:10px;padding-left:10px;padding-right:20px;padding-top:10px;">
                                                <div style="color:#393d47;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:200%;text-align:right;mso-line-height-alt:32px;">
                                                   <p style="margin: 0; word-break: break-word;"><strong><span><span style="color:#5d77a9;">Amount</span></span></strong></p>
                                                   <p style="margin: 0; word-break: break-word;"><strong><span><span style="color:#5d77a9;">Date</span></span></strong></p>
                                                   <p style="margin: 0; word-break: break-word;"><strong><span><span style="color:#5d77a9;">Payment ID</span></span></strong></p>
                                                   <p style="margin: 0; word-break: break-word;"><strong><span><span style="color:#5d77a9;">Order ID</span></span></strong></p>
                                                   <p style="margin: 0; word-break: break-word;"><strong><span><span style="color:#5d77a9;">Confirmation</span></span></strong></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                    <td class="column column-2" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="50%">
                                       <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
                                                <div style="color:#2f2f2f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:16px;line-height:200%;text-align:left;mso-line-height-alt:32px;">
                                                   <p style="margin: 0; padding-top: 2px; word-break: break-word;"><span>₹${amount}</span></p>
                                                   <p style="margin: 0; padding-top: 2px; word-break: break-word;"><span>${transactionTime}</span></p>
                                                   <p style="margin: 0; word-break: break-word;"><span> ${paymentId}</span></p>
                                                   <p style="margin: 0; word-break: break-word;"><span>${orderId}</span></p>
                                                   <p style="margin: 0;  word-break: break-word;">Signature</p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               
               
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-7" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                       <div class="spacer_block block-1" style="height:20px;line-height:20px;font-size:1px;"> </div>
                                       <table border="0" cellpadding="0" cellspacing="0" class="image_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                          <tr>
                                             <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                <div align="center" class="alignment" style="line-height:10px">
                                                   <div style="max-width: 204px;"><img alt="BrainForge Logo" height="auto" src="https://i.ibb.co/fYCv9P0/New-Project-removebg-preview.png" style="display: block; height: auto; border: 0; width: 100%;" title="BrainForge Logo" width="204"/></div>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="10" cellspacing="0" class="social_block block-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                          <tr>
                                             <td class="pad">
                                                <div align="center" class="alignment">
                                                   <table border="0" cellpadding="0" cellspacing="0" class="social-table" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;" width="108px">
                                                      <tr>
                                                         <td style="padding:0 2px 0 2px;"><a href="https://www.facebook.com" target="_blank"><img alt="Facebook" height="auto" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png" style="display: block; height: auto; border: 0;" title="Facebook" width="32"/></a></td>
                                                         <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com" target="_blank"><img alt="Twitter" height="auto" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/twitter@2x.png" style="display: block; height: auto; border: 0;" title="Twitter" width="32"/></a></td>
                                                         <td style="padding:0 2px 0 2px;"><a href="https://www.instagram.com" target="_blank"><img alt="Instagram" height="auto" src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png" style="display: block; height: auto; border: 0;" title="Instagram" width="32"/></a></td>
                                                      </tr>
                                                   </table>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                       <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad">
                                                <div style="color:#f9f9f9;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:150%;text-align:center;mso-line-height-alt:18px;">
                                                   <p style="margin: 0; word-break: break-word;"><span>BrainForge Delhi, India</span></p>
                                                   <p style="margin: 0; word-break: break-word; color:white"><span>info@brainforge.com </span></p>
                                                   <p style="margin: 0; word-break: break-word;"><span>(+1) 123 456 789</span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                  <tbody>
                     <tr>
                        <td>
                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #5d77a9; color: #000000; width: 680px; margin: 0 auto;" width="680">
                              <tbody>
                                 <tr>
                                    <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
                                       <table border="0" cellpadding="10" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
                                          <tr>
                                             <td class="pad">
                                                <div style="color:#cfceca;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                                   <p style="margin: 0; word-break: break-word;"><span>2024 © All Rights Reserved</span></p>
                                                </div>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </td>
                     </tr>
                  </tbody>
               </table>
               
            `
}