import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface SortOption {
  value: string;
  label: string;
  icon?: string;
}

interface FilterBarProps {
  categories?: FilterOption[];
  tags?: FilterOption[];
  sortOptions?: SortOption[];
  searchPlaceholder?: string;
  selectedCategories?: string[];
  selectedTags?: string[];
  currentSort?: string;
  searchQuery?: string;
  onCategoryChange?: (categoryId: string, selected: boolean) => void;
  onTagChange?: (tagId: string, selected: boolean) => void;
  onSortChange?: (sort: string) => void;
  onSearchChange?: (query: string) => void;
  onClearFilters?: () => void;
  showSearch?: boolean;
  showCategories?: boolean;
  showTags?: boolean;
  showSort?: boolean;
  className?: string;
}

const defaultSortOptions: SortOption[] = [
  { value: 'relevance', label: 'По релевантности', icon: 'TrendingUp' },
  { value: 'newest', label: 'Сначала новые', icon: 'Calendar' },
  { value: 'oldest', label: 'Сначала старые', icon: 'CalendarDays' },
  { value: 'views', label: 'По просмотрам', icon: 'Eye' },
  { value: 'likes', label: 'По лайкам', icon: 'Heart' },
  { value: 'duration_asc', label: 'По длительности (короткие)', icon: 'Clock' },
  { value: 'duration_desc', label: 'По длительности (длинные)', icon: 'Clock' }
];

export default function FilterBar({
  categories = [],
  tags = [],
  sortOptions = defaultSortOptions,
  searchPlaceholder = 'Поиск видео...',
  selectedCategories = [],
  selectedTags = [],
  currentSort = 'relevance',
  searchQuery = '',
  onCategoryChange,
  onTagChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
  showSearch = true,
  showCategories = true,
  showTags = true,
  showSort = true,
  className
}: FilterBarProps) {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery.length > 0;
  const selectedSortOption = sortOptions.find(option => option.value === currentSort);

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId);
    onCategoryChange?.(categoryId, !isSelected);
  };

  const handleTagToggle = (tagId: string) => {
    const isSelected = selectedTags.includes(tagId);
    onTagChange?.(tagId, !isSelected);
  };

  const handleTagRemove = (tagId: string) => {
    onTagChange?.(tagId, false);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 border-gray-200 focus:border-game-blue"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => onSearchChange?.('')}
                >
                  <Icon name="X" size={12} />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Filters Toggle (Mobile) */}
          {(showCategories || showTags) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              className="md:hidden"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Фильтры
              {hasActiveFilters && (
                <span className="ml-1 bg-game-blue text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {selectedCategories.length + selectedTags.length}
                </span>
              )}
            </Button>
          )}

          {/* Sort Dropdown */}
          {showSort && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name={selectedSortOption?.icon as any || 'ArrowUpDown'} size={16} className="mr-2" />
                  <span className="hidden sm:inline">{selectedSortOption?.label || 'Сортировка'}</span>
                  <span className="sm:hidden">Сорт.</span>
                  <Icon name="ChevronDown" size={12} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => onSortChange?.(option.value)}
                    className={cn(
                      "flex items-center",
                      currentSort === option.value && "bg-game-blue/10 text-game-blue"
                    )}
                  >
                    <Icon name={option.icon as any || 'ArrowUpDown'} size={16} className="mr-2" />
                    {option.label}
                    {currentSort === option.value && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Icon name="X" size={16} className="mr-1" />
              <span className="hidden sm:inline">Сбросить</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filters Section */}
      <div className={cn(
        "space-y-4",
        !isFiltersExpanded && "hidden md:block"
      )}>
        {/* Categories */}
        {showCategories && categories.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Категории</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? 'selected' : 'default'}
                  onClick={() => handleCategoryToggle(category.id)}
                  className="cursor-pointer"
                >
                  {category.label}
                  {category.count !== undefined && (
                    <span className="ml-1 text-xs opacity-70">({category.count})</span>
                  )}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {showTags && tags.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Теги</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Chip
                  key={tag.id}
                  variant={selectedTags.includes(tag.id) ? 'selected' : 'default'}
                  removable={selectedTags.includes(tag.id)}
                  onClick={() => handleTagToggle(tag.id)}
                  onRemove={() => handleTagRemove(tag.id)}
                  className="cursor-pointer"
                >
                  {tag.label}
                  {tag.count !== undefined && (
                    <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                  )}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
            <span className="text-sm text-gray-600">Активные фильтры:</span>
            
            {selectedCategories.map((categoryId) => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Chip
                  key={`active-cat-${categoryId}`}
                  variant="selected"
                  size="sm"
                  removable
                  onRemove={() => onCategoryChange?.(categoryId, false)}
                >
                  {category.label}
                </Chip>
              ) : null;
            })}

            {selectedTags.map((tagId) => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                <Chip
                  key={`active-tag-${tagId}`}
                  variant="selected"
                  size="sm"
                  removable
                  onRemove={() => onTagChange?.(tagId, false)}
                >
                  #{tag.label}
                </Chip>
              ) : null;
            })}

            {searchQuery && (
              <Chip
                variant="selected"
                size="sm"
                removable
                onRemove={() => onSearchChange?.('')}
              >
                "{searchQuery}"
              </Chip>
            )}
          </div>
        )}
      </div>
    </div>
  );
}