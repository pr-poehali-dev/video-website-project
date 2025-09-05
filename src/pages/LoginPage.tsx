import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', { email, password });
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
            Войдите в свой аккаунт
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Icon name="Mail" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 rounded" />
                  Запомнить меня
                </label>
                <Link to="/forgot-password" className="text-game-blue hover:text-game-blue/80">
                  Забыли пароль?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-game-blue hover:bg-game-blue/90 text-white" size="lg">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-600">или</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Globe" size={16} className="mr-2" />
                Войти через Google
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <Icon name="Github" size={16} className="mr-2" />
                Войти через GitHub
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">Нет аккаунта? </span>
              <Link to="/register" className="text-game-blue hover:text-game-blue/80 font-medium">
                Регистрация
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Features */}
        <div className="mt-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Возможности аккаунта
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="Heart" size={16} className="text-game-red" />
              <span>Избранные видео</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="History" size={16} className="text-game-blue" />
              <span>История просмотров</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="UserPlus" size={16} className="text-game-purple" />
              <span>Подписки на каналы</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Icon name="Settings" size={16} className="text-game-teal" />
              <span>Персонализация</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}