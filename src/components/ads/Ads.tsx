import Container from "../container/Container";
import { useRandomAd } from "./RandomAds";

const Ads = () => {
  const ad = useRandomAd("SIDEBAR");
  return (
    <div className="py-8">
      <Container>
        <div className="bg-muted rounded-lg p-6 sm:p-8 text-center border border-border">
          <p className="mb-4 text-sm text-muted-foreground">Ads</p>

          {/* AD BANNER */}
          <div className="flex justify-center">
            <img
            src={ad?.image?.url}
            alt={ad?.title}
            className="w-full max-w-full h-[100px] object-cover object-center cursor-pointer"
            />

          </div>
        </div>
      </Container>
    </div>
  );
};

export default Ads;
