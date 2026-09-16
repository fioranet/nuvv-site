import nodemailer from 'nodemailer';
import { db } from './db.js';

// Helper to get SMTP settings from database or fallback to env
export function getSmtpConfig() {
  try {
    const rows = db.prepare("SELECT key, value FROM settings WHERE key LIKE 'smtp_%' OR key = 'admin_alert_email'").all();
    const config = {};
    rows.forEach(r => {
      config[r.key] = r.value;
    });

    return {
      host: config['smtp_host'] || process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(config['smtp_port'] || process.env.SMTP_PORT || '465', 10),
      secure: (config['smtp_secure'] || process.env.SMTP_SECURE || 'true') === 'true',
      user: config['smtp_user'] || process.env.SMTP_USER || '',
      pass: config['smtp_pass'] || process.env.SMTP_PASS || '',
      from: config['smtp_from'] || process.env.SMTP_FROM || '"Nuvv Telecom" <notificacoes@nuvv.com.br>',
      adminEmail: config['admin_alert_email'] || process.env.ADMIN_ALERT_EMAIL || 'contato@nuvv.com.br',
    };
  } catch {
    return {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      user: '',
      pass: '',
      from: '"Nuvv Telecom" <notificacoes@nuvv.com.br>',
      adminEmail: 'contato@nuvv.com.br',
    };
  }
}

// Create nodemailer transporter
export function createTransporter() {
  const config = getSmtpConfig();
  if (!config.user || !config.pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

// Log email attempt to database
export function logEmail(recipient, subject, type, status, errorMessage = null) {
  try {
    db.prepare(`
      INSERT INTO email_logs (recipient, subject, type, status, error_message)
      VALUES (?, ?, ?, ?, ?)
    `).run(recipient, subject, type, status, errorMessage);
  } catch (err) {
    console.error('Error logging email:', err);
  }
}

// 1. Send Welcome Email on Newsletter Subscription
export async function sendWelcomeEmail(recipientEmail) {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  const subject = '🎉 Bem-vindo ao Nuvv News! Seu canal de tecnologia e conexão';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0E14; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
      <div style="background: linear-gradient(135deg, #1E1B4B, #0B0E14); padding: 32px 24px; text-align: center; border-bottom: 2px solid #10B981;">
        <h1 style="margin: 0; font-size: 28px; color: #10B981; letter-spacing: -0.5px;">Nuvv News</h1>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: #CBD5E1;">Conexão de Alta Performance, Dicas e Inovação</p>
      </div>

      <div style="padding: 32px 24px; line-height: 1.6; color: #E2E8F0;">
        <h2 style="font-size: 20px; color: #FFFFFF; margin-top: 0;">Olá! É ótimo ter você com a gente 🚀</h2>
        <p>Sua inscrição no <strong>Nuvv News</strong> foi confirmada com sucesso.</p>
        <p>A partir de agora, você receberá novidades em primeira mão sobre:</p>
        <ul style="color: #94A3B8; padding-left: 20px;">
          <li>Dicas para turbinar o Wi-Fi e a segurança digital da sua casa ou empresa</li>
          <li>Lançamentos em streaming, jogos e filmes</li>
          <li>Soluções de ponta em PABX Virtual, Multiatendimento WhatsApp e Telefonia IP</li>
          <li>Ofertas e upgrades de planos exclusivos para assinantes</li>
        </ul>

        <div style="text-align: center; margin: 32px 0;">
          <a href="https://nuvv.com.br/blog" style="background: #10B981; color: #022C22; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 12px; display: inline-block; font-size: 14px;">
            Acessar Blog da Nuvv
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748B; text-align: center; margin: 0;">
          Você recebeu este e-mail porque se cadastrou no site oficial da Nuvv Telecom.<br />
          Nuvv Telecomunicações • Suzano & Região
        </p>
      </div>
    </div>
  `;

  if (!transporter) {
    console.log(`[SMTP SIMULATED] Welcome email prepared for ${recipientEmail}`);
    logEmail(recipientEmail, subject, 'welcome_newsletter', 'simulated_no_smtp');
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: recipientEmail,
      subject,
      html,
    });
    logEmail(recipientEmail, subject, 'welcome_newsletter', 'sent');
    return { success: true, sent: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    logEmail(recipientEmail, subject, 'welcome_newsletter', 'failed', error.message);
    return { success: false, error: error.message };
  }
}

// 2. Broadcast Blog Post to All Active Subscribers
export async function sendBlogBroadcast(post) {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  const subscribers = db.prepare("SELECT email FROM newsletter_subscribers WHERE status = 'active'").all();
  if (subscribers.length === 0) {
    return { success: true, count: 0, message: 'Nenhum assinante ativo cadastrado.' };
  }

  const subject = `📰 Novo no Blog Nuvv: ${post.title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0E14; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
      <div style="background: #111827; padding: 24px; text-align: center; border-bottom: 2px solid #10B981;">
        <span style="font-size: 11px; font-weight: bold; background: #064E3B; color: #34D399; padding: 4px 10px; border-radius: 20px; text-transform: uppercase;">
          ${post.category || 'Novidade Nuvv'}
        </span>
        <h1 style="margin: 12px 0 0 0; font-size: 22px; color: #FFFFFF; line-height: 1.3;">${post.title}</h1>
      </div>

      <div style="padding: 24px; line-height: 1.6; color: #CBD5E1;">
        <p style="font-size: 15px; color: #E2E8F0;">${post.excerpt || 'Confira a nova matéria completa no nosso blog com dicas essenciais para o seu dia a dia digital.'}</p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="https://nuvv.com.br/blog/${post.slug || ''}" style="background: #10B981; color: #022C22; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 10px; display: inline-block; font-size: 14px;">
            Ler Artigo Completo
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748B; text-align: center; margin: 0;">
          Você está recebendo este e-mail porque assina a Nuvv News.<br />
          Nuvv Telecom • Conectando você ao que importa
        </p>
      </div>
    </div>
  `;

  let sentCount = 0;
  let errorCount = 0;

  for (const sub of subscribers) {
    if (!transporter) {
      logEmail(sub.email, subject, 'blog_broadcast', 'simulated_no_smtp');
      sentCount++;
      continue;
    }

    try {
      await transporter.sendMail({
        from: config.from,
        to: sub.email,
        subject,
        html,
      });
      logEmail(sub.email, subject, 'blog_broadcast', 'sent');
      sentCount++;
    } catch (err) {
      errorCount++;
      logEmail(sub.email, subject, 'blog_broadcast', 'failed', err.message);
    }
  }

  // Update last_notified_at
  db.prepare("UPDATE newsletter_subscribers SET last_notified_at = CURRENT_TIMESTAMP WHERE status = 'active'").run();

  return {
    success: true,
    total: subscribers.length,
    sentCount,
    errorCount,
    simulated: !transporter,
  };
}

// 3. Send Internal Alert for Viability Lead
export async function sendViabilityAlert(viability) {
  const config = getSmtpConfig();
  const transporter = createTransporter();
  const recipient = config.adminEmail;

  const statusText = viability.has_feasibility ? '✅ COM VIABILIDADE' : '⚠️ FORA DE COBERTURA (Demanda Reprimida)';
  const subject = `[Lead Viabilidade] ${statusText} - ${viability.neighborhood || viability.city || 'CEP ' + viability.cep}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF; color: #1E293B; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden;">
      <div style="background: ${viability.has_feasibility ? '#065F46' : '#991B1B'}; color: #FFFFFF; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 18px;">Nova Consulta de Viabilidade Técnica</h2>
        <span style="font-size: 13px; font-weight: bold;">Status: ${statusText}</span>
      </div>

      <div style="padding: 24px; font-size: 13px; line-height: 1.6;">
        <p><strong>Nome:</strong> ${viability.name || 'Não informado'}</p>
        <p><strong>Telefone / WhatsApp:</strong> ${viability.phone || 'Não informado'}</p>
        <p><strong>E-mail:</strong> ${viability.email || 'Não informado'}</p>
        <p><strong>CEP:</strong> ${viability.cep}</p>
        <p><strong>Endereço:</strong> ${viability.street || ''}, nº ${viability.number || 'S/N'} - ${viability.neighborhood || ''}, ${viability.city || 'Suzano'} - ${viability.state || 'SP'}</p>
        <p><strong>Tipo de Serviço:</strong> ${viability.service_type || 'Residencial'}</p>
        <p><strong>Plano de Interesse:</strong> ${viability.plan_interested || 'Não especificado'}</p>
        <p><strong>Data da Consulta:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      </div>
    </div>
  `;

  if (!transporter) {
    logEmail(recipient, subject, 'viability_alert', 'simulated_no_smtp');
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: recipient,
      subject,
      html,
    });
    logEmail(recipient, subject, 'viability_alert', 'sent');
    return { success: true };
  } catch (err) {
    logEmail(recipient, subject, 'viability_alert', 'failed', err.message);
    return { success: false, error: err.message };
  }
}
