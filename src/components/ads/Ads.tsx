import Container from "../container/Container";

const Ads = () => {
  return (
    <div className="py-8">
      <Container>
        <div className="bg-muted rounded-lg p-6 sm:p-8 text-center border border-border">
          <p className="mb-4 text-sm text-muted-foreground">Ads</p>

          {/* AD BANNER */}
          <div className="flex justify-center">
            <div
              className="
                w-full
                max-w-[970px]
                h-[90px]
                bg-white
                flex items-center justify-center
                rounded
                border
              "
            >
              <p className="text-xs text-gray-500">970px × 90px Ad Banner</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Ads;
