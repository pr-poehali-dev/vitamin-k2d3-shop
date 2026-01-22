import { useState } from 'react';
import Icon from '@/components/ui/icon';
import HeroSection from '@/components/HeroSection';
import ProductInfo from '@/components/ProductInfo';
import OrderForm from '@/components/OrderForm';

export default function Index() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productPrice = 2490;
  const discountPrice = 1118;

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 0 && cleaned.length < 11) {
      setPhoneError('Номер телефона должен содержать 11 цифр');
    } else {
      setPhoneError('');
    }
  };

  const validateEmail = (value: string) => {
    setEmail(value);
    
    if (!value) {
      setEmailError('');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Введите корректный email');
    } else {
      setEmailError('');
    }
  };

  const handleSubmitOrder = async () => {
    if (!fullName || !phone || !email || !address || !deliveryMethod) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    if (phoneError || emailError) {
      alert('Пожалуйста, исправьте ошибки в форме');
      return;
    }
    
    const cleanedPhone = phone.replace(/\D/g, '');
    if (cleanedPhone.length !== 11) {
      alert('Номер телефона должен содержать 11 цифр');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/534f3530-abca-477f-80ee-ce1522fd46ac', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          address,
          quantity,
          deliveryMethod,
          paymentMethod,
          total: discountPrice * quantity
        })
      });

      const data = await response.json();

      if (response.ok && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert(data.error || 'Произошла ошибка при оформлении заказа');
      }
    } catch (error) {
      alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
      console.error('Order error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const productImages = [
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/1%20(1).png',
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/2.png',
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/3.png',
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/4.png',
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/5.png',
    'https://cdn.poehali.dev/projects/4696e304-b9fe-407b-ade8-de9ddc6c34d7/bucket/6.png'
  ];
  
  const certificateImages = [
    'https://cdn.poehali.dev/files/Скан СГР К2 +Д3 МАХ (1)_page-0001.jpg',
    'https://cdn.poehali.dev/files/Скан СГР К2 +Д3 МАХ (1)_page-0002.jpg'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="bg-primary/10 border-b border-primary/20 py-2">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2">
          <Icon name="MessageCircle" size={18} className="text-primary" />
          <span className="text-sm text-foreground">Нужна консультация?</span>
          <a 
            href="https://t.me/badpoehalibot" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:text-primary/80 transition underline"
          >
            Напишите нам в Telegram
          </a>
        </div>
      </div>
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">PharmExpert</h1>
          </div>
          <nav className="hidden md:flex gap-4 lg:gap-6 text-sm lg:text-base">
            <a href="#benefits" className="text-foreground hover:text-primary transition">Преимущества</a>
            <a href="#composition" className="text-foreground hover:text-primary transition">Состав</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition">Отзывы</a>
            <a href="#certificates" className="text-foreground hover:text-primary transition">Сертификаты</a>
            <a href="#order" className="text-foreground hover:text-primary transition">Заказать</a>
            <a href="#faq" className="text-foreground hover:text-primary transition">FAQ</a>
          </nav>
        </div>
      </header>

      <HeroSection 
        productPrice={productPrice}
        discountPrice={discountPrice}
        productImages={productImages}
      />

      <ProductInfo certificateImages={certificateImages} />

      <OrderForm
        quantity={quantity}
        setQuantity={setQuantity}
        fullName={fullName}
        setFullName={setFullName}
        phone={phone}
        handlePhoneChange={handlePhoneChange}
        phoneError={phoneError}
        email={email}
        validateEmail={validateEmail}
        emailError={emailError}
        address={address}
        setAddress={setAddress}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isSubmitting={isSubmitting}
        handleSubmitOrder={handleSubmitOrder}
        productPrice={productPrice}
        discountPrice={discountPrice}
      />

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