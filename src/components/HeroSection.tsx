import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  productPrice: number;
  discountPrice: number;
  productImages: string[];
}

export default function HeroSection({ productPrice, discountPrice, productImages }: HeroSectionProps) {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-accent text-accent-foreground">Новинка 2026</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Vitamin D3 <span className="text-primary">MAX</span> + K2
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Синергия двух витаминов для здоровья костей, сердца и иммунитета. 
              Натуральный состав, максимальная биодоступность.
            </p>
            <div className="flex flex-wrap gap-3 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={18} />
                <span>100% натуральный</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={18} />
                <span>Премиальное сырье</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Check" className="text-primary" size={18} />
                <span>120 капсул</span>
              </div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-start gap-4">
              <img 
                src="https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/2ec09252-d831-40b1-a1da-039b2bc1d54c.png" 
                alt="Честный ЗНАК"
                className="w-16 h-16 object-contain flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base mb-1">Маркировка «Честный ЗНАК»</h3>
                <p className="text-sm text-muted-foreground">
                  Каждая упаковка имеет уникальный код для проверки подлинности. Проверьте товар в приложении «Честный ЗНАК» или на сайте <a href="https://честныйзнак.рф" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">честныйзнак.рф</a>
                </p>
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 border-2 border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Truck" className="text-primary" size={24} />
                <span className="text-lg sm:text-xl font-bold text-primary">БЕСПЛАТНАЯ ДОСТАВКА</span>
              </div>
              <p className="text-sm text-muted-foreground">Вы сможете выбрать удобный способ доставки при оформлении заказа</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                <span className="flex items-center gap-2">
                  Купить за <span className="line-through opacity-60">{productPrice}₽</span> {discountPrice}₽
                </span>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg w-full sm:w-auto">
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
                      alt={`Vitamin D3 MAX + K2 - фото ${index + 1}`}
                      className="relative rounded-xl sm:rounded-2xl shadow-2xl w-full object-contain"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 sm:left-4" />
              <CarouselNext className="right-2 sm:right-4" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}