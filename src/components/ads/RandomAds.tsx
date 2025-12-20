import { useFetchAllAds, type Ad } from "@/api/hooks/ads";
import { useState, useMemo } from "react";

export const useRandomAd = (adType: "BANNER" | "SIDEBAR"): Ad | null => {
  const { data: allAds } = useFetchAllAds();

  const [randomSeed] = useState(() => Math.random());

  const filteredAds = useMemo(() => {
    if (!allAds || !Array.isArray(allAds)) return [];

    return allAds.filter((ad) => {
      const isHorizontal = ad.type === "horizontal";
      return adType === "BANNER" ? isHorizontal : !isHorizontal;
    });
  }, [allAds, adType]);

  const selectedAd = useMemo(() => {
    if (filteredAds.length === 0) return null;

    const randomIndex = Math.floor(randomSeed * filteredAds.length);
    return filteredAds[randomIndex];
  }, [filteredAds, randomSeed]);

  return selectedAd;
};
