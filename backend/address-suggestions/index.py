import json
import os
import urllib.request

def handler(event: dict, context) -> dict:
    '''Получение подсказок адресов через DaData API'''
    
    method = event.get('httpMethod', 'GET')
    
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
        query = body.get('query', '')
        
        if not query or len(query) < 3:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'suggestions': []})
            }
        
        dadata_api_key = os.environ.get('DADATA_API_KEY')
        
        if not dadata_api_key:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'DADATA_API_KEY не настроен'})
            }
        
        dadata_url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
        dadata_headers = {
            'Authorization': f'Token {dadata_api_key}',
            'Content-Type': 'application/json'
        }
        
        payload = json.dumps({'query': query, 'count': 5}).encode('utf-8')
        
        dadata_request = urllib.request.Request(
            dadata_url,
            data=payload,
            headers=dadata_headers,
            method='POST'
        )
        
        with urllib.request.urlopen(dadata_request) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result)
            }
            
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'DaData error: {error_body}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
