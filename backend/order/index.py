import json
import os
import urllib.request
import urllib.parse
import smtplib
import base64
import uuid
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event: dict, context) -> dict:
    '''Обработка заказа и отправка уведомлений в Telegram и Email'''
    
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
        
        full_name = body.get('fullName', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        address = body.get('address', '')
        quantity = body.get('quantity', 1)
        delivery_method = body.get('deliveryMethod', '')
        payment_method = body.get('paymentMethod', '')
        total = body.get('total', 0)
        
        if not all([full_name, phone, email, address, delivery_method]):
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Не все обязательные поля заполнены'})
            }
        
        delivery_names = {
            'cdek': 'СДЭК (3-5 дней)',
            'yandex': 'Яндекс Доставка (1-3 дня)',
            'ozon': 'Озон Доставка (2-4 дня)',
            'wb': 'WB доставка (2-5 дней)',
            'russianpost': 'Почта РФ (5-10 дней)'
        }
        
        payment_names = {
            'card': 'Банковская карта',
            'sbp': 'СБП (Система Быстрых Платежей)'
        }
        
        telegram_message = f"""🛒 НОВЫЙ ЗАКАЗ!

📦 Товар: Vitamin K2 + D3 MAX
📊 Количество: {quantity} шт.
💰 Сумма: {total}₽

👤 Клиент:
ФИО: {full_name}
📞 Телефон: {phone}
📧 Email: {email}
🏠 Адрес: {address}

🚚 Доставка: {delivery_names.get(delivery_method, delivery_method)}
💳 Оплата: {payment_names.get(payment_method, payment_method)}"""
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = '@an_761'
        
        if telegram_token:
            telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
            telegram_data = urllib.parse.urlencode({
                'chat_id': telegram_chat_id,
                'text': telegram_message,
                'parse_mode': 'HTML'
            }).encode()
            
            try:
                telegram_request = urllib.request.Request(telegram_url, data=telegram_data)
                urllib.request.urlopen(telegram_request)
            except Exception as e:
                print(f'Telegram error: {e}')
        
        email_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2 style="color: #2563eb;">Новый заказ на сайте PharmExpert</h2>
            
            <h3>Информация о заказе:</h3>
            <p><strong>Товар:</strong> Vitamin K2 + D3 MAX</p>
            <p><strong>Количество:</strong> {quantity} шт.</p>
            <p><strong>Сумма:</strong> {total}₽</p>
            
            <h3>Данные клиента:</h3>
            <p><strong>ФИО:</strong> {full_name}</p>
            <p><strong>Телефон:</strong> {phone}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Адрес:</strong> {address}</p>
            
            <h3>Детали доставки и оплаты:</h3>
            <p><strong>Способ доставки:</strong> {delivery_names.get(delivery_method, delivery_method)}</p>
            <p><strong>Способ оплаты:</strong> {payment_names.get(payment_method, payment_method)}</p>
            
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
                msg['Subject'] = f'Новый заказ от {full_name}'
                msg['From'] = smtp_user
                msg['To'] = '89287730553@mail.ru'
                
                html_part = MIMEText(email_body, 'html', 'utf-8')
                msg.attach(html_part)
                
                with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                    server.login(smtp_user, smtp_password)
                    server.send_message(msg)
            except Exception as e:
                print(f'Email error: {e}')
        
        yookassa_shop_id = os.environ.get('YOOKASSA_SHOP_ID')
        yookassa_secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
        
        if not yookassa_shop_id or not yookassa_secret_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'ЮКасса не настроена. Добавьте YOOKASSA_SHOP_ID и YOOKASSA_SECRET_KEY'})
            }
        
        idempotence_key = str(uuid.uuid4())
        
        payment_payload = {
            "amount": {
                "value": f"{total}.00",
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "https://pharmexpert.example.com/success"
            },
            "capture": True,
            "description": f"Заказ Vitamin K2 + D3 MAX x{quantity}",
            "metadata": {
                "customer_name": full_name,
                "customer_phone": phone,
                "customer_email": email,
                "customer_address": address,
                "delivery_method": delivery_method,
                "quantity": quantity
            }
        }
        
        if payment_method == 'sbp':
            payment_payload['payment_method_data'] = {'type': 'sbp'}
        
        auth_string = f"{yookassa_shop_id}:{yookassa_secret_key}"
        auth_bytes = auth_string.encode('utf-8')
        auth_base64 = base64.b64encode(auth_bytes).decode('utf-8')
        
        yookassa_url = 'https://api.yookassa.ru/v3/payments'
        yookassa_headers = {
            'Authorization': f'Basic {auth_base64}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json'
        }
        
        try:
            yookassa_request = urllib.request.Request(
                yookassa_url,
                data=json.dumps(payment_payload).encode('utf-8'),
                headers=yookassa_headers,
                method='POST'
            )
            
            with urllib.request.urlopen(yookassa_request) as response:
                payment_response = json.loads(response.read().decode('utf-8'))
                confirmation_url = payment_response.get('confirmation', {}).get('confirmation_url')
                
                if confirmation_url:
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'success': True,
                            'paymentUrl': confirmation_url,
                            'message': 'Заказ создан. Перенаправление на оплату...'
                        })
                    }
                else:
                    return {
                        'statusCode': 500,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Не удалось создать платёж'})
                    }
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            print(f'YooKassa error: {error_body}')
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка при создании платежа', 'details': error_body})
            }
        except Exception as e:
            print(f'Payment creation error: {e}')
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка при создании платежа', 'details': str(e)})
            }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Произошла ошибка при обработке заказа',
                'details': str(e)
            })
        }