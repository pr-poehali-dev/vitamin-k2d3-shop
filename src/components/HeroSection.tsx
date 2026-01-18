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
              Vitamin K2 + D3 <span className="text-primary">MAX</span>
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
                      alt={`Vitamin K2 + D3 MAX - фото ${index + 1}`}
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
