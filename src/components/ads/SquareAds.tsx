import { useRandomAd } from "./RandomAds"


const SquareAds = () => {
  const ad=useRandomAd("BANNER");
  return (
                  <div className="bg-muted rounded-lg p-4 text-center border border-border">
                <p className="mb-4 text-sm text-muted-foreground">Ads</p>
                <img src={ad?.image?.url} className="w-ful mt-3 h-[300px] object-cover object-center" alt="" />
                </div>
  )
}

export default SquareAds