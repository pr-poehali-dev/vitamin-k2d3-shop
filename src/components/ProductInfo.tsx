import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface ProductInfoProps {
  certificateImages: string[];
}

export default function ProductInfo({ certificateImages }: ProductInfoProps) {
  return (
    <>
      <section id="benefits" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Почему выбирают <span className="text-primary">D3 MAX + K2</span>
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                  <CardTitle className="text-lg sm:text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="composition" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
              Состав и дозировки
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base md:text-lg">
              Оптимальное соотношение для максимальной эффективности
            </p>
            
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl">Витамин D3</CardTitle>
                    <Badge variant="secondary" className="text-base sm:text-lg">5000 МЕ</Badge>
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
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
            Отзывы покупателей
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
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
                  <p className="text-sm sm:text-base text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="certificates" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Сертификаты качества
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-4">
            Наш продукт сертифицирован и соответствует всем стандартам
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {certificateImages.map((image, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={image}
                    alt={`Сертификат ${index + 1}`}
                    className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(image, '_blank')}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-center text-muted-foreground mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-4">
            Ответы на популярные вопросы о продукте
          </p>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:text-primary">
                  Как принимать витамины D3 MAX + K2?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                  Рекомендуется принимать 1 капсулу в день во время еды, желательно с пищей, содержащей жиры, 
                  для лучшего усвоения. Курс приёма — 3 месяца.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-base sm:text-lg font-semibold hover:text-primary">
                  Есть ли противопоказания?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground">
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

      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Остались вопросы?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Свяжитесь с нами любым удобным способом
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            <a href="tel:+78001234567" className="flex items-center justify-center gap-2 text-base sm:text-lg hover:underline">
              <Icon name="Phone" size={18} />
              8 (800) 123-45-67
            </a>
            <a href="mailto:info@vitahealth.ru" className="flex items-center justify-center gap-2 text-base sm:text-lg hover:underline">
              <Icon name="Mail" size={18} />
              info@vitahealth.ru
            </a>
            <a href="#" className="flex items-center justify-center gap-2 text-base sm:text-lg hover:underline">
              <Icon name="MessageCircle" size={18} />
              Telegram
            </a>
          </div>
          <p className="text-xs sm:text-sm opacity-75">
            Режим работы: Пн-Пт с 9:00 до 18:00 (МСК)
          </p>
        </div>
      </section>
    </>
  );
}