import VideoCard from '@/components/cards/VideoCard';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnails: string[];
  duration_sec: number;
  views_count: number;
  publishedAt: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatar?: string;
  };
  categories?: { name: string; slug: string }[];
}

interface VideoGridProps {
  videos: Video[];
  loading?: boolean;
  variant?: 'default' | 'horizontal' | 'compact';
  columns?: 2 | 3 | 4 | 5 | 6;
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

const VideoGridSkeleton = ({ columns = 4, variant = 'default' }: { columns: number, variant: string }) => {
  const skeletonCount = columns * 2;
  
  if (variant === 'horizontal') {
    return (
      <div className="space-y-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-48 h-28 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns])}>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className={cn(
            "w-full rounded-lg",
            variant === 'compact' ? "h-24" : "h-48"
          )} />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
            {variant !== 'compact' && <Skeleton className="h-3 w-1/2" />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function VideoGrid({
  videos,
  loading = false,
  variant = 'default',
  columns = 4,
  showAuthor = true,
  showCategory = false,
  className
}: VideoGridProps) {

  if (loading) {
    return <VideoGridSkeleton columns={columns} variant={variant} />;
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">🎬</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Видео не найдены</h3>
        <p className="text-gray-500">Попробуйте изменить фильтры или поисковый запрос</p>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={cn('space-y-4', className)}>
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            variant="horizontal"
            showAuthor={showAuthor}
            showCategory={showCategory}
          />
        ))}
      </div>
    );
  }

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
  };

  return (
    <div className={cn(
      'grid gap-6',
      gridCols[columns],
      className
    )}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          variant={variant}
          showAuthor={showAuthor}
          showCategory={showCategory}
        />
      ))}
    </div>
  );
}