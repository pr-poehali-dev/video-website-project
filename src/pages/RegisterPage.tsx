import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    console.log('Register:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent" style={{fontFamily: 'Montserrat'}}>
              VideoHub 🚀
            </div>
          </Link>
          <p className="text-gray-600 mt-2" style={{fontFamily: 'Open Sans'}}>
            Создайте аккаунт за минуту
          </p>
        </div>

        {/* Registration Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя пользователя</Label>
                <div className="relative">
                  <Icon name="User" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 border-gray-200 focus:border-game-blue"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 border-gray-200 focus:border-game-blue"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                  <Icon name="Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 border-gray-200 focus:border-game-blue"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={14} />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                  <Icon name="Lock" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 border-gray-200 focus:border-game-blue"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={14} />
                  </Button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="text-xs text-gray-600">
                Пароль должен содержать минимум 8 символов
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="rounded"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  Я принимаю{' '}
                  <Link to="/terms" className="text-game-blue hover:text-game-blue/80">
                    условия использования
                  </Link>{' '}
                  и{' '}
                  <Link to="/privacy" className="text-game-blue hover:text-game-blue/80">
                    политику конфиденциальности
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-game-blue hover:bg-game-blue/90 text-white" 
                size="lg"
                disabled={!acceptTerms}
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Создать аккаунт
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-600">или</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Registration */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Globe" size={16} className="mr-2" />
                Регистрация через Google
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Github" size={16} className="mr-2" />
                Регистрация через GitHub
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Уже есть аккаунт? </span>
              <Link to="/login" className="text-game-blue hover:text-game-blue/80 font-medium">
                Войти
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 bg-gradient-to-r from-game-blue to-game-purple rounded-xl p-4 text-white text-center">
          <h3 className="font-semibold mb-2" style={{fontFamily: 'Montserrat'}}>
            Присоединяйтесь к 1M+ геймеров!
          </h3>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <Icon name="Heart" size={16} className="mx-auto mb-1" />
              Избранное
            </div>
            <div>
              <Icon name="History" size={16} className="mx-auto mb-1" />
              История
            </div>
            <div>
              <Icon name="Trophy" size={16} className="mx-auto mb-1" />
              Достижения
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}