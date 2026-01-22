import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import AddressAutocomplete from '@/components/AddressAutocomplete';
import InputMask from 'react-input-mask';

interface OrderFormProps {
  quantity: number;
  setQuantity: (value: number) => void;
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  handlePhoneChange: (value: string) => void;
  phoneError: string;
  email: string;
  validateEmail: (value: string) => void;
  emailError: string;
  address: string;
  setAddress: (value: string) => void;
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  isSubmitting: boolean;
  handleSubmitOrder: () => void;
  productPrice: number;
  discountPrice: number;
}

export default function OrderForm({
  quantity,
  setQuantity,
  fullName,
  setFullName,
  phone,
  handlePhoneChange,
  phoneError,
  email,
  validateEmail,
  emailError,
  address,
  setAddress,
  deliveryMethod,
  setDeliveryMethod,
  paymentMethod,
  setPaymentMethod,
  isSubmitting,
  handleSubmitOrder,
  productPrice,
  discountPrice
}: OrderFormProps) {
  return (
    <section id="order" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
          Оформление заказа
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="ShoppingCart" className="text-primary" />
                Ваш заказ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Vitamin D3 MAX + K2</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-muted-foreground text-sm">{productPrice}₽</span>
                    <span className="font-bold text-primary">{discountPrice}₽</span>
                  </div>
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

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Контактные данные</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">ФИО <span className="text-destructive">*</span></Label>
                  <Input 
                    id="fullName" 
                    placeholder="Иванов Иван Иванович" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон <span className="text-destructive">*</span></Label>
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  >
                    {(inputProps: any) => (
                      <Input 
                        {...inputProps}
                        id="phone" 
                        type="tel"
                        placeholder="+7 (999) 123-45-67" 
                        className={phoneError ? 'border-destructive' : ''}
                        required
                      />
                    )}
                  </InputMask>
                  {phoneError && <p className="text-xs text-destructive">{phoneError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="example@mail.ru" 
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    className={emailError ? 'border-destructive' : ''}
                    required
                  />
                  {emailError && <p className="text-xs text-destructive">{emailError}</p>}
                </div>
              </div>

              <Separator />

              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                required
              />

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="delivery">Способ доставки <span className="text-destructive">*</span></Label>
                <Select value={deliveryMethod} onValueChange={setDeliveryMethod} required>
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
                    <SelectItem value="wb">
                      <div className="flex items-center gap-2">
                        <Icon name="Package" size={16} />
                        WB доставка (2-5 дней)
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
                </RadioGroup>
              </div>

              <div className="bg-primary/10 rounded-lg p-3 border border-primary/30">
                <div className="flex items-center gap-2">
                  <Icon name="Truck" className="text-primary" size={20} />
                  <span className="text-sm font-semibold text-primary">Бесплатная доставка по всей России</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Товары ({quantity} шт.)</span>
                  <span>{discountPrice * quantity}₽</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-primary font-semibold">БЕСПЛАТНО</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-base sm:text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{discountPrice * quantity}₽</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSubmitOrder}
                disabled={isSubmitting || !fullName || !phone || !email || !address || !deliveryMethod}
              >
                <Icon name="ShoppingBag" size={18} className="mr-2" />
                {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}