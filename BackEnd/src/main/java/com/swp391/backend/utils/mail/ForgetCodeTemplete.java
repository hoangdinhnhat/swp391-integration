/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.swp391.backend.utils.mail;

/**
 *
 * @author Lenovo
 */
public class ForgetCodeTemplete {

    public static String getTemplete(String platform, String firstname, String confirmCode) {
        String templete = "<head>\n"
                + "  <title></title>\n"
                + "  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n"
                + "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n"
                + "  <style type=\"text/css\">\n"
                + "    #outlook a {\n"
                + "      padding: 0;\n"
                + "    }\n"
                + "    .ReadMsgBody {\n"
                + "      width: 100%;\n"
                + "    }\n"
                + "    .ExternalClass {\n"
                + "      width: 100%;\n"
                + "    }\n"
                + "    .ExternalClass * {\n"
                + "      line-height: 100%;\n"
                + "    }\n"
                + "    body {\n"
                + "      margin: 0;\n"
                + "      padding: 0;\n"
                + "      -webkit-text-size-adjust: 100%;\n"
                + "      -ms-text-size-adjust: 100%;\n"
                + "    }\n"
                + "    table,\n"
                + "    td {\n"
                + "      border-collapse: collapse;\n"
                + "      mso-table-lspace: 0pt;\n"
                + "      mso-table-rspace: 0pt;\n"
                + "    }\n"
                + "    img {\n"
                + "      border: 0;\n"
                + "      height: auto;\n"
                + "      line-height: 100%;\n"
                + "      outline: none;\n"
                + "      text-decoration: none;\n"
                + "      -ms-interpolation-mode: bicubic;\n"
                + "    }\n"
                + "    p {\n"
                + "      display: block;\n"
                + "      margin: 13px 0;\n"
                + "    }\n"
                + "  </style>\n"
                + "  <style type=\"text/css\">\n"
                + "    @media only screen and (max-width: 480px) {\n"
                + "      @-ms-viewport {\n"
                + "        width: 320px;\n"
                + "      }\n"
                + "      @viewport {\n"
                + "        width: 320px;\n"
                + "      }\n"
                + "    }\n"
                + "  </style>\n"
                + "  <link\n"
                + "    href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700\"\n"
                + "    rel=\"stylesheet\"\n"
                + "    type=\"text/css\"\n"
                + "  />\n"
                + "  <style type=\"text/css\">\n"
                + "    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\n"
                + "  </style>\n"
                + "  <!--<![endif]-->\n"
                + "  <style type=\"text/css\">\n"
                + "    @media only screen and (min-width: 480px) {\n"
                + "      .mj-column-per-100,\n"
                + "      * [aria-labelledby=\"mj-column-per-100\"] {\n"
                + "        width: 100% !important;\n"
                + "      }\n"
                + "    }\n"
                + "  </style>\n"
                + "</head>\n"
                + "<body style=\"background: #f9f9f9\">\n"
                + "  <div style=\"background-color: #f9f9f9\">\n"
                + "    <style type=\"text/css\">\n"
                + "      html,\n"
                + "      body,\n"
                + "      * {\n"
                + "        -webkit-text-size-adjust: none;\n"
                + "        text-size-adjust: none;\n"
                + "      }\n"
                + "      a {\n"
                + "        color: #1eb0f4;\n"
                + "        text-decoration: none;\n"
                + "      }\n"
                + "      a:hover {\n"
                + "        text-decoration: underline;\n"
                + "      }\n"
                + "    </style>\n"
                + "    <div style=\"margin: 0px auto; max-width: 640px; background: transparent\">\n"
                + "      <table\n"
                + "        role=\"presentation\"\n"
                + "        cellpadding=\"0\"\n"
                + "        cellspacing=\"0\"\n"
                + "        style=\"font-size: 0px; width: 100%; background: transparent\"\n"
                + "        align=\"center\"\n"
                + "        border=\"0\"\n"
                + "      >\n"
                + "        <tbody>\n"
                + "          <tr>\n"
                + "            <td\n"
                + "              style=\"\n"
                + "                text-align: center;\n"
                + "                vertical-align: top;\n"
                + "                direction: ltr;\n"
                + "                font-size: 0px;\n"
                + "                padding: 40px 0px;\n"
                + "              \"\n"
                + "            >\n"
                + "              <div\n"
                + "                aria-labelledby=\"mj-column-per-100\"\n"
                + "                class=\"mj-column-per-100 outlook-group-fix\"\n"
                + "                style=\"\n"
                + "                  vertical-align: top;\n"
                + "                  display: inline-block;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 13px;\n"
                + "                  text-align: left;\n"
                + "                  width: 100%;\n"
                + "                \"\n"
                + "              >\n"
                + "                <table\n"
                + "                  role=\"presentation\"\n"
                + "                  cellpadding=\"0\"\n"
                + "                  cellspacing=\"0\"\n"
                + "                  width=\"100%\"\n"
                + "                  border=\"0\"\n"
                + "                >\n"
                + "                  <tbody>\n"
                + "                    <tr>\n"
                + "                      <td\n"
                + "                        style=\"\n"
                + "                          word-break: break-word;\n"
                + "                          font-size: 0px;\n"
                + "                          padding: 0px;\n"
                + "                        \"\n"
                + "                        align=\"center\"\n"
                + "                      >\n"
                + "                        <table\n"
                + "                          role=\"presentation\"\n"
                + "                          cellpadding=\"0\"\n"
                + "                          cellspacing=\"0\"\n"
                + "                          style=\"border-collapse: collapse; border-spacing: 0px\"\n"
                + "                          align=\"center\"\n"
                + "                          border=\"0\"\n"
                + "                        >\n"
                + "                          <tbody>\n"
                + "                            <tr>\n"
                + "                              <td style=\"width: 138px\">\n"
                + "                                <a href=\"http://localhost:3000/\" target=\"_blank\">\n"
                + "                                  <img\n"
                + "                                    alt=\"\"\n"
                + "                                    title=\"\"\n"
                + "                                    height=\"50px\"\n"
                + "                                    src=\"https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/346101199_1328080261251456_704606386658241927_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=OReRoZIpvroAX-xIwad&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdTs3H4Asi5GWtSISUnb1QLaSg8_4PXqp5ebIkvZLyuEmQ&oe=648C0EE9\"\n"
                + "                                    style=\"\n"
                + "                                      border: none;\n"
                + "                                      border-radius: ;\n"
                + "                                      display: block;\n"
                + "                                      outline: none;\n"
                + "                                      text-decoration: none;\n"
                + "                                      width: 100%;\n"
                + "                                      height: 50px;\n"
                + "                                    \"\n"
                + "                                    width=\"138\"\n"
                + "                                  />\n"
                + "                                </a>\n"
                + "                              </td>\n"
                + "                            </tr>\n"
                + "                          </tbody>\n"
                + "                        </table>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                  </tbody>\n"
                + "                </table>\n"
                + "              </div>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody>\n"
                + "      </table>\n"
                + "    </div>\n"
                + "    <div\n"
                + "      style=\"\n"
                + "        max-width: 640px;\n"
                + "        margin: 0 auto;\n"
                + "        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);\n"
                + "        border-radius: 4px;\n"
                + "        overflow: hidden;\n"
                + "      \"\n"
                + "    >\n"
                + "      <div\n"
                + "        style=\"\n"
                + "          margin: 0px auto;\n"
                + "          max-width: 640px;\n"
                + "          background: #7289da\n"
                + "            url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)\n"
                + "            top center / cover no-repeat;\n"
                + "        \"\n"
                + "      >\n"
                + "        <table\n"
                + "          role=\"presentation\"\n"
                + "          cellpadding=\"0\"\n"
                + "          cellspacing=\"0\"\n"
                + "          style=\"\n"
                + "            font-size: 0px;\n"
                + "            width: 100%;\n"
                + "            background: #7289da\n"
                + "              url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png)\n"
                + "              top center / cover no-repeat;\n"
                + "          \"\n"
                + "          align=\"center\"\n"
                + "          border=\"0\"\n"
                + "          background=\"https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png\"\n"
                + "        >\n"
                + "          <tbody>\n"
                + "            <tr>\n"
                + "              <td\n"
                + "                style=\"\n"
                + "                  text-align: center;\n"
                + "                  vertical-align: top;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 0px;\n"
                + "                  padding: 57px;\n"
                + "                \"\n"
                + "              >\n"
                + "                <div\n"
                + "                  style=\"\n"
                + "                    cursor: auto;\n"
                + "                    color: white;\n"
                + "                    font-family: Whitney, Helvetica Neue, Helvetica, Arial,\n"
                + "                      Lucida Grande, sans-serif;\n"
                + "                    font-size: 36px;\n"
                + "                    font-weight: 600;\n"
                + "                    line-height: 36px;\n"
                + "                    text-align: center;\n"
                + "                  \"\n"
                + "                >\n"
                + "                  Password Reset!\n"
                + "                </div>\n"
                + "              </td>\n"
                + "            </tr>\n"
                + "          </tbody>\n"
                + "        </table>\n"
                + "      </div>\n"
                + "      <div style=\"margin: 0px auto; max-width: 640px; background: #ffffff\">\n"
                + "        <table\n"
                + "          role=\"presentation\"\n"
                + "          cellpadding=\"0\"\n"
                + "          cellspacing=\"0\"\n"
                + "          style=\"font-size: 0px; width: 100%; background: #ffffff\"\n"
                + "          align=\"center\"\n"
                + "          border=\"0\"\n"
                + "        >\n"
                + "          <tbody>\n"
                + "            <tr>\n"
                + "              <td\n"
                + "                style=\"\n"
                + "                  text-align: center;\n"
                + "                  vertical-align: top;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 0px;\n"
                + "                  padding: 40px 70px;\n"
                + "                \"\n"
                + "              >\n"
                + "                <div\n"
                + "                  aria-labelledby=\"mj-column-per-100\"\n"
                + "                  class=\"mj-column-per-100 outlook-group-fix\"\n"
                + "                  style=\"\n"
                + "                    vertical-align: top;\n"
                + "                    display: inline-block;\n"
                + "                    direction: ltr;\n"
                + "                    font-size: 13px;\n"
                + "                    text-align: left;\n"
                + "                    width: 100%;\n"
                + "                  \"\n"
                + "                >\n"
                + "                  <table\n"
                + "                    role=\"presentation\"\n"
                + "                    cellpadding=\"0\"\n"
                + "                    cellspacing=\"0\"\n"
                + "                    width=\"100%\"\n"
                + "                    border=\"0\"\n"
                + "                  >\n"
                + "                    <tbody>\n"
                + "                      <tr>\n"
                + "                        <td\n"
                + "                          style=\"\n"
                + "                            word-break: break-word;\n"
                + "                            font-size: 0px;\n"
                + "                            padding: 0px 0px 20px;\n"
                + "                          \"\n"
                + "                          align=\"left\"\n"
                + "                        >\n"
                + "                          <div\n"
                + "                            style=\"\n"
                + "                              cursor: auto;\n"
                + "                              color: #737f8d;\n"
                + "                              font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                                Arial, Lucida Grande, sans-serif;\n"
                + "                              font-size: 16px;\n"
                + "                              line-height: 24px;\n"
                + "                              text-align: left;\n"
                + "                            \"\n"
                + "                          >\n"
                + "                            <p>\n"
                + "                              <img\n"
                + "                                src=\"https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png\"\n"
                + "                                alt=\"Party Wumpus\"\n"
                + "                                title=\"None\"\n"
                + "                                width=\"500\"\n"
                + "                                style=\"height: auto\"\n"
                + "                              />\n"
                + "                            </p>\n"
                + "\n"
                + "                            <h2\n"
                + "                              style=\"\n"
                + "                                font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                                  Arial, Lucida Grande, sans-serif;\n"
                + "                                font-weight: 500;\n"
                + "                                font-size: 20px;\n"
                + "                                color: #4f545c;\n"
                + "                                letter-spacing: 0.27px;\n"
                + "                              \"\n"
                + "                            >\n"
                + "                              Hi "+ firstname +",\n"
                + "                            </h2>\n"
                + "                            <p>\n"
                + "                              We received a request to reset your password for\n"
                + "                              your account on <b>"+ platform +"</b>.\n"
                + "                            </p>\n"
                + "                            <p>\n"
                + "                              If you did not request a password reset, please\n"
                + "                              disregard this email.\n"
                + "                            </p>\n"
                + "                            <p>\n"
                + "                              If you are unable to enter the code, please copy\n"
                + "                              and paste it into the password reset page.\n"
                + "                            </p>\n"
                + "                            <p>\n"
                + "                              Once you have reset your password, you will be\n"
                + "                              able to log in to your account using your new\n"
                + "                              password.\n"
                + "                            </p>\n"
                + "                            <p>\n"
                + "                              If you have any questions, please do not hesitate\n"
                + "                              to contact us.\n"
                + "                            </p>\n"
                + "                            <p>Thank you,</p>\n"
                + "                            <p><b>The "+ platform +" Team</b></p>\n"
                + "                            <p>\n"
                + "                              To reset your password, please enter the following\n"
                + "                              code on the password reset page:\n"
                + "                            </p>\n"
                + "                            <p>This code will expire in <b>60 seconds</b>.</p>\n"
                + "                          </div>\n"
                + "                        </td>\n"
                + "                      </tr>\n"
                + "                      <tr>\n"
                + "                        <td\n"
                + "                          style=\"\n"
                + "                            word-break: break-word;\n"
                + "                            font-size: 0px;\n"
                + "                            padding: 10px 25px;\n"
                + "                          \"\n"
                + "                          align=\"center\"\n"
                + "                        >\n"
                + "                          <table\n"
                + "                            role=\"presentation\"\n"
                + "                            cellpadding=\"0\"\n"
                + "                            cellspacing=\"0\"\n"
                + "                            style=\"border-collapse: separate\"\n"
                + "                            align=\"center\"\n"
                + "                            border=\"0\"\n"
                + "                          >\n"
                + "                            <tbody>\n"
                + "                              <tr>\n"
                + "                                <td\n"
                + "                                  style=\"\n"
                + "                                    border: none;\n"
                + "                                    border-radius: 3px;\n"
                + "                                    color: white;\n"
                + "                                    cursor: auto;\n"
                + "                                    padding: 15px 19px;\n"
                + "                                  \"\n"
                + "                                  align=\"center\"\n"
                + "                                  valign=\"middle\"\n"
                + "                                  bgcolor=\"#7289DA\"\n"
                + "                                >\n"
                + "                                  <div\n"
                + "                                    href=\"fb.com\"\n"
                + "                                    style=\"\n"
                + "                                      text-decoration: none;\n"
                + "                                      line-height: 100%;\n"
                + "                                      background: #7289da;\n"
                + "                                      color: white;\n"
                + "                                      font-family: Ubuntu, Helvetica, Arial,\n"
                + "                                        sans-serif;\n"
                + "                                      font-size: 15px;\n"
                + "                                      font-weight: normal;\n"
                + "                                      text-transform: none;\n"
                + "                                      margin: 0px;\n"
                + "                                    \"\n"
                + "                                    target=\"_blank\"\n"
                + "                                  >\n"
                + "                                    "+ confirmCode +"\n"
                + "                                  </div>\n"
                + "                                </td>\n"
                + "                              </tr>\n"
                + "                            </tbody>\n"
                + "                          </table>\n"
                + "                        </td>\n"
                + "                      </tr>\n"
                + "                    </tbody>\n"
                + "                  </table>\n"
                + "                </div>\n"
                + "              </td>\n"
                + "            </tr>\n"
                + "          </tbody>\n"
                + "        </table>\n"
                + "      </div>\n"
                + "    </div>\n"
                + "    <div style=\"margin: 0px auto; max-width: 640px; background: transparent\">\n"
                + "      <table\n"
                + "        role=\"presentation\"\n"
                + "        cellpadding=\"0\"\n"
                + "        cellspacing=\"0\"\n"
                + "        style=\"font-size: 0px; width: 100%; background: transparent\"\n"
                + "        align=\"center\"\n"
                + "        border=\"0\"\n"
                + "      >\n"
                + "        <tbody>\n"
                + "          <tr>\n"
                + "            <td\n"
                + "              style=\"\n"
                + "                text-align: center;\n"
                + "                vertical-align: top;\n"
                + "                direction: ltr;\n"
                + "                font-size: 0px;\n"
                + "                padding: 0px;\n"
                + "              \"\n"
                + "            >\n"
                + "              <div\n"
                + "                aria-labelledby=\"mj-column-per-100\"\n"
                + "                class=\"mj-column-per-100 outlook-group-fix\"\n"
                + "                style=\"\n"
                + "                  vertical-align: top;\n"
                + "                  display: inline-block;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 13px;\n"
                + "                  text-align: left;\n"
                + "                  width: 100%;\n"
                + "                \"\n"
                + "              >\n"
                + "                <table\n"
                + "                  role=\"presentation\"\n"
                + "                  cellpadding=\"0\"\n"
                + "                  cellspacing=\"0\"\n"
                + "                  width=\"100%\"\n"
                + "                  border=\"0\"\n"
                + "                >\n"
                + "                  <tbody>\n"
                + "                    <tr>\n"
                + "                      <td style=\"word-break: break-word; font-size: 0px\">\n"
                + "                        <div style=\"font-size: 1px; line-height: 12px\">\n"
                + "                          &nbsp;\n"
                + "                        </div>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                  </tbody>\n"
                + "                </table>\n"
                + "              </div>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody>\n"
                + "      </table>\n"
                + "    </div>\n"
                + "    <div\n"
                + "      style=\"\n"
                + "        margin: 0 auto;\n"
                + "        max-width: 640px;\n"
                + "        background: #ffffff;\n"
                + "        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);\n"
                + "        border-radius: 4px;\n"
                + "        overflow: hidden;\n"
                + "      \"\n"
                + "    >\n"
                + "      <table\n"
                + "        cellpadding=\"0\"\n"
                + "        cellspacing=\"0\"\n"
                + "        style=\"font-size: 0px; width: 100%; background: #ffffff\"\n"
                + "        align=\"center\"\n"
                + "        border=\"0\"\n"
                + "      >\n"
                + "        <tbody>\n"
                + "          <tr>\n"
                + "            <td\n"
                + "              style=\"\n"
                + "                text-align: center;\n"
                + "                vertical-align: top;\n"
                + "                font-size: 0px;\n"
                + "                padding: 0px;\n"
                + "              \"\n"
                + "            >\n"
                + "              <div\n"
                + "                aria-labelledby=\"mj-column-per-100\"\n"
                + "                class=\"mj-column-per-100 outlook-group-fix\"\n"
                + "                style=\"\n"
                + "                  vertical-align: top;\n"
                + "                  display: inline-block;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 13px;\n"
                + "                  text-align: left;\n"
                + "                  width: 100%;\n"
                + "                \"\n"
                + "              >\n"
                + "                <table\n"
                + "                  role=\"presentation\"\n"
                + "                  cellpadding=\"0\"\n"
                + "                  cellspacing=\"0\"\n"
                + "                  width=\"100%\"\n"
                + "                  border=\"0\"\n"
                + "                >\n"
                + "                  <tbody>\n"
                + "                    <tr>\n"
                + "                      <td\n"
                + "                        style=\"\n"
                + "                          word-break: break-word;\n"
                + "                          font-size: 0px;\n"
                + "                          padding: 30px 70px 0px 70px;\n"
                + "                        \"\n"
                + "                        align=\"center\"\n"
                + "                      >\n"
                + "                        <div\n"
                + "                          style=\"\n"
                + "                            cursor: auto;\n"
                + "                            color: #43b581;\n"
                + "                            font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                              Arial, Lucida Grande, sans-serif;\n"
                + "                            font-size: 18px;\n"
                + "                            font-weight: bold;\n"
                + "                            line-height: 16px;\n"
                + "                            text-align: center;\n"
                + "                          \"\n"
                + "                        >\n"
                + "                          FUN FACT\n"
                + "                        </div>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                    <tr>\n"
                + "                      <td\n"
                + "                        style=\"\n"
                + "                          word-break: break-word;\n"
                + "                          font-size: 0px;\n"
                + "                          padding: 14px 70px 30px 70px;\n"
                + "                        \"\n"
                + "                        align=\"center\"\n"
                + "                      >\n"
                + "                        <div\n"
                + "                          style=\"\n"
                + "                            cursor: auto;\n"
                + "                            color: #737f8d;\n"
                + "                            font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                              Arial, Lucida Grande, sans-serif;\n"
                + "                            font-size: 16px;\n"
                + "                            line-height: 22px;\n"
                + "                            text-align: center;\n"
                + "                          \"\n"
                + "                        >\n"
                + "                          If you are looking for a fun and intelligent pet, a\n"
                + "                          parrot is a great option. And if you are looking for a\n"
                + "                          platform to buy or sell parrots, your Bird Trading\n"
                + "                          Platform is the perfect place to do it.\n"
                + "                        </div>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                  </tbody>\n"
                + "                </table>\n"
                + "              </div>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody>\n"
                + "      </table>\n"
                + "    </div>\n"
                + "    <div style=\"margin: 0px auto; max-width: 640px; background: transparent\">\n"
                + "      <table\n"
                + "        role=\"presentation\"\n"
                + "        cellpadding=\"0\"\n"
                + "        cellspacing=\"0\"\n"
                + "        style=\"font-size: 0px; width: 100%; background: transparent\"\n"
                + "        align=\"center\"\n"
                + "        border=\"0\"\n"
                + "      >\n"
                + "        <tbody>\n"
                + "          <tr>\n"
                + "            <td\n"
                + "              style=\"\n"
                + "                text-align: center;\n"
                + "                vertical-align: top;\n"
                + "                direction: ltr;\n"
                + "                font-size: 0px;\n"
                + "                padding: 20px 0px;\n"
                + "              \"\n"
                + "            >\n"
                + "              <div\n"
                + "                aria-labelledby=\"mj-column-per-100\"\n"
                + "                class=\"mj-column-per-100 outlook-group-fix\"\n"
                + "                style=\"\n"
                + "                  vertical-align: top;\n"
                + "                  display: inline-block;\n"
                + "                  direction: ltr;\n"
                + "                  font-size: 13px;\n"
                + "                  text-align: left;\n"
                + "                  width: 100%;\n"
                + "                \"\n"
                + "              >\n"
                + "                <table\n"
                + "                  role=\"presentation\"\n"
                + "                  cellpadding=\"0\"\n"
                + "                  cellspacing=\"0\"\n"
                + "                  width=\"100%\"\n"
                + "                  border=\"0\"\n"
                + "                >\n"
                + "                  <tbody>\n"
                + "                    <tr>\n"
                + "                      <td\n"
                + "                        style=\"\n"
                + "                          word-break: break-word;\n"
                + "                          font-size: 0px;\n"
                + "                          padding: 0px;\n"
                + "                        \"\n"
                + "                        align=\"center\"\n"
                + "                      >\n"
                + "                        <div\n"
                + "                          style=\"\n"
                + "                            cursor: auto;\n"
                + "                            color: #99aab5;\n"
                + "                            font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                              Arial, Lucida Grande, sans-serif;\n"
                + "                            font-size: 12px;\n"
                + "                            line-height: 24px;\n"
                + "                            text-align: center;\n"
                + "                          \"\n"
                + "                        >\n"
                + "                          Sent by Bird Trading Platform •\n"
                + "                          <a\n"
                + "                            href=\"/github\"\n"
                + "                            style=\"color: #1eb0f4; text-decoration: none\"\n"
                + "                            target=\"_blank\"\n"
                + "                            >Check our github</a\n"
                + "                          >\n"
                + "                        </div>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                    <tr>\n"
                + "                      <td\n"
                + "                        style=\"\n"
                + "                          word-break: break-word;\n"
                + "                          font-size: 0px;\n"
                + "                          padding: 0px;\n"
                + "                        \"\n"
                + "                        align=\"center\"\n"
                + "                      >\n"
                + "                        <div\n"
                + "                          style=\"\n"
                + "                            cursor: auto;\n"
                + "                            color: #99aab5;\n"
                + "                            font-family: Whitney, Helvetica Neue, Helvetica,\n"
                + "                              Arial, Lucida Grande, sans-serif;\n"
                + "                            font-size: 12px;\n"
                + "                            line-height: 24px;\n"
                + "                            text-align: center;\n"
                + "                          \"\n"
                + "                        >\n"
                + "                          SE1741, FPT University, HCM City, VietNam\n"
                + "                        </div>\n"
                + "                      </td>\n"
                + "                    </tr>\n"
                + "                  </tbody>\n"
                + "                </table>\n"
                + "              </div>\n"
                + "            </td>\n"
                + "          </tr>\n"
                + "        </tbody>\n"
                + "      </table>\n"
                + "    </div>\n"
                + "  </div>\n"
                + "</body>";

        return templete;
    }
}
