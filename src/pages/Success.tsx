import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      document.title = 'Спасибо за заказ! - PharmExpert';
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="CheckCircle" className="text-primary" size={48} />
            </div>
          </div>
          <CardTitle className="text-3xl sm:text-4xl">Спасибо за заказ!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg text-muted-foreground">
            Ваш заказ успешно оплачен и принят в обработку.
          </p>
          
          {orderId && (
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Номер заказа:</p>
              <p className="text-xl font-bold text-foreground">{orderId}</p>
            </div>
          )}

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3 text-left">
              <Icon name="Mail" className="text-primary mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold">Подтверждение отправлено</p>
                <p className="text-sm text-muted-foreground">
                  Проверьте вашу почту — мы отправили детали заказа
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <Icon name="Truck" className="text-primary mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold">Доставка в пути</p>
                <p className="text-sm text-muted-foreground">
                  Мы свяжемся с вами для уточнения деталей доставки
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <Icon name="Phone" className="text-primary mt-1 flex-shrink-0" size={20} />
              <div>
                <p className="font-semibold">Остались вопросы?</p>
                <p className="text-sm text-muted-foreground">
                  Наша служба поддержки готова помочь вам в любое время
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => window.location.href = '/'}
            >
              <Icon name="Home" size={18} className="mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
