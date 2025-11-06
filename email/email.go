package email

import (
	"crypto/rand"
	"crypto/tls"
	"fmt"
	"math/big"
	"net/smtp"
	"time"
)

// EmailConfig holds the email configuration
type EmailConfig struct {
	SenderEmail  string
	SMTPServer   string
	SMTPPort     int
	SMTPUsername string
	SMTPPassword string
}

// EmailService handles email operations
type EmailService struct {
	config EmailConfig
}

// NewEmailService creates a new email service
func NewEmailService(config EmailConfig) *EmailService {
	return &EmailService{
		config: config,
	}
}

// GenerateVerificationCode generates a 6-digit verification code
func GenerateVerificationCode() (string, error) {
	code := ""
	for i := 0; i < 6; i++ {
		n, err := rand.Int(rand.Reader, big.NewInt(10))
		if err != nil {
			return "", err
		}
		code += fmt.Sprintf("%d", n.Int64())
	}
	return code, nil
}

// SendVerificationEmail sends a verification code to the user's email
func (s *EmailService) SendVerificationEmail(toEmail, username, code string) error {
	subject := "验证您的 FluxTrader 账户"
	body := s.generateVerificationEmailHTML(username, code)

	return s.sendEmail(toEmail, subject, body)
}

// generateVerificationEmailHTML creates a beautiful HTML email template
func (s *EmailService) generateVerificationEmailHTML(username, code string) string {
	return fmt.Sprintf(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>邮箱验证</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%%" style="background-color: #f5f5f5; padding: 40px 0;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                                FluxTrader
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                                智能交易平台
                            </p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <h2 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                                您好, %s!
                            </h2>
                            <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">
                                感谢您注册 FluxTrader 账户。为了确保账户安全,请使用以下验证码完成注册:
                            </p>
                        </td>
                    </tr>

                    <!-- Verification Code -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%%">
                                <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); border-radius: 8px; padding: 30px;">
                                        <div style="font-size: 42px; font-weight: 700; color: #ffffff; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                            %s
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Info -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px;">
                            <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 16px 20px; border-radius: 4px;">
                                <p style="margin: 0; color: #495057; font-size: 14px; line-height: 1.6;">
                                    <strong>⏰ 验证码有效期:</strong> 10分钟<br>
                                    <strong>🔒 安全提示:</strong> 请勿将此验证码分享给任何人
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 30px 40px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0 0 10px 0; color: #6c757d; font-size: 13px; line-height: 1.6;">
                                如果您没有注册 FluxTrader 账户,请忽略此邮件。
                            </p>
                            <p style="margin: 0; color: #adb5bd; font-size: 12px;">
                                © %d FluxTrader. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
	`, username, code, time.Now().Year())
}

// sendEmail sends an email using SMTP
func (s *EmailService) sendEmail(to, subject, body string) error {
	// Build the message
	headers := make(map[string]string)
	headers["From"] = s.config.SenderEmail
	headers["To"] = to
	headers["Subject"] = subject
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=UTF-8"

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + body

	// Set up authentication
	auth := smtp.PlainAuth("", s.config.SMTPUsername, s.config.SMTPPassword, s.config.SMTPServer)

	// Send the email using TLS (for port 465)
	addr := fmt.Sprintf("%s:%d", s.config.SMTPServer, s.config.SMTPPort)

	// For port 465, we need to use TLS from the start
	if s.config.SMTPPort == 465 {
		// Import crypto/tls is already at the top
		tlsconfig := &tls.Config{
			ServerName: s.config.SMTPServer,
		}

		conn, err := tls.Dial("tcp", addr, tlsconfig)
		if err != nil {
			return fmt.Errorf("failed to connect: %w", err)
		}
		defer conn.Close()

		client, err := smtp.NewClient(conn, s.config.SMTPServer)
		if err != nil {
			return fmt.Errorf("failed to create client: %w", err)
		}
		defer client.Close()

		if err = client.Auth(auth); err != nil {
			return fmt.Errorf("failed to authenticate: %w", err)
		}

		if err = client.Mail(s.config.SenderEmail); err != nil {
			return fmt.Errorf("failed to set sender: %w", err)
		}

		if err = client.Rcpt(to); err != nil {
			return fmt.Errorf("failed to set recipient: %w", err)
		}

		w, err := client.Data()
		if err != nil {
			return fmt.Errorf("failed to get data writer: %w", err)
		}

		_, err = w.Write([]byte(message))
		if err != nil {
			return fmt.Errorf("failed to write message: %w", err)
		}

		err = w.Close()
		if err != nil {
			return fmt.Errorf("failed to write message: %w", err)
		}

		// 发送QUIT命令，忽略可能的"short response"错误
		// 因为邮件已经成功发送，QUIT只是礼貌性关闭连接
		client.Quit()
		return nil
	}

	// For other ports (like 587), use STARTTLS
	err := smtp.SendMail(addr, auth, s.config.SenderEmail, []string{to}, []byte(message))
	if err != nil {
		return fmt.Errorf("failed to send email: %w", err)
	}

	return nil
}
