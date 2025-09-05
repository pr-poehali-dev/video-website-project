import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Channel {
  id: string;
  handle: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  banner?: string;
  followers_count: number;
  videos_count: number;
  isSubscribed?: boolean;
}

interface ChannelCardProps {
  channel: Channel;
  variant?: 'default' | 'horizontal' | 'compact';
  showSubscribeButton?: boolean;
  className?: string;
  onSubscribe?: (channelId: string) => void;
}

function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export default function ChannelCard({
  channel,
  variant = 'default',
  showSubscribeButton = true,
  className,
  onSubscribe
}: ChannelCardProps) {

  const handleSubscribe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubscribe?.(channel.id);
  };

  if (variant === 'horizontal') {
    return (
      <Link to={`/channel/${channel.handle}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer",
          className
        )}>
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4">
              <Avatar size="lg">
                <AvatarImage src={channel.avatar} alt={channel.displayName} />
                <AvatarFallback>{channel.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-game-blue transition-colors">
                  {channel.displayName}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {channel.bio}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Icon name="Users" size={14} className="mr-1" />
                  {formatFollowers(channel.followers_count)} подписчиков
                  <span className="mx-2">•</span>
                  <Icon name="Video" size={14} className="mr-1" />
                  {channel.videos_count} видео
                </div>
              </div>

              {showSubscribeButton && (
                <Button
                  size="sm"
                  variant={channel.isSubscribed ? "secondary" : "default"}
                  onClick={handleSubscribe}
                  className={cn(
                    "min-w-[100px]",
                    !channel.isSubscribed && "bg-game-blue hover:bg-game-blue/90 text-white"
                  )}
                >
                  {channel.isSubscribed ? (
                    <>
                      <Icon name="Check" size={14} className="mr-1" />
                      Подписан
                    </>
                  ) : (
                    <>
                      <Icon name="UserPlus" size={14} className="mr-1" />
                      Подписаться
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/channel/${channel.handle}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer text-center",
          className
        )}>
          <CardContent className="p-4">
            <Avatar size="lg" className="mx-auto mb-3">
              <AvatarImage src={channel.avatar} alt={channel.displayName} />
              <AvatarFallback>{channel.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-game-blue transition-colors">
              {channel.displayName}
            </h3>
            
            <div className="text-xs text-gray-500 mb-2">
              {formatFollowers(channel.followers_count)} подписчиков
            </div>

            {showSubscribeButton && (
              <Button
                size="sm"
                variant={channel.isSubscribed ? "secondary" : "default"}
                onClick={handleSubscribe}
                className={cn(
                  "w-full",
                  !channel.isSubscribed && "bg-game-blue hover:bg-game-blue/90 text-white"
                )}
              >
                {channel.isSubscribed ? 'Подписан' : 'Подписаться'}
              </Button>
            )}
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/channel/${channel.handle}`}>
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer hover:scale-105",
        className
      )}>
        <CardContent className="p-0">
          {/* Banner */}
          {channel.banner && (
            <div className="relative h-32 bg-gradient-to-r from-game-blue to-game-purple">
              <img 
                src={channel.banner} 
                alt={`${channel.displayName} banner`}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 text-center">
            {/* Avatar */}
            <Avatar size="xl" className={cn("mx-auto mb-4", channel.banner && "-mt-8 border-4 border-white")}>
              <AvatarImage src={channel.avatar} alt={channel.displayName} />
              <AvatarFallback>{channel.displayName.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Channel Info */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-game-blue transition-colors">
              {channel.displayName}
            </h3>
            
            {channel.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {channel.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {formatFollowers(channel.followers_count)}
              </div>
              <div className="flex items-center">
                <Icon name="Video" size={14} className="mr-1" />
                {channel.videos_count} видео
              </div>
            </div>

            {/* Subscribe Button */}
            {showSubscribeButton && (
              <Button
                variant={channel.isSubscribed ? "secondary" : "default"}
                onClick={handleSubscribe}
                className={cn(
                  "w-full",
                  !channel.isSubscribed && "bg-game-blue hover:bg-game-blue/90 text-white"
                )}
              >
                {channel.isSubscribed ? (
                  <>
                    <Icon name="Check" size={16} className="mr-2" />
                    Подписан
                  </>
                ) : (
                  <>
                    <Icon name="UserPlus" size={16} className="mr-2" />
                    Подписаться
                  </>
                )}
              </Button>
            )}

            {/* Verified Badge */}
            <div className="flex justify-center mt-2">
              <Badge variant="secondary" size="sm">
                <Icon name="BadgeCheck" size={12} className="mr-1" />
                Проверен
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}