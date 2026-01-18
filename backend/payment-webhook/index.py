import json
import os
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Webhook для обработки уведомлений об оплате от ЮКассы'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        event_type = body.get('event')
        payment_object = body.get('object', {})
        
        if event_type != 'payment.succeeded':
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'status': 'ignored'})
            }
        
        payment_id = payment_object.get('id')
        amount = payment_object.get('amount', {}).get('value', '0')
        metadata = payment_object.get('metadata', {})
        
        customer_name = metadata.get('customer_name', 'Неизвестно')
        customer_phone = metadata.get('customer_phone', 'Не указан')
        customer_email = metadata.get('customer_email', 'Не указан')
        customer_address = metadata.get('customer_address', 'Не указан')
        delivery_method = metadata.get('delivery_method', 'Не указан')
        quantity = metadata.get('quantity', 1)
        
        delivery_names = {
            'cdek': 'СДЭК (3-5 дней)',
            'yandex': 'Яндекс Доставка (1-3 дня)',
            'ozon': 'Озон Доставка (2-4 дня)',
            'wb': 'WB доставка (2-5 дней)',
            'russianpost': 'Почта РФ (5-10 дней)'
        }
        
        telegram_message = f"""✅ ЗАКАЗ ОПЛАЧЕН!

📦 Товар: Vitamin K2 + D3 MAX
📊 Количество: {quantity} шт.
💰 Сумма: {amount}₽
💳 ID платежа: {payment_id}

👤 Клиент:
ФИО: {customer_name}
📞 Телефон: {customer_phone}
📧 Email: {customer_email}
🏠 Адрес: {customer_address}

🚚 Доставка: {delivery_names.get(delivery_method, delivery_method)}

🟢 Статус: ОПЛАЧЕНО"""
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
            telegram_data = urllib.parse.urlencode({
                'chat_id': telegram_chat_id,
                'text': telegram_message
            }).encode()
            
            try:
                telegram_request = urllib.request.Request(telegram_url, data=telegram_data)
                urllib.request.urlopen(telegram_request)
            except Exception as e:
                print(f'Telegram error: {e}')
        
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #22c55e;">✅ Заказ успешно оплачен!</h2>
            
            <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 18px;"><strong>ID платежа:</strong> {payment_id}</p>
                <p style="margin: 10px 0 0 0; font-size: 18px; color: #22c55e;"><strong>Статус: ОПЛАЧЕНО</strong></p>
            </div>
            
            <h3>Информация о заказе:</h3>
            <p><strong>Товар:</strong> Vitamin K2 + D3 MAX</p>
            <p><strong>Количество:</strong> {quantity} шт.</p>
            <p><strong>Сумма:</strong> {amount}₽</p>
            
            <h3>Данные клиента:</h3>
            <p><strong>ФИО:</strong> {customer_name}</p>
            <p><strong>Телефон:</strong> {customer_phone}</p>
            <p><strong>Email:</strong> {customer_email}</p>
            <p><strong>Адрес:</strong> {customer_address}</p>
            
            <h3>Детали доставки:</h3>
            <p><strong>Способ доставки:</strong> {delivery_names.get(delivery_method, delivery_method)}</p>
            
            <hr>
            <p style="color: #666; font-size: 12px;">Доставка бесплатная по всей России</p>
        </body>
        </html>
        """
        
        smtp_server = os.environ.get('SMTP_SERVER', 'smtp.mail.ru')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if smtp_user and smtp_password:
            try:
                msg = MIMEMultipart('alternative')
                msg['Subject'] = f'✅ Заказ оплачен - {customer_name}'
                msg['From'] = smtp_user
                msg['To'] = '89287730553@mail.ru'
                
                html_part = MIMEText(email_body, 'html', 'utf-8')
                msg.attach(html_part)
                
                with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
            except Exception as e:
                print(f'Email error: {e}')
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'status': 'success'})
        }
        
    except Exception as e:
        print(f'Webhook error: {e}')
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }