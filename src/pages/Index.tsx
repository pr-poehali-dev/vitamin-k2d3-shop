import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [city, setCity] = useState('');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [quantity, setQuantity] = useState(1);

  const productPrice = 2490;
  const discountPrice = 1118;
  
  const productImages = [
    'https://cdn.poehali.dev/files/1.png',
    'https://cdn.poehali.dev/files/2.png',
    'https://cdn.poehali.dev/files/3.png',
    'https://cdn.poehali.dev/files/4.png',
    'https://cdn.poehali.dev/files/5.png'
  ];
  
  const certificateImages = [
    'https://cdn.poehali.dev/files/Скан СГР К2 +Д3 МАХ (1)_page-0001.jpg',
    'https://cdn.poehali.dev/files/Скан СГР К2 +Д3 МАХ (1)_page-0002.jpg'
  ];

  const calculateDelivery = () => {
    const costs = {
      cdek: 350,
      yandex: 250,
      ozon: 300,
      russianpost: 400
    };
    
    if (deliveryMethod && city) {
      setDeliveryCost(costs[deliveryMethod as keyof typeof costs] || 0);
    }
  };

  const totalPrice = discountPrice * quantity + (deliveryCost || 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">PharmExpert</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#benefits" className="text-foreground hover:text-primary transition">Преимущества</a>
            <a href="#composition" className="text-foreground hover:text-primary transition">Состав</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition">Отзывы</a>
            <a href="#certificates" className="text-foreground hover:text-primary transition">Сертификаты</a>
            <a href="#order" className="text-foreground hover:text-primary transition">Заказать</a>
            <a href="#faq" className="text-foreground hover:text-primary transition">FAQ</a>
          </nav>
          <Button variant="default" className="hidden md:inline-flex">
            <Icon name="ShoppingCart" size={18} className="mr-2" />
            Корзина
          </Button>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-accent text-accent-foreground">Новинка 2026</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Vitamin K2 + D3 <span className="text-primary">MAX</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Синергия двух витаминов для здоровья костей, сердца и иммунитета. 
                Натуральный состав, максимальная биодоступность.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span>100% натуральный</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span>Премиальное сырье</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={20} />
                  <span>120 капсул</span>
                </div>
              </div>
              <div className="flex gap-4 pt-4 items-center">
                <Button size="lg" className="text-lg px-8">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  <span className="flex items-center gap-2">
                    Купить за <span className="line-through opacity-60">{productPrice}₽</span> {discountPrice}₽
                  </span>
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Подробнее
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
              <Carousel className="relative w-full max-w-xl mx-auto">
                <CarouselContent>
                  {productImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image}
                        alt={`Vitamin K2 + D3 MAX - фото ${index + 1}`}
                        className="relative rounded-2xl shadow-2xl w-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Почему выбирают <span className="text-primary">K2 + D3 MAX</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Bone',
                title: 'Крепкие кости',
                description: 'Витамин D3 помогает усваивать кальций, а K2 направляет его в кости, предотвращая отложения в сосудах'
              },
              {
                icon: 'Heart',
                title: 'Здоровое сердце',
                description: 'K2 защищает артерии от кальцификации, снижая риск сердечно-сосудистых заболеваний'
              },
              {
                icon: 'Shield',
                title: 'Крепкий иммунитет',
                description: 'Витамин D3 усиливает защитные функции организма и помогает бороться с инфекциями'
              },
              {
                icon: 'Zap',
                title: 'Больше энергии',
                description: 'Правильный баланс витаминов улучшает общее самочувствие и повышает жизненный тонус'
              },
              {
                icon: 'Leaf',
                title: 'Натуральный состав',
                description: 'Используем только природные источники витаминов без синтетических добавок'
              },
              {
                icon: 'Award',
                title: 'Сертифицировано',
                description: 'Производство соответствует стандартам GMP, все партии проходят контроль качества'
              }
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name={benefit.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="composition" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              Состав и дозировки
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Оптимальное соотношение для максимальной эффективности
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Витамин D3</CardTitle>
                    <Badge variant="secondary" className="text-lg">5000 МЕ</Badge>
                  </div>
                  <CardDescription>Холекальциферол</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Поддерживает здоровье костей и зубов</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Укрепляет иммунную систему</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Улучшает усвоение кальция</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Регулирует фосфорно-кальциевый обмен</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Витамин K2</CardTitle>
                    <Badge variant="secondary" className="text-lg">75 мкг</Badge>
                  </div>
                  <CardDescription>Менахинон-7 (МК-7)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Направляет кальций в кости</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Защищает сосуды от кальцификации</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Поддерживает здоровье сердца</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm">Улучшает свертываемость крови</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" className="text-primary" />
                  Дополнительные компоненты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon name="Dot" className="text-primary" size={16} />
                    <span>МСТ масло (триглицериды средней цепи) — для лучшего усвоения</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Dot" className="text-primary" size={16} />
                    <span>Желатиновая капсула — натуральная оболочка говяжий желатин (Халяль)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Dot" className="text-primary" size={16} />
                    <span>Без ГМО, глютена, лактозы и искусственных красителей</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Отзывы покупателей
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Анна Петрова',
                rating: 5,
                text: 'Принимаю уже третий месяц. Заметила улучшение самочувствия, меньше устаю. Анализы показали, что витамин D пришёл в норму!',
                date: '15 января 2026'
              },
              {
                name: 'Дмитрий Соколов',
                rating: 5,
                text: 'Отличное качество! Капсулы удобные, легко глотаются. Заказал сразу 3 упаковки по акции. Рекомендую.',
                date: '12 января 2026'
              },
              {
                name: 'Елена Васильева',
                rating: 5,
                text: 'Врач посоветовал именно такую комбинацию витаминов. Очень довольна результатом, буду заказывать ещё.',
                date: '8 января 2026'
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" className="text-primary fill-primary" size={16} />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-xs">{review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Оформление заказа
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Package" className="text-primary" />
                  Калькулятор доставки
                </CardTitle>
                <CardDescription>Рассчитайте стоимость доставки в ваш город</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ваш город</Label>
                  <Input 
                    id="city" 
                    placeholder="Например: Москва" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="delivery">Способ доставки</Label>
                  <Select value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <SelectTrigger id="delivery">
                      <SelectValue placeholder="Выберите способ доставки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cdek">
                        <div className="flex items-center gap-2">
                          <Icon name="Package" size={16} />
                          СДЭК (3-5 дней)
                        </div>
                      </SelectItem>
                      <SelectItem value="yandex">
                        <div className="flex items-center gap-2">
                          <Icon name="Truck" size={16} />
                          Яндекс Доставка (1-3 дня)
                        </div>
                      </SelectItem>
                      <SelectItem value="ozon">
                        <div className="flex items-center gap-2">
                          <Icon name="Package" size={16} />
                          Озон Доставка (2-4 дня)
                        </div>
                      </SelectItem>
                      <SelectItem value="russianpost">
                        <div className="flex items-center gap-2">
                          <Icon name="Mail" size={16} />
                          Почта РФ (5-10 дней)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateDelivery} 
                  className="w-full"
                  disabled={!city || !deliveryMethod}
                >
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать доставку
                </Button>

                {deliveryCost !== null && (
                  <div className="bg-accent/50 rounded-lg p-4 space-y-2 animate-fade-in">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Стоимость доставки:</span>
                      <span className="font-semibold text-lg">{deliveryCost}₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Срок доставки:</span>
                      <span className="text-muted-foreground">
                        {deliveryMethod === 'yandex' && '1-3 дня'}
                        {deliveryMethod === 'ozon' && '2-4 дня'}
                        {deliveryMethod === 'cdek' && '3-5 дней'}
                        {deliveryMethod === 'russianpost' && '5-10 дней'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="ShoppingCart" className="text-primary" />
                  Ваш заказ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Vitamin K2 + D3 MAX</span>
                    <span className="text-muted-foreground">{productPrice}₽</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Количество</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Icon name="Minus" size={16} />
                      </Button>
                      <Input 
                        id="quantity"
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="text-center"
                        min="1"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Icon name="Plus" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Способ оплаты</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Icon name="CreditCard" size={18} />
                        Банковская карта
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Icon name="Smartphone" size={18} />
                        СБП (Система Быстрых Платежей)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Icon name="Wallet" size={18} />
                        Наличные при получении
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Товары ({quantity} шт.)</span>
                    <span>{discountPrice * quantity}₽</span>
                  </div>
                  {deliveryCost !== null && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      <span>{deliveryCost}₽</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{totalPrice}₽</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Оформить заказ
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="certificates" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Сертификаты качества
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Наш продукт сертифицирован и соответствует всем стандартам
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certificateImages.map((image, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={image}
                    alt={`Сертификат ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Ответы на популярные вопросы о продукте
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Как принимать витамины K2 + D3?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Рекомендуется принимать 1 капсулу в день во время еды, желательно с пищей, содержащей жиры, 
                  для лучшего усвоения. Курс приёма — 3 месяца.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Есть ли противопоказания?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Индивидуальная непереносимость компонентов, беременность и период лактации (требуется консультация врача), 
                  приём антикоагулянтов. Перед применением рекомендуется проконсультироваться со специалистом.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  На сколько хватает одной упаковки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  В упаковке 120 капсул, при рекомендуемом приёме 1 капсула в день — это 4 месяца применения.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Какие сроки доставки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Яндекс Доставка: 1-3 дня, Озон Доставка: 2-4 дня, СДЭК: 3-5 дней, Почта РФ: 5-10 дней. 
                  Точные сроки зависят от вашего региона.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Можно ли вернуть товар?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, вы можете вернуть товар в течение 14 дней с момента получения, если упаковка не вскрыта. 
                  Возврат средств осуществляется в течение 10 рабочих дней.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                  Есть ли сертификаты качества?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, продукт имеет все необходимые сертификаты соответствия и декларацию о соответствии ТР ТС. 
                  Производство сертифицировано по стандарту GMP.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Остались вопросы?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="tel:+78001234567" className="flex items-center gap-2 text-lg hover:underline">
              <Icon name="Phone" size={20} />
              8 (800) 123-45-67
            </a>
            <a href="mailto:info@vitahealth.ru" className="flex items-center gap-2 text-lg hover:underline">
              <Icon name="Mail" size={20} />
              info@vitahealth.ru
            </a>
            <a href="#" className="flex items-center gap-2 text-lg hover:underline">
              <Icon name="MessageCircle" size={20} />
              Telegram
            </a>
          </div>
          <p className="text-sm opacity-75">
            Режим работы: Пн-Пт с 9:00 до 18:00 (МСК)
          </p>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">PharmExpert</span>
            </div>
            <p className="text-sm opacity-75">
              © 2026 PharmExpert. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}