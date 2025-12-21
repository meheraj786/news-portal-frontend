import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "../components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useFetchDashboardStats } from "@/api/hooks/doashboard";

export function SectionCards() {
  // 1. Data fetch kora
  const { data, isLoading, isError } = useFetchDashboardStats();

  // 2. Loading state handle kora
  if (isLoading) {
    return (
      <div className="p-6 text-center animate-pulse text-muted-foreground">
        Stats Loading...
      </div>
    );
  }

  // 3. Error hole handle kora
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* --- Card 1: Total Posts --- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalPosts.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total news articles published
          </div>
        </CardFooter>
      </Card>

      {/* --- Card 2: Total Categories --- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Categories</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalCategories}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Organized in different sections
          </div>
        </CardFooter>
      </Card>

      {/* --- Card 3: Total Lifetime Views --- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalViews.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Total engagement since launch
          </div>
        </CardFooter>
      </Card>

      {/* --- Card 4: 24h Traffic (Dynamic Growth) --- */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>24h Traffic</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.traffic24h.count.toLocaleString()}
          </CardTitle>
          <CardAction>
            {/* Dynamic Badge Color & Icon */}
            <Badge
              variant="outline"
              className={
                data?.traffic24h.isPositive
                  ? "text-green-600 border-green-200 bg-green-50"
                  : "text-red-600 border-red-200 bg-red-50"
              }
            >
              {data?.traffic24h.isPositive ? (
                <IconTrendingUp size={16} />
              ) : (
                <IconTrendingDown size={16} />
              )}
              {data?.traffic24h.isPositive ? "+" : ""}
              {data?.traffic24h.growthPercent}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.traffic24h.isPositive ? "Trending up" : "Trending down"}{" "}
            since yesterday
            {data?.traffic24h.isPositive ? (
              <IconTrendingUp className="size-4 text-green-600" />
            ) : (
              <IconTrendingDown className="size-4 text-red-600" />
            )}
          </div>
          <div className="text-muted-foreground">
            Compared to {data?.traffic24h.previousCount} views
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
